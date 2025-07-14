"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import TestimonialCard from "./TestCard";
import { H4 } from "./Tyograohy";

export default function Testimonials({test}) {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 80;
  
    const toggleExpanded = () => {
      setExpanded((prev) => !prev);
    };
  return (
<div className="relative bg-gradient-to-b from-white to-[#FFEFEF] py-20">
      {/* Page Title */}
      {/* <section className="bg-[#060505] py-4 rounded-[2%]">
        <div className="h-full text-white flex items-center justify-center">
          <H4 className="text-4xl font-bold text-center text-primary">Our Accreditations</H4>
        </div>
      </section> */}

      <div className="text-center">
      {/* <section className="bg-[#060505] py-4 rounded-[2%]"> */}

        {/* <span className="inline-block bg-white border border-gray-200 px-4 py-1 rounded-full text-6xl font-medium shadow-md">
          Accreditations🔐
        </span> */}
        {/* </section> */}
        <h2 className="text-3xl md:text-4xl font-bold ">
          What Client’s Say About <br />
          Our <span className="text-red-500">Service</span>
        </h2>
      </div >
      <div className="w-full px-4">

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full mt-8"
        >
          {test?.map((testimonial, index) => (
            <SwiperSlide key={index}>
      <TestimonialCard testimonial={testimonial} />
     
                 </SwiperSlide>
          ))}
        </Swiper>
        </div>
        </div>
    
  );
}
