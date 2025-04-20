
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-brand-gray">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-brand-darkgray sm:text-5xl lg:text-6xl">
              <span className="block">Optimize Your Resume</span>
              <span className="block text-brand-blue">With AI-Powered Analysis</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              CareerCompass AI+ analyzes your resume against job descriptions to provide
              actionable insights, personalized feedback, and improvement suggestions
              that help you land more interviews.
            </p>
            <div className="flex flex-col mt-8 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button className="bg-brand-blue hover:bg-brand-lightblue text-white px-8 py-6 text-lg">
                <Link to="/analyze" className="flex items-center">
                  Analyze My Resume
                </Link>
              </Button>
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 px-8 py-6 text-lg">
                <Link to="/how-it-works" className="flex items-center">
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative h-full">
            <div className="relative h-[500px] w-[500px] rounded-lg shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-white p-6 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-500">Resume Analysis Dashboard</div>
                </div>
                <div className="bg-brand-gray rounded-lg p-4 mb-4">
                  <div className="h-6 w-2/3 bg-brand-blue/20 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                      <div className="h-10 w-10 bg-brand-blue/30 rounded-full"></div>
                    </div>
                    <div className="h-20 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                      <div className="h-10 w-10 bg-brand-teal/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="h-6 w-1/3 bg-brand-blue/20 rounded mb-3"></div>
                  <div className="h-24 bg-brand-blue/5 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
