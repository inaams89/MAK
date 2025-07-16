// components/ServiceComponent.js
'use client';

import { useEffect, useState } from 'react';
import Header from './Navbar';
import Link from 'next/link';
import Footer from './Footer';
import Features from './Features';
import AccreditationPage from './Accreditation';
import Testimonials from './Testimonials';
import { H1, H5 } from "./Tyograohy";
import { client } from '@/sanity/client'; // Adjust the path to your Sanity client

const Services = ({ service }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const frontend = process.env.NEXT_PUBLIC_FRONTEND_URL;

  // SEO Metadata handling based on service prop
  const metadata = {
    title: service?.metaName
      ? String(service.metaName)
      : 'Mak Security UK | Professional Security Solutions',
    description: service?.metaDescription
      ? String(service.metaDescription)
      : 'Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.',
    keywords: service?.metaKeywords
      ? String(service.metaKeywords)
      : 'security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK',
    openGraph: {
      title: service?.metaName || 'Mak Security UK | Professional Security Solutions',
      description:
        service?.metaDescription ||
        'Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.',
      url: frontend || 'https://mak-security-uk',
      images: ['/images/mak-security-logo.png'], // Replace with the actual logo or an image
    },
    twitter: {
      card: 'summary_large_image',
      title: service?.metaName || 'Mak Security UK | Professional Security Solutions',
      description:
        service?.metaDescription ||
        'Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.',
      url: frontend || 'https://mak-security-uk',
      images: ['/images/mak-security-logo.png'], // Replace with the actual logo or an image
    },
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch all serviceCategory documents
        const query = `*[_type == "serviceCategory"]{..., "image": image.asset->url}`;
        const data = await client.fetch(query);
        setServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="title" content={metadata.title} />
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta property="og:title" content={metadata.openGraph.title} />
      <meta property="og:description" content={metadata.openGraph.description} />
      <meta property="og:url" content={metadata.openGraph.url} />
      <meta property="og:image" content={metadata.openGraph.images[0]} />
      <meta name="twitter:title" content={metadata.twitter.title} />
      <meta name="twitter:description" content={metadata.twitter.description} />
      <meta name="twitter:image" content={metadata.twitter.images[0]} />
      <meta name="twitter:card" content={metadata.twitter.card} />

      <div className="font-sans bg-gray-100">
        <Header />
        <div className="relative bg-cover bg-center h-80">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Our Services</H1>
          </div>
        </div>

        <div className="container mx-auto p-6">
          {loading && <p className="text-center text-lg text-gray-600">Loading services...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services?.map((service) => (
              <Link key={service.slug.current} href={`/service/${service.slug.current}`}>
                <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                  )}
                  <H5 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {service.name}
                  </H5>
                  <p className="text-gray-500 text-sm mt-2">{service.sutitle?.slice(0, 80)}...</p>
                  <strong className="mt-4 inline-block text-red-500 hover:underline text-md font-medium transition-all duration-300">
                    Read More
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Uncomment if needed */}
        {/* <Features />
        <AccreditationPage />
        <Testimonials /> */}
        <Footer />
      </div>
    </>
  );
};

export default Services;