// components/Contact.jsx
'use client';

import Header from './Navbar';
import Footer from './Footer';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../sanity/client';
import { useState } from 'react';

export default function Contact({ contactData = {} }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const { message } = await response.json();
        setFormStatus(`Failed to send message: ${message}`);
      }
    } catch (error) {
      setFormStatus('Error: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <div className="font-sans bg-gray-50">
      <Header />  {/* Banner Section */}
  <div className="relative bg-cover bg-center h-[450px]">
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <div className="relative w-full h-[400px] md:h-[500px]">
      {contactData?.image?.asset ? (
        <Image
          src={urlFor(contactData.image).url()}
          alt={contactData.title || 'Contact Banner'}
          width={1299}
          height={400}
          priority
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src="/default-placeholder.jpg"
          alt="Default Contact Banner"
          width={1299}
          height={400}
          priority
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 animate-fade-in-down">
          {contactData?.title?.toUpperCase() || 'CONTACT US'}
        </h1>
        {contactData?.subtitle && (
          <p className="mt-2 text-lg font-light opacity-80">{contactData.subtitle}</p>
        )}
      </div>
    </div>
  </div>

  {/* Contact Information Section */}
  <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-20 overflow-hidden">
    <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 transform transition-all hover:scale-105 duration-300 hover:shadow-3xl">
          <h2 className="text-4xl font-bold text-gray-800 border-b-2 pb-4 border-gradient-to-r from-red-600 to-red-800">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            {contactData?.content || "We'd love to hear from you. Reach out for any questions or inquiries."}
          </p>
          <div className="space-y-6">
            <div className="text-gray-800 flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full animate-bounce">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <a
                  href={`mailto:${contactData?.email || 'support@mak-security.co.uk'}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  {contactData?.email || 'support@mak-security.co.uk'}
                </a>
              </div>
            </div>
            <div className="text-gray-800 flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-full animate-bounce">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <a
                  href={`tel:${contactData?.phone || '+44 123 456 7890'}`}
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
                >
                  {contactData?.phone || '+44 123 456 7890'}
                </a>
              </div>
            </div>
            <div className="text-gray-800 flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-pink-600 rounded-full animate-bounce">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p className="text-gray-600 hover:text-pink-600 transition-colors duration-300">
                  {contactData?.address || '123 Main Street, Manchester, UK'}
                </p>
              </div>
            </div>
          </div>
        </div>


            {/* ... existing contact info ... */}
            <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 transform transition-all hover:scale-105 duration-300 hover:shadow-3xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Inquiry about services"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-700 transition duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
              {formStatus && (
                <p className={`mt-4 text-center ${formStatus.includes('Error') || formStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                  {formStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Google Map (unchanged) */}
      <div className="relative w-full h-[400px] mt-12 mb-0.5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.7429046223145!2d-122.083847084691!3d37.38605177982564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb66fa0ec69e3%3A0x6d8d5e51822599a2!2sGoogleplex!5e0!3m2!1sen!2us!4v1584430036712!5m2!1sen!2sus"
          className="absolute inset-0 w-full h-full border-2 border-red-500"
          loading="lazy"
        ></iframe>
      </div>

      <Footer contactData={contactData} />
    </div>
  );
}