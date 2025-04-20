
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../../ui/card";
import { Check, X, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";

interface Suggestion {
  id: string;
  type: "improvement" | "strength" | "critical";
  title: string;
  description: string;
}

interface FeedbackSuggestionsProps {
  suggestions: Suggestion[];
}

const FeedbackSuggestions: React.FC<FeedbackSuggestionsProps> = ({ suggestions }) => {
  const strengths = suggestions.filter(s => s.type === "strength");
  const improvements = suggestions.filter(s => s.type === "improvement");
  const critical = suggestions.filter(s => s.type === "critical");
  
  const getSuggestionIcon = (type: string) => {
    switch(type) {
      case "strength":
        return <Check className="h-4 w-4 text-green-500" />;
      case "improvement":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "critical":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">AI Feedback & Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {critical.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md font-medium text-red-600 mb-2">
                Critical Issues
              </h3>
              {critical.map(suggestion => (
                <div key={suggestion.id} className="bg-red-50 border border-red-200 rounded-md p-3 mb-2">
                  <div className="flex items-start">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-red-800">{suggestion.title}</h4>
                      <p className="text-sm text-red-700 mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <AccordionItem value="improvements" className="border rounded-md mb-2">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Suggested Improvements ({improvements.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-3">
              <div className="space-y-3 mt-1">
                {improvements.map(suggestion => (
                  <div key={suggestion.id} className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <h4 className="text-sm font-medium text-yellow-800">{suggestion.title}</h4>
                    <p className="text-sm text-yellow-700 mt-1">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="strengths" className="border rounded-md">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Your Strengths ({strengths.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-3">
              <div className="space-y-3 mt-1">
                {strengths.map(suggestion => (
                  <div key={suggestion.id} className="bg-green-50 border border-green-200 rounded-md p-3">
                    <h4 className="text-sm font-medium text-green-800">{suggestion.title}</h4>
                    <p className="text-sm text-green-700 mt-1">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FeedbackSuggestions;
