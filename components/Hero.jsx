'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';

import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './slider.css';

const Hero = ({ slider = [] }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div>
      {slider.map((slide, index) => (
        <section
          key={index}
          className="relative bg-cover bg-center min-h-screen flex items-center text-white"
        >
          {/* Background Image */}
          <Image
            src={slide?.image || "/default-placeholder.jpg"}
            alt={slide?.title || "Hero Image"}
            fill
            priority
            quality={80}
            className="object-cover object-center brightness-80"
            placeholder="blur"
            blurDataURL="/globe.svg"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Main Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text & CTA */}
              <div className="text-center sm:text-left mt-8 sm:mt-0 mb-8 sm:mb-0">
                <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-md mb-4">
                  🚛 WELCOME TO Mak Security
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  {slide?.title?.slice(0, 8)} <br />
                  <span className="text-red-500">{slide?.title?.slice(8, 26)}</span> <br />
                  {slide?.title?.slice(26, 200)}
                </h1>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-row gap-4 justify-center sm:justify-start">
    <Link
      href="#about"
      className="bg-red-500 text-white px-6 py-3 rounded-md text-lg hover:bg-[#000] ml-8 lg:ml-0"
    >
      Explore More →
    </Link>
    <Link
      href="https://youtu.be/qkgLNECug6E"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-white text-red-500 w-12 h-12 rounded-full shadow-lg hover:bg-red-500 transition"
    >
      ▶
    </Link>
  </div>
</div>

              {/* Right Side - Request Estimate Form */}
              <div className="bg-white text-black p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg mb-4">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Get In Touch</h2>
                <form className="space-y-4">
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Your Name:</label>
                      <input
                        type="text"
                        placeholder="Ex: John Doe"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Your Phone:</label>
                      <input
                        type="number"
                        placeholder="Ex: +88 1234 3456"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  {/* Email and Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Your Email:</label>
                      <input
                        type="email"
                        placeholder="Ex: example@email.com"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Subject:</label>
                      <input
                        type="text"
                        placeholder="Ex: Inquiry"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  {/* Post Code and Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">Post Code:</label>
                      <input
                        type="text"
                        placeholder="Ex: 12345"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Business Name:</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-medium">Message:</label>
                    <textarea
                      placeholder="Enter your message..."
                      className="w-full px-4 py-2 border rounded-md h-32 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-[#000]">
                    Submit →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Hero;