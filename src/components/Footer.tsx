
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container px-4 py-8 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-blue">
              CareerCompass AI<span className="text-brand-teal">+</span>
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              AI-powered career guidance to help you land your dream job.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-500">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/features" className="text-sm text-gray-600 hover:text-brand-blue">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-brand-blue">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-brand-blue">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-500">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-brand-blue">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-gray-600 hover:text-brand-blue">
                  Career Guides
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-gray-600 hover:text-brand-blue">
                  Resume Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-500">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-brand-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-brand-blue">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-brand-blue">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CareerCompass AI+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
