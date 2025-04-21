
import { awsConfig } from "@/config/awsConfig";
import AWS from "aws-sdk";

// Configure AWS SDK with credentials
AWS.config.update({
  region: awsConfig.REGION,
  credentials: new AWS.Credentials(
    awsConfig.CREDENTIALS.accessKeyId,
    awsConfig.CREDENTIALS.secretAccessKey
  )
});

// Initialize AWS services
const s3 = new AWS.S3();
const textract = new AWS.Textract();
const bedrockRuntime = new AWS.BedrockRuntime();

// Upload resume to S3
export const uploadResumeToS3 = async (file: File): Promise<string> => {
  try {
    console.log(`Uploading file: ${file.name} to S3...`);
    
    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    
    // Generate a unique object key
    const objectKey = `resumes/${Date.now()}-${file.name}`;
    
    // Upload to S3
    await s3.putObject({
      Bucket: awsConfig.S3_BUCKET_NAME,
      Key: objectKey,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type
    }).promise();
    
    console.log(`Successfully uploaded to S3: ${objectKey}`);
    return objectKey;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload resume to storage");
  }
};

// Extract text from the PDF resume using AWS Textract
export const extractTextFromResume = async (objectKey: string): Promise<string> => {
  try {
    console.log(`Extracting text from document at ${objectKey}...`);
    
    // Start document text detection job
    const startResponse = await textract.startDocumentTextDetection({
      DocumentLocation: {
        S3Object: {
          Bucket: awsConfig.S3_BUCKET_NAME,
          Name: objectKey
        }
      }
    }).promise();
    
    const jobId = startResponse.JobId;
    if (!jobId) {
      throw new Error("Failed to start text extraction job");
    }
    
    // Poll for job completion
    let jobComplete = false;
    let extractedText = "";
    
    while (!jobComplete) {
      const getResultsResponse = await textract.getDocumentTextDetection({
        JobId: jobId
      }).promise();
      
      jobComplete = getResultsResponse.JobStatus === 'SUCCEEDED';
      
      if (jobComplete && getResultsResponse.Blocks) {
        // Combine all text blocks
        extractedText = getResultsResponse.Blocks
          .filter(block => block.BlockType === 'LINE')
          .map(block => block.Text)
          .join(' ');
        
        // Get remaining pages if any
        let nextToken = getResultsResponse.NextToken;
        while (nextToken) {
          const additionalResults = await textract.getDocumentTextDetection({
            JobId: jobId,
            NextToken: nextToken
          }).promise();
          
          if (additionalResults.Blocks) {
            const additionalText = additionalResults.Blocks
              .filter(block => block.BlockType === 'LINE')
              .map(block => block.Text)
              .join(' ');
            
            extractedText += ' ' + additionalText;
          }
          
          nextToken = additionalResults.NextToken;
        }
      } else if (!jobComplete) {
        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log("Text extraction complete");
    return extractedText;
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Failed to extract text from resume");
  }
};

// Analyze resume and job description using Bedrock LLM
export const analyzeWithBedrock = async (
  resumeText: string, 
  jobDescription: string
): Promise<any> => {
  try {
    console.log("Sending to Bedrock for analysis...");
    
    // Format the prompt for Claude model
    const prompt = `
    Human: I want you to analyze a resume against a job description and provide structured feedback.

    Resume Text:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Please analyze how well the resume matches the job description and provide the following information in JSON format:
    1. An overall match score (0-100)
    2. Category scores for: Skills Match, Experience Match, and Technical Match
    3. Suggestions for improvement, categorized as "critical" or "improvement"
    4. Keyword analysis showing matching and missing keywords
    5. Skills evaluation with required level (1-5) and found level (1-5)

    Format your response as valid JSON with the following structure:
    {
      "overallScore": number,
      "scores": [{"category": string, "score": number}],
      "suggestions": [{"type": string, "title": string, "description": string}],
      "keywordAnalysis": {"matching": string[], "missing": string[]},
      "skillsEvaluation": [{"skill": string, "requiredLevel": number, "foundLevel": number}]
    }

    Assistant: 
    `;
    
    // Bedrock API call
    const response = await bedrockRuntime.invokeModel({
      body: JSON.stringify({
        prompt: prompt,
        max_tokens_to_sample: 4096,
        temperature: 0.7,
        top_p: 0.9,
      }),
      modelId: awsConfig.BEDROCK_MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
    }).promise();
    
    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const analysisText = responseBody.completion || responseBody.generations[0].text;
    
    // Extract the JSON part from the text response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON response from Bedrock");
    }
    
    const analysisResults = JSON.parse(jsonMatch[0]);
    return analysisResults;
  } catch (error) {
    console.error("Error analyzing with Bedrock:", error);
    throw new Error("Failed to analyze resume with job description");
  }
};
