"use client";
import React, { useState, useEffect } from "react";
import { H3 } from "./Tyograohy";
import Image from "next/image";
import { IoArrowForwardOutline } from "react-icons/io5";
import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";
import { FaBriefcase, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";


const AboutUs = ({ aboutUs }) => {
  const [sanitizedHTML, setSanitizedHTML] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const adjustImagePaths = (html, baseUrl) => {
      if (typeof window !== "undefined") {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const images = doc.querySelectorAll("img");

        images.forEach((img) => {
          const src = img.getAttribute("src");

          // Skip base64 images
          if (src && src.startsWith("data:")) {
            img.style.width = "auto"; // Let the image retain its natural width
            img.style.height = "auto"; // Let the image retain its natural height
            img.style.objectFit = "contain";
          }

          // Adjust non-base64 image paths
          if (src && !src.startsWith("http") && !src.startsWith("data:")) {
            img.setAttribute("src", `${baseUrl}${src}`);
          }
        });

        return doc.body.innerHTML;
      }
    };

    setSanitizedHTML(adjustImagePaths(aboutUs?.content, ));
  }, [aboutUs?.content]);

  return (
    <div id="abo" className="bg-gray-50">
      <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-10 lg:px-10 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="w-full  ">          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">🚛👮</span>
            <H3 className="text-sm font-semibold">
            Who we are
              </H3>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          {aboutUs?.title.slice(0,6)}
          <span className="text-red-500">          {aboutUs?.title.slice(6,40)}
          </span>


          </h2>
          <h4 className="text-3xl md:text-4xl font-bold leading-tight">
          {aboutUs?.subtitle?.slice(0,6)}
          <span className="text-red-500">          {aboutUs?.subtitle?.slice(6,40)}
          </span>
          
        
          </h4>
          <p
        className="text-[#565969] text-md"
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? sanitizedHTML
            : sanitizedHTML?.slice(0, 350) + "...", // Show first 150 characters
        }}
      />

      {/* Read More / Read Less Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-red-500 font-medium hover:underline mt-2"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
          

          {/* Service Cards */}
          <div className="mt-2 space-y-4">
            <div className="bg-white border-l-4 border-red-500 p-4 flex items-start shadow-md rounded-lg">
              <div className="bg-red-500 text-white p-3 rounded-full text-xl">
                <FaGlobe />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg">SIA Approved Company</h3>
                <p className="text-gray-500 text-sm">
                MAK Security is an SIA approved company has been since its inception in 2009. MAK is ISO9001 and ISO14001                 </p>
              </div>
            </div>

            <div className="bg-white border-l-4 border-red-500 p-4 flex items-start shadow-md rounded-lg">
              <div className="bg-red-500 text-white p-3 rounded-full text-xl">
                <FaBriefcase />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg">Local Service</h3>
                <p className="text-gray-500 text-sm">
                Based in Manchester, Liverpool and Birmingham - MAK Security is a reputable security services company serving clients across the UK.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-[#000]">
  More About Us <span>↗</span>
</button>
        </div>

        {/* Right Images */}

          <div className="lg:w-1/2 relative ml-6">
          {/* Main Image with Increased Height */}
          <div className="w-full">
          
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileHover={{
        scale: 1.08, // More noticeable scale-up
        rotate: 6, // Slight rotation for a cool effect
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)", // Stronger glow effect
        transition: { duration: 0.4, ease: "easeInOut" }, // Smoother transition
      }}
      whileTap={{ scale: 0.95 }} // Shrink effect when clicked
      
      className="w-full"
    >
      <Image
        src={aboutUs?.image} // Ensure this image path exists
        alt="Our Team"
        width={750}
        height={500} // Increased height
        className="rounded-lg object-cover w-full h-[300px] sm:h-[200px] xs:h-[100] md:h-[500px] lg:h-[500px]"
      />
    </motion.div>
</div>

  {/* Experience Badge */}
  <div className="absolute top-6 left-6 bg-white shadow-lg px-4 py-2 rounded-lg border-t-4 border-red-500">
    <h4 className="text-2xl font-bold text-black">16+</h4>
    <p className="text-xs font-semibold text-gray-600">Years of Experience</p>
  </div>
</div>
     
      </div>
    </section>
      {/* Hero Section */}
  
    </div>
  );
};

export default AboutUs;