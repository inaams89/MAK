"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import SocialMediaCard from "./SocialMediaCard";

const testimonials = [
  {
    platform: "Facebook",
    username: "@john_doe",
    comment:
      "Mak Security provided excellent service! Highly recommend them for their professionalism and quick response.",
    date: "2023-10-01",
  },
  {
    platform: "Twitter",
    username: "@jane_smith",
    comment:
      "Great experience with Mak Security. Their team is knowledgeable and friendly.",
    date: "2023-09-25",
  },
  {
    platform: "Instagram",
    username: "@alex_wilson",
    comment:
      "I feel much safer after installing their security system. Thank you, Mak Security!",
    date: "2023-09-15",
  },
  {
    platform: "Facebook",
    username: "@john_doe",
    comment:
      "Mak Security provided excellent service! Highly recommend them for their professionalism and quick response.",
    date: "2023-10-01",
  },
  {
    platform: "Twitter",
    username: "@jane_smith",
    comment:
      "Great experience with Mak Security. Their team is knowledgeable and friendly.",
    date: "2023-09-25",
  },
  {
    platform: "Google",
    username: "@alex_wilson",
    comment:
      "I feel much safer after installing their security system. Thank you, Mak Security!",
    date: "2023-09-15",
  },
];

export default function SocialMediaTestimonials() {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 60;
  
    const toggleExpanded = () => setExpanded((prev) => !prev);
  
  return (
    <div className="relative bg-gradient-to-b from-white to-[#FFEFEF] py-20 mt-6">
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
      <h2 className="text-3xl md:text-4xl font-bold text-center">
  What People Say on <br />
  <span className="text-red-500">Social Media</span>
</h2>
    </div >
    <div className="w-full px-4">

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full mt-8"
        >
           
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
                    <SocialMediaCard testimonial={testimonial} />
              
                 
   
            </SwiperSlide>
          ))}
         
        </Swiper>
      </div>
    </div>
  );
}
