
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-brand-blue">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Boost Your Job Search?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Get personalized resume feedback and improve your chances of landing interviews.
          </p>
          <div className="mt-8">
            <Button className="bg-white text-brand-blue hover:bg-gray-100 px-8 py-6 text-lg">
              <Link to="/analyze">Analyze My Resume Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
