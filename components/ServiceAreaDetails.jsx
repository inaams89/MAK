// components/ServiceAreaDetails.jsx
'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import Header from './Navbar';
import Footer from './Footer';
import AccreditationPage from './Accreditation';
import { H1, H3 } from "./Tyograohy";
import { urlFor } from '@/sanity/client'; // Import for image URL optimization

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset ? urlFor(value).url() : ''}
        alt={value.alt || 'Service Area Image'}
        style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
        className="my-4"
      />
    ),
  },
  block: {
    normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
  },
};

export default function ServicesAreaDetail({ initialservice }) {
  const [service] = useState(initialservice);

  console.log('Initial service area:', initialservice);

  if (!service) {
    return (
      <div className="font-sans bg-gray-100">
        <Header />
        <div className="container mx-auto p-6">
          <p className="text-center text-red-500">No service area data available</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div
        className="relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${service.image ? urlFor(service.image).url() : '/images/fallback.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{service.title}</H1>
          {service.subtitle && (
            <H3 className="text-lg md:text-lg lg:text-lg font-semibold mt-4 opacity-80">
              {service.subtitle}
            </H3>
          )}
        </div>
      </div>

      <div className="container mx-auto p-6">
        {service.description && (
          <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20 shadow-2xl hover:shadow-3xl hover:border-red-600 transition-all duration-500 hover:scale-[1.02]">
            <PortableText value={service.description} components={portableTextComponents} />
          </div>
        )}

        {/* <AccreditationPage /> */}

        {service.description2 && (
          <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20 backdrop-blur-xs shadow-2xl hover:shadow-3xl hover:border-red-600 transition-all duration-500 hover:scale-[1.02]">
            <PortableText value={service.description2} components={portableTextComponents} />
          </div>
        )}

        {service.images && service.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {service.images.map((img, index) => (
              <img
                key={index}
                src={img.asset?.url || '/images/fallback.jpg'}
                alt={img.alt || `Service Area Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* {service.address && (
          <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20 shadow-2xl">
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>{service.address}</p>
            {(service.latitude || service.longitude) && (
              <p>
                Coordinates: {service.latitude}, {service.longitude}
              </p>
            )}
          </div>
        )} */}
      </div>

      {/* Uncomment if needed */}
      {/* <Features /> */}
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
}