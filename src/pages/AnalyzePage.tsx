
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeUpload from "@/components/AnalyzerComponents/ResumeUpload";
import JobDescriptionInput from "@/components/AnalyzerComponents/JobDescriptionInput";
import ProgressIndicator from "@/components/AnalyzerComponents/ProgressIndicator";
import MatchScores from "@/components/AnalyzerComponents/AnalysisResults/MatchScores";
import FeedbackSuggestions from "@/components/AnalyzerComponents/AnalysisResults/FeedbackSuggestions";
import KeywordComparison from "@/components/AnalyzerComponents/AnalysisResults/KeywordComparison";
import SkillsRadarChart from "@/components/AnalyzerComponents/AnalysisResults/SkillsRadarChart";
import { Button } from "@/components/ui/button";
import { FileText, Code, BookOpenCheck, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractTextFromResume, analyzeWithBedrock } from "@/utils/awsServices";

const steps = [
  { id: 1, name: "Upload Resume" },
  { id: 2, name: "Add Job Description" },
  { id: 3, name: "View Analysis" },
];

const AnalyzePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeS3Key, setResumeS3Key] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const handleResumeUpload = async (file: File, s3Key: string) => {
    setResumeFile(file);
    setResumeS3Key(s3Key);
    
    try {
      // Extract text from the uploaded PDF via AWS Textract
      const extractedText = await extractTextFromResume(s3Key);
      setResumeText(extractedText);
      
      // After successful text extraction, proceed to the next step
      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Text Extraction Failed',
        description: 'We couldn\'t extract text from your resume. Please try again with a different file.',
      });
    }
  };

  const handleJobDescriptionSubmit = async (description: string) => {
    setJobDescription(description);
    setCurrentStep(3);
    setIsAnalyzing(true);
    
    try {
      // Analyze the resume and job description using AWS Bedrock
      if (resumeText) {
        const results = await analyzeWithBedrock(resumeText, description);
        setAnalysisResults(results);
        setAnalysisComplete(true);
      } else {
        throw new Error("Resume text not available");
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'We encountered an error analyzing your resume. Please try again.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setResumeFile(null);
    setResumeS3Key(null);
    setResumeText(null);
    setJobDescription("");
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults(null);
  };

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF report
    toast({
      title: 'Report Download',
      description: 'Report download functionality will be implemented in the future.',
    });
  };

  // Format the analysis results for the UI components
  const formatResultsForUI = () => {
    if (!analysisResults) return null;
    
    // Format scores for MatchScores component
    const formattedScores = analysisResults.scores.map((score: any) => ({
      category: score.category,
      score: score.score,
      icon: getIconForCategory(score.category)
    }));
    
    // Format keywords for KeywordComparison component
    const formattedKeywords = [
      {
        category: "Keywords",
        matching: analysisResults.keywordAnalysis.matching,
        missing: analysisResults.keywordAnalysis.missing
      }
    ];
    
    // Format skills for SkillsRadarChart component
    const formattedSkills = analysisResults.skillsEvaluation.map((skill: any) => ({
      skill: skill.skill,
      requiredLevel: skill.requiredLevel,
      yourLevel: skill.foundLevel
    }));
    
    return {
      scores: formattedScores,
      overallScore: analysisResults.overallScore,
      suggestions: analysisResults.suggestions,
      keywords: formattedKeywords,
      skills: formattedSkills
    };
  };
  
  // Helper function to get icons for score categories
  const getIconForCategory = (category: string) => {
    switch (category) {
      case "Skills Match":
        return <BookOpenCheck className="h-4 w-4" />;
      case "Experience Match":
        return <FileText className="h-4 w-4" />;
      case "Technical Match":
        return <Code className="h-4 w-4" />;
      default:
        return <BookOpenCheck className="h-4 w-4" />;
    }
  };
  
  // Get formatted results
  const formattedResults = formatResultsForUI();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Resume Analysis</h1>
        
        <ProgressIndicator steps={steps} currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === 1 && (
            <div className="max-w-md mx-auto">
              <ResumeUpload onResumeUploaded={handleResumeUpload} />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <JobDescriptionInput onJobDescriptionSubmitted={handleJobDescriptionSubmit} />
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              {isAnalyzing ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue mb-4"></div>
                  <h2 className="text-xl font-semibold mb-2">Analyzing Your Resume...</h2>
                  <p className="text-gray-600">
                    Our AI is comparing your resume with the job description.
                    This will take just a moment.
                  </p>
                </div>
              ) : analysisComplete && formattedResults && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Analysis Results</h2>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={handleStartOver}>
                        Start Over
                      </Button>
                      <Button onClick={handleDownloadReport}>
                        <Download className="h-4 w-4 mr-2" /> Download Report
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <MatchScores 
                      scores={formattedResults.scores} 
                      overallScore={formattedResults.overallScore} 
                    />
                    <SkillsRadarChart skills={formattedResults.skills} />
                  </div>
                  
                  <div className="space-y-6">
                    <FeedbackSuggestions suggestions={formattedResults.suggestions} />
                    <KeywordComparison keywords={formattedResults.keywords} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnalyzePage;
