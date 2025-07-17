'use client';

import Link from 'next/link';
import { IoArrowForwardOutline } from 'react-icons/io5';
import Image from 'next/image';
import SanityBlockContent from '@sanity/block-content-to-react';

const Services = ({ services = [] }) => {
  // Log services for debugging
  console.log('Services prop:', services);

  return (
    <section className="bg-gray-200 py-20">
      {/* Hero Section */}
      <section className="bg-gray-200 rounded-lg relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-4xl md:text-5xl font-bold text-black text-center md:text-left">
              Our <span className="text-red-500">Services</span>
            </div>
            <div className="text-left max-w-2xl">
              <p className="text-black text-md md:text-md opacity-90 leading-normal">
                We supply and manage trained SIA licensed Security Officers who specialize in Manned Security Guarding, Event Security, and Mobile Patrolling. Rest assured, your property is in safe hands.
              </p>
              <div className="mt-4 flex justify-center md:justify-start">
                <Link
                  href="/services"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-300"
                  aria-label="View all available services"
                >
                  <span className="text-red-500 font-semibold">View All Services</span>
                  <IoArrowForwardOutline size={16} className="animate-bounce-horizontal text-red-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col bg-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer overflow-hidden relative"
            >
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[250px] overflow-hidden">
                {service?.image?.asset?.url ? (
                  <Image
                    src={service.image.asset.url}
                    alt={service?.name || 'Service'}
                    fill
                    className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <Image
                    src="/default-placeholder.jpg"
                    alt="Default Service Image"
                    fill
                    className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-800 bg-opacity-90 p-4 sm:p-6 mx-4 sm:mx-8 mb-4 sm:mb-6 rounded-2xl text-center transform transition-all duration-500 ease-in-out group-hover:scale-105 z-10">
                <h3 className="text-sm font-semibold text-white mb-4 group-hover:text-white">
                  {service.name}
                </h3>
                <div className="flex justify-center">
                  <Link
                    href={service.slug?.current ? `/service/${service.slug.current}` : '/'}
                    className="text-white z-20 relative flex items-center space-x-2 hover:text-gray-200"
                    onClick={() => console.log('Navigating to:', service.slug?.current ? `/service/${service.slug.current}` : '/')}
                  >
                    <span>View Service</span>
                    <IoArrowForwardOutline size={16} className="mt-[2px]" />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 opacity-10 group-hover:opacity-20 transition-opacity duration-500 animate-float"></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No services available.</p>
        )}
      </div>
    </div>
    </section>
  );
};

export default Services;