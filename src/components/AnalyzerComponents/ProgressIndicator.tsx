
import React from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface ProgressStep {
  id: number;
  name: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="py-4">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-center">
          {steps.map((step, index) => {
            const status = 
              currentStep > step.id ? "complete" : 
              currentStep === step.id ? "current" : 
              "upcoming";
              
            return (
              <li key={step.id} className={index !== steps.length - 1 ? "pr-8 sm:pr-20" : ""}>
                <div className="relative flex items-center">
                  {status === "complete" ? (
                    <div className="flex items-center">
                      <CheckCircle2 className="h-8 w-8 text-brand-blue" aria-hidden="true" />
                      <span className="ml-3 text-sm font-medium text-gray-900">{step.name}</span>
                    </div>
                  ) : status === "current" ? (
                    <div className="flex items-center" aria-current="step">
                      <div className="relative flex h-8 w-8 items-center justify-center">
                        <Loader2 className="h-8 w-8 text-brand-blue animate-spin" aria-hidden="true" />
                      </div>
                      <span className="ml-3 text-sm font-medium text-brand-blue">{step.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Circle className="h-8 w-8 text-gray-300" aria-hidden="true" />
                      <span className="ml-3 text-sm font-medium text-gray-500">{step.name}</span>
                    </div>
                  )}

                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-0 right-0 hidden h-0.5 w-16 sm:flex sm:w-20 ${
                        status === "complete" ? "bg-brand-blue" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressIndicator;
