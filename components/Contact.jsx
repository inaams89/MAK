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
      <Header />
      {/* Banner Section (unchanged) */}
      <div className="relative bg-cover bg-center h-[450px]">
        {/* ... existing banner code ... */}
      </div>

      {/* Contact Information Section (unchanged) */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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