
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileUp, Clipboard } from "lucide-react";

interface JobDescriptionInputProps {
  onJobDescriptionSubmitted: (description: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onJobDescriptionSubmitted }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setIsInputValid(e.target.value.length >= 50 || e.target.value.length === 0);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      setIsInputValid(text.length >= 50);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleSubmit = () => {
    if (jobDescription.length >= 50) {
      onJobDescriptionSubmitted(jobDescription);
    } else {
      setIsInputValid(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Job Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="job-description" className="text-sm font-medium text-gray-700">
                Paste the job description below
              </label>
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-blue"
                onClick={handlePaste}
              >
                <Clipboard className="h-4 w-4 mr-1" /> Paste from clipboard
              </Button>
            </div>
            <Textarea
              id="job-description"
              placeholder="Paste the full job description here..."
              className={`min-h-[200px] ${!isInputValid ? 'border-red-500' : ''}`}
              value={jobDescription}
              onChange={handleDescriptionChange}
            />
            {!isInputValid && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a complete job description (at least 50 characters)
              </p>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {jobDescription.length} characters
              {jobDescription.length > 0 && jobDescription.length < 50 && " (min 50)"}
            </p>
            <Button 
              disabled={jobDescription.length < 50}
              onClick={handleSubmit}
            >
              Continue <FileUp className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
