
import React from "react";

const testimonials = [
  {
    content:
      "CareerCompass AI+ helped me identify key skills I was missing in my resume. After making the suggested changes, I received calls for interviews from companies that had previously rejected me.",
    author: "Sarah Johnson",
    role: "Software Developer",
    company: "Recently hired at TechCorp",
  },
  {
    content:
      "The match score analysis showed me exactly why I wasn't getting callbacks. The specific feedback for each job application has been invaluable in tailoring my resume effectively.",
    author: "Michael Chen",
    role: "Marketing Specialist",
    company: "Digital Media Agency",
  },
  {
    content:
      "I was skeptical about AI tools, but the insights were spot-on. The skill gap analysis pointed me to courses that actually helped me qualify for better positions in my field.",
    author: "Alexia Rodriguez",
    role: "Data Analyst",
    company: "Financial Services",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-white sm:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how CareerCompass AI+ has helped job seekers land their dream roles.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-start mb-4">
                <svg
                  className="h-8 w-8 text-brand-blue/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-600 italic mb-6">{testimonial.content}</p>
              <div className="flex items-center mt-auto">
                <div className="h-10 w-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold">
                  {testimonial.author.split(" ")[0][0]}
                  {testimonial.author.split(" ")[1][0]}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                  <div className="text-xs text-gray-500">
                    <span>{testimonial.role}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
