'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Head from 'next/head';
import './slider.css';
import { H2 } from './Tyograohy';

const Hero = ({ slider = [] }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    postCode: '',
    businessName: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const onAutoplayTimeLeft = debounce((s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }, 100);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          phone: '',
          postCode: '',
          businessName: '',
          message: '',
        });
      } else {
        const { message } = await response.json();
        setFormStatus(`Failed to send message: ${message}`);
      }
    } catch (error) {
      setFormStatus('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={slider[0]?.image?.asset?.url || "/default-placeholder-400x400.webp"}
          as="image"
          fetchpriority="high"
        />
      </Head>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        effect="fade"
        className="w-full bg-cover bg-center min-h-screen flex items-center text-white"
        style={{ minHeight: "100vh", aspectRatio: "16/9" }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {slider.length > 0 ? (
          slider.map((slide, index) => (
            <SwiperSlide key={index}>
              <section className="bg-cover bg-center min-h-screen flex items-center text-white">
                <Image
                  src={`${slide?.image?.asset?.url}?w=400&h=400&fm=webp` || "/default-placeholder-400x400.webp"}
                  alt={slide?.title || "Hero Image"}
                  fill
                  priority
                  fetchPriority="high"
                  quality={60}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center brightness-80"
                  placeholder="blur"
                  blurDataURL="/globe.svg"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center sm:text-left mt-8 sm:mt-0 mb-8 sm:mb-0">
                      <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-md mb-4">
                        🚛 WELCOME TO Mak Security
                      </span>
                      <h1
                        className="text-4xl lg:text-6xl font-bold"
                        style={{ minHeight: '150px' }}
                      >
                        {slide?.title?.slice(0, 8)} <br />
                        <span className="text-red-500">{slide?.title?.slice(8, 26)}</span> <br />
                        {slide?.title?.slice(26, 200)}
                      </h1>
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
                    <div
                      className="bg-white text-black p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg mb-4"
                      style={{ minWidth: '300px', maxWidth: '700px' }}
                    >
                      <H2 className="text-xl font-bold text-red-500 mb-4">Get In Touch</H2>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium">Your Name:</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Ex: John Doe"
                              className="w-full px-4 py-2 border rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label className="block font-medium">Your Phone:</label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Ex: +88 1234 3456"
                              className="w-full px-4 py-2 border rounded-md"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium">Your Email:</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Ex: example@email.com"
                              className="w-full px-4 py-2 border rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label className="block font-medium">Subject:</label>
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Ex: Inquiry"
                              className="w-full px-4 py-2 border rounded-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-medium">Post Code:</label>
                            <input
                              type="text"
                              name="postCode"
                              value={formData.postCode}
                              onChange={handleInputChange}
                              placeholder="Ex: 12345"
                              className="w-full px-4 py-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block font-medium">Business Name:</label>
                            <input
                              type="text"
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleInputChange}
                              placeholder="Ex: John"
                              className="w-full px-4 py-2 border rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-medium">Message:</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter your message..."
                            className="w-full px-4 py-2 border rounded-md h-32 resize-none"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`w-full bg-red-500 text-white py-2 rounded-md hover:bg-[#000] ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? 'Submitting...' : 'Submit →'}
                        </button>
                      </form>
                      {formStatus && (
                        <p
                          className={`mt-4 text-center ${
                            formStatus.includes('Error') || formStatus.includes('Failed')
                              ? 'text-red-500'
                              : 'text-green-500'
                          }`}
                        >
                          {formStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <section className="relative bg-cover bg-center min-h-screen flex items-center text-white">
              <Image
                src="/default-placeholder-400x400.webp"
                alt="Default Hero Image"
                fill
                quality={60}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center brightness-80"
                placeholder="blur"
                blurDataURL="/globe.svg"
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
                <div className="text-center">
                  <h1 className="text-4xl lg:text-6xl font-bold">Welcome to Mak Security</h1>
                  <p>No slides available.</p>
                </div>
              </div>
            </section>
          </SwiperSlide>
        )}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default Hero;