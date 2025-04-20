
import React from "react";
import { FileText, BarChart2, MessageSquare, Brain, Award, PieChart } from "lucide-react";

const features = [
  {
    name: "Resume Parsing",
    description: "Upload your resume and our AI extracts key information like skills, experience, and education.",
    icon: FileText,
  },
  {
    name: "Smart Matching",
    description: "Our algorithms compare your resume with job descriptions to calculate match scores and identify gaps.",
    icon: BarChart2,
  },
  {
    name: "AI Feedback",
    description: "Receive personalized suggestions to improve your resume based on the specific job requirements.",
    icon: MessageSquare,
  },
  {
    name: "Skill Gap Analysis",
    description: "Identify missing skills and get recommendations for courses to build your qualifications.",
    icon: Brain,
  },
  {
    name: "ATS Optimization",
    description: "Ensure your resume passes through Applicant Tracking Systems with formatting recommendations.",
    icon: Award,
  },
  {
    name: "Visual Analytics",
    description: "View interactive charts and graphs showing your strengths and areas for improvement.",
    icon: PieChart,
  },
];

const FeatureSection = () => {
  return (
    <div className="py-16 bg-white sm:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful AI Resume Analysis
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our advanced AI technology analyzes every aspect of your resume to maximize your chances of landing interviews.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-md bg-brand-blue/10 text-brand-blue">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
