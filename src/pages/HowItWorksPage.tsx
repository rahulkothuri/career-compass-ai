
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-brand-blue py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              How CareerCompass AI+ Works
            </h1>
            <p className="text-xl text-white/90 text-center max-w-3xl mx-auto">
              Our advanced AI-powered platform helps you optimize your resume for specific job applications
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              {/* Detailed explanation sections */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <div className="bg-brand-gray p-6 rounded-lg h-64 flex items-center justify-center mb-4">
                      <div className="w-full max-w-xs h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                          <div className="text-center p-4">
                            <div className="h-12 w-12 bg-brand-blue/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <div className="h-6 w-6 bg-brand-blue/50 rounded"></div>
                            </div>
                            <div className="h-3 w-32 bg-gray-200 rounded mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Upload Your Resume</h2>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Start by uploading your resume in PDF, Word, or image format. Our system supports multiple file formats to make the process convenient for you.
                      </p>
                      <p className="text-gray-700">
                        CareerCompass AI+ uses advanced document parsing technology to extract key information from your resume, including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Skills and competencies</li>
                        <li>Work experience and responsibilities</li>
                        <li>Educational background</li>
                        <li>Certifications and achievements</li>
                        <li>Projects and accomplishments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2 order-1 md:order-2">
                    <div className="bg-brand-gray p-6 rounded-lg h-64 flex items-center justify-center mb-4">
                      <div className="w-full max-w-xs h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="flex-grow">
                          <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-4/6 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-3/6 bg-gray-200 rounded mb-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2 md:order-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Add Job Description</h2>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Enter the job description you're interested in. You can either paste the text directly or upload a job listing document.
                      </p>
                      <p className="text-gray-700">
                        Our natural language processing engine analyzes the job description to identify:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Required technical skills and competencies</li>
                        <li>Experience requirements</li>
                        <li>Educational prerequisites</li>
                        <li>Company values and cultural aspects</li>
                        <li>Key responsibilities and expectations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <div className="bg-brand-gray p-6 rounded-lg h-64 flex items-center justify-center mb-4">
                      <div className="w-full max-w-xs h-full bg-white rounded-lg shadow-md p-4">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="h-8 bg-brand-blue/20 rounded"></div>
                          <div className="h-8 bg-green-100 rounded"></div>
                          <div className="h-8 bg-yellow-100 rounded"></div>
                          <div className="h-8 bg-red-100 rounded"></div>
                        </div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Get Comprehensive Analysis</h2>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Our AI engine compares your resume with the job description using advanced natural language understanding and semantic matching algorithms.
                      </p>
                      <p className="text-gray-700">
                        The system calculates match scores across multiple categories:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Overall match percentage</li>
                        <li>Skills alignment</li>
                        <li>Experience relevance</li>
                        <li>Education and qualification match</li>
                        <li>Keyword optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2 order-1 md:order-2">
                    <div className="bg-brand-gray p-6 rounded-lg h-64 flex items-center justify-center mb-4">
                      <div className="w-full max-w-xs h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-2 flex-grow">
                          <div className="p-2 bg-green-50 border border-green-200 rounded">
                            <div className="h-2 w-16 bg-green-200 rounded mb-1"></div>
                            <div className="h-2 w-full bg-green-100 rounded"></div>
                          </div>
                          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <div className="h-2 w-16 bg-yellow-200 rounded mb-1"></div>
                            <div className="h-2 w-full bg-yellow-100 rounded"></div>
                          </div>
                          <div className="p-2 bg-red-50 border border-red-200 rounded">
                            <div className="h-2 w-16 bg-red-200 rounded mb-1"></div>
                            <div className="h-2 w-full bg-red-100 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2 md:order-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Receive Actionable Recommendations</h2>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Based on the analysis, our AI generates personalized recommendations to improve your resume and increase your chances of getting an interview.
                      </p>
                      <p className="text-gray-700">
                        You'll receive detailed feedback across multiple areas:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Skills to highlight or add to your resume</li>
                        <li>Experience descriptions to enhance</li>
                        <li>ATS optimization suggestions</li>
                        <li>Formatting and structure improvements</li>
                        <li>Suggestions for addressing skill gaps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
              <Button size="lg" className="bg-brand-blue hover:bg-brand-lightblue text-white">
                <Link to="/analyze">Analyze My Resume Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
