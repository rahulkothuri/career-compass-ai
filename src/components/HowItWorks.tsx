
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
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-brand-blue/20" />
            
            {/* Steps */}
            <div className="relative space-y-16">
              {steps.map((step) => (
                <div key={step.id} className="relative">
                  <div className="flex items-center">
                    {/* Step circle */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold z-10">
                      {step.id}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-14 sm:ml-16 sm:pl-16 sm:pr-2 w-full sm:w-1/2">
                      <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Icon (hidden on mobile) */}
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 ml-auto rounded-md bg-brand-blue/10 text-brand-blue">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
