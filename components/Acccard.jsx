import Image from "next/image";
import { useState } from "react";

const AccradationCard = ({ testimonial }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 90;

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    // Outer container with a gradient border
    <div>      
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-500 text-sm italic">
                {testimonial.obtained_date|| "No date provided"}
              </p>
              <span className="bg-[#e13737] text-white text-xs px-3 py-1 rounded-full">
                Verified Client
              </span>
            </div>
            {/* Stars */}
            <div className="flex justify-center mb-3 gap-2">
            {Array(5).fill().map((_, i) => (
          <span key={i} className="text-red-500 ">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512" 
              className="w-4 h-4 fill-red-600 "
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
            </svg>
          </span>
        ))}
            </div>
      
            {/* Review Text */}
            <p className="text-gray-600 text-sm mb-4">
              {expanded
                ? testimonial?.description
                : `${testimonial?.description.slice(0, maxLength)}...`}
            </p>
      
            {/* "See More" Button for Long Text */}
            {testimonial?.description.length > maxLength && (
              <button
                onClick={toggleExpanded}
                className="text-red-500 font-semibold mt-2 text-sm"
              >
                {expanded ? "See Less" : "See More"}
              </button>
            )}
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="w-14 h-14 overflow-hidden rounded-full border">
                <Image src={testimonial.logo} alt={testimonial.name} width={56} height={56} />
              </div>
            </div>
      
            {/* Name & Role */}
            {testimonial.client_name}
            <p className="text-gray-400 text-sm">            {testimonial.name}
            </p>
          </div>
      
      </div>
      
  
  );
};

export default AccradationCard;