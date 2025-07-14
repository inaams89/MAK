"use client";
import * as FaIcons from "react-icons/fa";
import { useMemo } from "react";
import { H4 } from "./Tyograohy";
import { IoArrowForwardOutline } from "react-icons/io5";
import Link from "next/link";

const WhyChooseUs = ({ whyus }) => {
  const features = useMemo(() => {
    return whyus ? whyus[0].benefits : [];
  }, [whyus]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-200  py-24 rounded-lg">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Header */}
      <H4 className="text-5xl md:text-6xl font-bold text-black text-center md:text-left">
        
        {whyus?.title ? whyus[0]?.title : "Why Us"}
      </H4>

      {/* Description and Learn More Button */}
      <div className="text-left max-w-2xl">
        <p className="text-black text-md md:text-md opacity-90 leading-normal">
          Based in Manchester, Liverpool, and Birmingham - MAK Security is a reputable security services company serving clients across the UK. We are experts in implementing security procedures to proactively prevent theft and crime.
        </p>
        {/* Learn More Button */}
        <div className="mt-6 flex justify-center md:justify-start">
          <Link href="/why-us" legacyBehavior>
            <a className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition duration-300">
              <span className="font-semibold">Learn More</span>
              <IoArrowForwardOutline size={18} className="animate-bounce-horizontal" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className=" bg-gray-200  flex justify-center mb-16 items-center py-2 px-8  relative overflow-hidden">
        {/* Background Gradient */}
        
        <div className="absolute top-0 right-0 w-full h-full"></div>

   
<div className="relative z-10 max-w-8xl w-full">
  {/* Grid Layout for Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {whyus
      ? whyus[0].benefits.map((feature, index) => {
          const IconComponent = FaIcons[feature.icon];

          if (!IconComponent) {
            console.warn(`Icon not found: ${feature.icon}`);
            return null;
          }

          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center text-center p-8 w-80 h-48 rounded-xl bg-black shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-4 cursor-pointer group overflow-hidden"
            >
              {/* Icon Container with Red Gradient Background and Pulse Animation */}
              <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-full w-16 h-16 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:rotate-[360deg] ">
                {/* Icon */}
                {IconComponent ? (
                  <IconComponent size={28} color="white" aria-label={feature.title} />
                ) : (
                  <FaIcons.FaQuestionCircle size={28} color="white" />
                )}
              </div>

              {/* Feature Title */}
              <h3 className="mt-6 text-xl font-[500] text-white group-hover:text-white  duration-300">
                {feature.title}
              </h3>

              {/* Hover Effect with Red Gradient */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"></div> */}

              {/* Subtle Background Pattern */}
              {/* <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="red" />
                  </pattern>
                  <rect x="0" y="0" width="100" height="100" fill="url(#pattern)" />
                </svg>
              </div> */}

              {/* Glow Effect on Hover */}
              {/* <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 blur opacity-75"></div>
              </div> */}

              {/* Floating Animation */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 opacity-10  transition-opacity duration-500 animate-float "></div>
              </div>
            </div>
          );
        })
      : []}
  </div>
</div>
      </section>
    </>
  );
};

export default WhyChooseUs;