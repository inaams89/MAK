"use client";

import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useState,useEffect } from "react";
import { H4 } from "./Tyograohy";
export default function DirectorsMessage({adata}) {
        const [sanitizedHTML,setsanitizedhtml]=useState()
        const [sanitizedHTML3,setsanitizedhtml3]=useState()

        useEffect(() => {
          
            setsanitizedhtml((adata?adata[0]?.content:'' ))
            setsanitizedhtml3((adata?adata[0]?.content2:'' ))

            }),[]
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandeds, setIsExpandeds] = useState(false);


 
  return (
    <div className="relative bg-gradient-to-b from-white to-[#FFEFEF] py-20 mt-6">
      {/* Page Title */}
      <div className="text-center">
        <H4 className="text-3xl md:text-4xl font-bold text-center">
          A Message from Our <br />
          <span className="text-red-500">Director</span>
        </H4>
      </div>

      {/* Grid Layout for 2 Columns */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Director Message Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            {/* Director's Image */}
            <div className="p-4 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800">
              <Image
                src="https://usercontent.one/wp/www.mak-security.co.uk/wp-content/uploads/2019/06/Mak-Security-Logo-300x60.png?media=1718891222"
                alt="Director"
                width={150}
                height={150}
                className="rounded-lg object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Director's Message */}
            <div className="p-6">
              <div className="relative">
                <FaQuoteLeft size={8} className="text-red-300 text-2xl absolute -top-4 -left-2" />
                <p
                  className="text-[#565969] text-md"
                  dangerouslySetInnerHTML={{
                    __html: isExpanded
                      ? sanitizedHTML
                      : sanitizedHTML?.slice(0, 550) + "...",
                  }}
                />
                {/* Read More / Read Less Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-red-500 font-medium hover:underline mt-2"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
                <FaQuoteRight size={8} className="text-red-300 text-2xl absolute -bottom-4 -right-2" />
              </div>
            </div>
          </div>

          {/* Choose SIA Approved Contractor Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            {/* SIA Image */}
            <div className="p-4 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800">
              <Image
                src="https://usercontent.one/wp/www.mak-security.co.uk/wp-content/uploads/2019/06/Mak-Security-Logo-300x60.png?media=1718891222"
                alt="SIA Logo"
                width={150}
                height={150}
                className="rounded-lg object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* SIA Message */}
            <div className="p-6">
              <div className="relative">
                <FaQuoteLeft size={8} className="text-red-300 text-2xl absolute -top-4 -left-2" />
                <p
                  className="text-[#565969] text-md"
                  dangerouslySetInnerHTML={{
                    __html: isExpandeds
                      ? sanitizedHTML3
                      : sanitizedHTML3?.slice(0, 320) + "...",
                  }}
                />
                {/* Read More / Read Less Button */}
                <button
                  onClick={() => setIsExpandeds(!isExpandeds)}
                  className="text-red-500 font-medium hover:underline mt-2"
                >
                  {isExpandeds ? "Read Less" : "Read More"}
                </button>
                <FaQuoteRight size={8} className="text-red-300 text-2xl absolute -bottom-4 -right-2" />
              </div>

              {/* CTA Button */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.gov.uk/guidance/choosing-an-sia-approved-contractor",
                    "_blank"
                  )
                }
                className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-black transition-all duration-300 hover:scale-105 animate-pulse"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



 
 