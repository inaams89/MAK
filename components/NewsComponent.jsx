// components/News.jsx
'use client';

import Header from './Navbar';
import Link from 'next/link';
import Footer from './Footer';
import { H1, H3, H4, H5 } from "./Tyograohy";
import { urlFor } from '@/sanity/client';

export default function News({ news, services }) {
  console.log('News SEO:', news);
  console.log('News Articles:', services);

  if (!services || services.length === 0) {
    return (
      <div className="font-sans bg-gray-100">
        <Header />
        <div
          className="relative bg-cover bg-center h-96"
          style={{ backgroundImage: 'url(/images/fallback.jpg)' }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Latest News & Articles</H1>
          </div>
        </div>
        <div className="container mx-auto p-6">
          <p className="text-center text-red-500">No news articles available</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: 'url(/images/fallback.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Latest News & Articles</H1>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link key={service.slug.current} href={`/news/${service.slug.current}`}>
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                {service.image && (
                  <img
                    src={urlFor(service.image).url()}
                    alt={service.image.alt || service.title || 'service'}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                )}
                <div className="space-y-2">
                  <H5 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </H5>
                  {service.subtitle && (
                    <p className="text-gray-500 text-sm">{service.subtitle.slice(0, 200)}...</p>
                  )}
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(service.publishedDate).toLocaleDateString()}
                  </p>
                  <strong className="mt-4 inline-block text-red-500 hover:underline text-md font-medium transition-all duration-300">
                    Read More
                  </strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}