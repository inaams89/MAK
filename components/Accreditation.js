"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import AccradationCard from "./Acccard";
import { H4 } from "./Tyograohy";

export default function AccreditationPage({ accredation }) {
  return (
    <div className="relative bg-gradient-to-b from-white to-[#FFEFEF] py-10">
     
      <div className="text-center">
  
        <h2 className="text-3xl md:text-4xl font-bold ">
          What Client’s Say About <br />
          Our <span className="text-red-500">Accreditation</span>
        </h2>
      </div>

      <div className="w-full px-4 mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {accredation?.map((item, index) => (
            <SwiperSlide key={index}>
          
      <AccradationCard testimonial={item} />
     
               
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}