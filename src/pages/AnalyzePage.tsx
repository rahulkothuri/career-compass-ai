
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

const steps = [
  { id: 1, name: "Upload Resume" },
  { id: 2, name: "Add Job Description" },
  { id: 3, name: "View Analysis" },
];

const AnalyzePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // This would come from the backend in a real implementation
  const mockAnalysisResults = {
    overallScore: 76,
    scores: [
      { 
        category: "Skills Match", 
        score: 82,
        icon: <BookOpenCheck className="h-4 w-4" />
      },
      { 
        category: "Experience Match", 
        score: 68, 
        icon: <FileText className="h-4 w-4" />
      },
      { 
        category: "Technical Match", 
        score: 79, 
        icon: <Code className="h-4 w-4" />
      },
    ],
    suggestions: [
      {
        id: "s1",
        type: "critical" as const,
        title: "Missing Key Technical Skill",
        description: "The job requires proficiency in AWS services, which is not mentioned in your resume."
      },
      {
        id: "s2",
        type: "improvement" as const,
        title: "Enhance Experience Section",
        description: "Quantify your achievements with metrics to demonstrate impact, especially in your most recent role."
      },
      {
        id: "s3",
        type: "improvement" as const,
        title: "Add Project Examples",
        description: "Include specific examples of projects where you've used relevant technologies mentioned in the job description."
      },
      {
        id: "s4",
        type: "strength" as const,
        title: "Strong Educational Background",
        description: "Your educational qualifications align perfectly with what the employer is seeking."
      },
      {
        id: "s5",
        type: "strength" as const,
        title: "Relevant Industry Experience",
        description: "Your experience in the same industry is a significant advantage for this position."
      }
    ],
    keywordAnalysis: [
      {
        category: "Skills",
        matching: ["JavaScript", "React", "Python", "SQL", "HTML/CSS"],
        missing: ["AWS", "Docker", "Kubernetes", "GraphQL"]
      },
      {
        category: "Experience",
        matching: ["Frontend Development", "API Integration", "Team Management"],
        missing: ["Cloud Infrastructure", "CI/CD Pipelines"]
      },
      {
        category: "Education",
        matching: ["Bachelor's Degree", "Computer Science"],
        missing: []
      }
    ],
    skillsData: [
      { skill: "JavaScript", requiredLevel: 4, yourLevel: 4.5 },
      { skill: "React", requiredLevel: 4, yourLevel: 3.5 },
      { skill: "Python", requiredLevel: 3, yourLevel: 3 },
      { skill: "AWS", requiredLevel: 4, yourLevel: 1 },
      { skill: "SQL", requiredLevel: 3, yourLevel: 4 },
      { skill: "Docker", requiredLevel: 3.5, yourLevel: 1.5 },
    ]
  };

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    // After a short delay, proceed to the next step
    setTimeout(() => {
      setCurrentStep(2);
    }, 1000);
  };

  const handleJobDescriptionSubmit = (description: string) => {
    setJobDescription(description);
    setCurrentStep(3);
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3500);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setResumeFile(null);
    setJobDescription("");
    setIsAnalyzing(false);
    setAnalysisComplete(false);
  };

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF report
    alert("In a real implementation, this would generate and download a PDF report with the analysis results.");
  };

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
              ) : analysisComplete && (
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
                      scores={mockAnalysisResults.scores} 
                      overallScore={mockAnalysisResults.overallScore} 
                    />
                    <SkillsRadarChart skills={mockAnalysisResults.skillsData} />
                  </div>
                  
                  <div className="space-y-6">
                    <FeedbackSuggestions suggestions={mockAnalysisResults.suggestions} />
                    <KeywordComparison keywords={mockAnalysisResults.keywordAnalysis} />
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
