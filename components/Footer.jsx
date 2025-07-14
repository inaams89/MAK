"use client";

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaHome, FaHouseUser, FaLine, FaArrowUp, FaCity } from 'react-icons/fa';
import { H5, H6 } from './Tyograohy';
import { useState,useEffect } from 'react';
export default function Footer() {
      const [services, setServices] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const serverUrl = process.env.NEXT_PUBLIC_DJANGO_URLS;
      useEffect(() => {
        const fetchServices = async () => {
          try {
            const response = await fetch(`${serverUrl}setting/`);
            if (!response.ok) {
              throw new Error("Failed to fetch services");
            }
            const data = await response.json();
            setServices(data[0]);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchServices();
      }, []);
  return (
    <footer className="bg-[#060505]  py-2 text-white">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <H5 className="text-xl font-semibold mb-4">Get In Touch</H5>
            <div>
    
      <p className="mb-2">
          <strong className="flex items-center space-x-2">
            <FaHome className="w-4 h-4 text-red-500" />
            <strong>{services.addresstitle}</strong>
            </strong>
        
      </p>
      <p className="mb-2">
          <strong className="flex items-center space-x-2">
            <FaHouseUser className="w-4 h-4 text-red-500" />
            <strong className='font-medium'>        {services.house}
            </strong>
            </strong>
        
      </p>
      <p className="mb-2">
          <strong className="flex items-center space-x-2">
            <FaArrowUp className="w-4 h-4 text-red-500" />
            <strong className='font-medium'>      {services.street}
            </strong>
            </strong>
        
      </p>
      <p className="mb-2">
          <strong className="flex items-center space-x-2">
            <FaCity className="w-4 h-4 text-red-500" />
            <strong className='font-medium'>       {services.city}
            </strong>
            </strong>
        
      </p>

      <p className="mb-2">
        <Link href={`tel:${services && services.phone ? services.phone : '#'}`  }     aria-label={services?.phone}>
          <strong className="flex items-center space-x-2">
            <FaPhone className="w-4 h-4 text-red-500" />
            <span className='font-medium'>{services && services.phone ? services.phone : ''}</span>
          </strong>
        </Link>
      </p>

      <p className="mb-2">
      
        <Link href={`mailto:${services && services.email ? services.email : '#'}`}     aria-label={services?.email}>
          <strong className="flex items-center space-x-2">
            <FaEnvelope className="w-4 h-4 text-red-500" />
            <span className='font-medium'>{services && services.email ? services.email : ''}</span>
          </strong>
        </Link>
      </p>
    </div>
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
            <div className="flex justify-center gap-6 my-8 w-60 h-10">
     
     <Link
       href={`${services && services?services?.facedbook:'#'}` }
       target="_blank"
       aria-label={services.facedbook}
       rel="noopener noreferrer"
       className="social-icon bg-blue-600 p-2  rounded-[20%] hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
     >
       <FaFacebookF className="text-white text-2xl" />
     </Link>

   
     <Link
       href={`${services && services?services?.xurl:'#'}`}
       target="_blank"
       aria-label={services.xurl}

       rel="noopener noreferrer"
       className="social-icon bg-blue-400 p-2 rounded-[20%] hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
     >
       <FaTwitter className="text-white text-2xl" />
     </Link>

     <Link
       href={`${services && services?services?.instagram:'#'}`}
       target="_blank"
       rel="noopener noreferrer"
       aria-label={services.instagram}

       className="social-icon p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[20%] hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
     >
       <FaInstagram className="text-white text-2xl" />
     </Link>

     <Link
       href={`${services && services?services?.linkedin:'#'}`}
       target="_blank"
       aria-label={services.linkedin}

       rel="noopener noreferrer"
       className="social-icon bg-blue-700 p-2 rounded-[20%] hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
     >
       <FaLinkedinIn className="text-white text-2xl" />
     </Link>

    
   </div>
         
              
            
          
            </div>
          </div>

          {/* Top Pages Links */}
          <div>
            <H5 className="text-xl font-semibold mb-4">Top Pages</H5>
            <ul>
              <li><a href="/services" className="text-white hover:text-red-500">Services</a></li>
              <li><a href="/areas-covered" className="text-white hover:text-red-500">Areas Covered</a></li>
              <li><a href="/key-holding" className="text-white hover:text-red-500">Key Holding</a></li>
              <li><a href="/home-key-holding" className="text-white hover:text-red-500">Home Key Holding</a></li>
              <li><a href="/commercial-key-holding" className="text-white hover:text-red-500">Commercial Key Holding Services</a></li>
              <li><a href="/security-manchester" className="text-white hover:text-red-500">Security Manchester</a></li>
              <li><a href="/manned-guarding" className="text-white hover:text-red-500">Manned Guarding</a></li>
              <li><a href="/security-systems" className="text-white hover:text-red-500">Security Systems</a></li>
              <li><a href="/car-park-management" className="text-white hover:text-red-500">Car Park Management</a></li>
              <li><a href="/facility-management" className="text-white hover:text-red-500">Facility Management</a></li>
              <li><a href="/job-vacancies" className="text-white hover:text-red-500">Job Vacancies</a></li>
              <li><a href="/contact-us" className="text-white hover:text-red-500">Contact Us</a></li>
            </ul>
          </div>

          {/* News & Updates Section */}
          <div>
            <H5 className="text-xl font-semibold mb-4">News/Updates</H5>
            <ul>
              <li>
                <a
                  href="/news/security-dog-handler"
                  className="text-white hover:text-gray-800"
                >
                  <strong>Security Dog Handler</strong> - Dog Handling Security Services in the UK
                  <br />
                  <span className="text-sm text-gray-300">October 1, 2024</span>
                </a>
              </li>
              <li>
                <a
                  href="/news/sia-reduction"
                  className="text-white hover:text-gray-800"
                >
                  <strong>SIA makes a further reduction to the SIA licence fee</strong>
                  <br />
                  <span className="text-sm text-gray-300">March 1, 2023</span>
                </a>
              </li>
              <li>
                <a
                  href="/news/acs-pacesetters"
                  className="text-white hover:text-gray-400"
                >
                  <strong>ACS Pacesetters Accredited Security Company</strong> - ACS Pacesetters and Mak Security
                  <br />
                  <span className="text-sm text-gray-300">August 10, 2022</span>
                </a>
              </li>
            </ul>
               {/* Newsletter Section */}
        <div className="mt-4 text-center">
          <H6 className="text-xl text-center font-semibold mb-4">Join Our Newsletter</H6>
          <form>
            <input
              type="email"
              className="px-4 py-2 rounded-l-lg border-2 border-white bg-gray-800 text-white focus:outline-none"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[red] ml-0.2 text-white font-bold rounded-r-lg hover:bg-opacity-60 hover:bg-[#fff] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
          </div>
        </div>

     
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-gray-300">
      {/* {new Date().getFullYear()}  */}
        <p>{services.copyrights}</p>
      </div>
    </footer>
  );
}