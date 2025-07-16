'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaHome, FaHouseUser, FaArrowUp, FaCity } from 'react-icons/fa';
import { H5, H6 } from './Tyograohy';

export default function Footer({ homeDetail = {} }) {
  const services = homeDetail.homeDetail || {};

  return (
    <footer className="bg-[#060505] py-2 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <H5 className="text-xl font-semibold mb-4">Get In Touch</H5>
            <div>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaHome className="w-4 h-4 text-red-500" />
                  <span>{services.addresstitle || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaHouseUser className="w-4 h-4 text-red-500" />
                  <span>{services.house || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaArrowUp className="w-4 h-4 text-red-500" />
                  <span>{services.street || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaCity className="w-4 h-4 text-red-500" />
                  <span>{services.city || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <Link href={`tel:${services.phone || '#'}`} aria-label={services.phone || 'Phone'}>
                  <strong className="flex items-center space-x-2">
                    <FaPhone className="w-4 h-4 text-red-500" />
                    <span>{services.phone || 'N/A'}</span>
                  </strong>
                </Link>
              </p>
              <p className="mb-2">
                <Link href={`mailto:${services.email || '#'}`} aria-label={services.email || 'Email'}>
                  <strong className="flex items-center space-x-2">
                    <FaEnvelope className="w-4 h-4 text-red-500" />
                    <span>{services.email || 'N/A'}</span>
                  </strong>
                </Link>
              </p>
            </div>
            <div className="mt-4 flex space-x-4">
              <div className="flex justify-center gap-6 my-8 w-60 h-10">
                <Link
                  href={services.facebook || '#'}
                  target="_blank"
                  aria-label={services.facebook || 'Facebook'}
                  rel="noopener noreferrer"
                  className="social-icon bg-blue-600 p-2 rounded-[20%] hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <FaFacebookF className="text-white text-2xl" />
                </Link>
                <Link
                  href={services.xurl || '#'}
                  target="_blank"
                  aria-label={services.xurl || 'Twitter'}
                  rel="noopener noreferrer"
                  className="social-icon bg-blue-400 p-2 rounded-[20%] hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <FaTwitter className="text-white text-2xl" />
                </Link>
                <Link
                  href={services.instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={services.instagram || 'Instagram'}
                  className="social-icon p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[20%] hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <FaInstagram className="text-white text-2xl" />
                </Link>
                <Link
                  href={services.linkedin || '#'}
                  target="_blank"
                  aria-label={services.linkedin || 'LinkedIn'}
                  rel="noopener noreferrer"
                  className="social-icon bg-blue-700 p-2 rounded-[20%] hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <FaLinkedinIn className="text-white text-2xl" />
                </Link>
              </div>
            </div>
          </div>
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
          <div>
            <H5 className="text-xl font-semibold mb-4">News/Updates</H5>
            <ul>
              <li>
                <a href="/news/security-dog-handler" className="text-white hover:text-gray-800">
                  <strong>Security Dog Handler</strong> - Dog Handling Security Services in the UK
                  <br />
                  <span className="text-sm text-gray-300">October 1, 2024</span>
                </a>
              </li>
              <li>
                <a href="/news/sia-reduction" className="text-white hover:text-gray-800">
                  <strong>SIA makes a further reduction to the SIA licence fee</strong>
                  <br />
                  <span className="text-sm text-gray-300">March 1, 2023</span>
                </a>
              </li>
              <li>
                <a href="/news/acs-pacesetters" className="text-white hover:text-gray-400">
                  <strong>ACS Pacesetters Accredited Security Company</strong> - ACS Pacesetters and Mak Security
                  <br />
                  <span className="text-sm text-gray-300">August 10, 2022</span>
                </a>
              </li>
            </ul>
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
        <div className="mt-12 text-center text-gray-300">
          <p>{services.copyrights || `© ${new Date().getFullYear()} Mak Security`}</p>
        </div>
      </div>
    </footer>
  );
}