
import React, { useState } from "react";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { uploadResumeToS3 } from "@/utils/awsServices";

interface ResumeUploadProps {
  onResumeUploaded: (file: File, s3Key: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onResumeUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    // Check if file is PDF
    if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf")) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    } else {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  const handleUpload = async (selectedFile: File) => {
    setUploadStatus("uploading");
    setUploadProgress(0);
    
    try {
      // Start upload progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 200);
      
      // Upload to S3
      const s3Key = await uploadResumeToS3(selectedFile);
      
      // Complete the progress
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus("success");
      
      // Notify parent component
      onResumeUploaded(selectedFile, s3Key);
    } catch (error) {
      setUploadStatus("error");
      console.error("Upload failed:", error);
    }
  };

  return (
    <Card className="border-2 border-dashed rounded-lg">
      <CardContent className="p-6">
        {uploadStatus === "success" ? (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{file?.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{((file?.size || 0) / 1024).toFixed(1)} KB</p>
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => {
                  setFile(null);
                  setUploadStatus("idle");
                  setUploadProgress(0);
                }}
              >
                Change File
              </Button>
            </div>
          </div>
        ) : uploadStatus === "error" ? (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Upload Failed</h3>
            <p className="mt-1 text-sm text-gray-500">Only PDF files are supported at this time.</p>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setUploadStatus("idle")}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center py-10 ${
              isDragging ? "bg-brand-blue/5" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              {uploadStatus === "uploading" ? (
                <div className="w-16 h-16">
                  <div className="relative">
                    <Progress value={uploadProgress} className="h-16 w-16 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-brand-blue" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-brand-blue" />
                </div>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">Upload your resume</h3>
            <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
              {uploadStatus === "uploading" 
                ? "Uploading... " + uploadProgress + "%"
                : "Drag and drop your resume file here, or click to browse"}
            </p>
            <p className="mt-1 text-xs text-gray-400">Supports PDF format</p>
            <div className="mt-4">
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploadStatus === "uploading"}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={uploadStatus === "uploading"}
                  asChild
                >
                  <span>Browse Files</span>
                </Button>
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
