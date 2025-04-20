
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-blue">
              CareerCompass AI
            </span>
          </Link>
        </div>
        <div className="hidden space-x-4 md:flex">
          <Link to="/how-it-works" className="text-gray-600 hover:text-brand-blue transition-colors">
            How it Works
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors">
            About
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="text-brand-blue">
            Log In
          </Button>
          <Button className="bg-brand-blue hover:bg-brand-lightblue text-white">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
