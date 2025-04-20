
import React from "react";
import { FileUp, FileSearch, BarChart2, MessageSquare } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Upload Your Resume",
    description:
      "Upload your resume in PDF, Word, or image format. Our AI will extract and analyze all the key information.",
    icon: FileUp,
  },
  {
    id: 2,
    name: "Add Job Description",
    description:
      "Enter the job description you're targeting. This helps our AI understand what employers are looking for.",
    icon: FileSearch,
  },
  {
    id: 3,
    name: "Get Analysis",
    description:
      "Our AI compares your resume with the job description, calculating match scores for skills, experience, and more.",
    icon: BarChart2,
  },
  {
    id: 4,
    name: "Receive Recommendations",
    description:
      "Review personalized feedback and actionable suggestions to improve your resume and increase your chances of success.",
    icon: MessageSquare,
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-brand-gray sm:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get your resume analyzed in minutes with our simple 4-step process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative p-6 bg-white rounded-lg shadow-sm transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue text-white">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="absolute -top-3 -left-3 flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold">
                {step.id}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900">
                {step.name}
              </h3>
              <p className="text-sm text-center text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
