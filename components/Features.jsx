"use client";
import React from "react";
import { H4} from "./Tyograohy";
import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";


export default function Features({approch}) {
  const steps = [
    {
      number: "01",
      title: "Enter your Product details",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      icon: "/box-icon.png", // Replace with actual image path
    },
    {
      number: "02",
      title: "Pay your service charges",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      icon: "/phone-icon.png",
    },
    {
      number: "03",
      title: "Ready to send your goods",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      icon: "/check-icon.png",
    },
  ];
  return (
    <div >
      
 
      {/* Header Section */}
    
   <div className="relative">
      {/* Red Background Section */}
      <div className="  relative bg-[#E54530] text-white py-24 px-6 text-center  rounded-[40px] mx-auto overflow-hidden  max-w-80 lg:max-w-7xl md:max-w-6xl  sm:max-w-80  xs:max-w-7xl ">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: "url('/image.webp')" }}

        ></div>

        {/* "HOW IT WORKS" Button */}
        <button className="relative border-2 border-white text-white px-4 py-2 rounded-full font-extrabold flex items-center mx-auto text-sm tracking-wide">
       👮🏻 HOW IT WORKS
        </button>

        {/* Title */}
        <h2 className="relative text-4xl md:text-4xl font-extrabold mt-4">
          3 Easy Steps To Task
        </h2>
      </div>

      {/* Steps Section (Overlapping Cards) */}

      <div className="relative -mt-14  flex flex-col md:flex-row justify-center items-center gap-12 max-w-6xl mx-auto px-6">
        {/* Step 1 */}
        {approch?.map((feature, index) => (

        <div key={index} className="bg-white p-12  rounded-xl  shadow-lg text-black relative w-full md:w-1/3 text-center border-2 border-red-500 transition-transform hover:scale-105">
         
       
              {/* Number & Icon (Number on left, Icon on right) */}
              <div className="flex items-center justify-center mb-8">
                {/* Step Number */}
                <span className="bg-red-500 text-white rounded-full px-3 py-1 text-lg font-bold">{index+1}</span>

                {/* Step Icon */}
                <div className="bg-gray-100 p-3 rounded-full">
                  <Image src={feature.image} alt="icon" width={45} height={45} />
                </div>
              </div>
            
              {/* Text Content */}
              <h3 className="text-black font-bold text-2xl">{feature.title}</h3>
              <p className="text-[#565969] text-[14px] font-normal mt-2">
              {feature.content}</p>
            </div>
      


      
    
        ))}
      

      </div>
    
    

 
    </div>
      {/* Title */}
     
   

       
    </div>
  );
}