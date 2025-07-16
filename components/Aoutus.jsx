'use client';

import React, { useState } from 'react';
import { H3 } from './Tyograohy';
import Image from 'next/image';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { FaBriefcase, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SanityBlockContent from '@sanity/block-content-to-react';
import { sanitySerializers } from '../sanity/client';

export default function AboutUs({ aboutUs = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Validate Portable Text blocks
  const isValidBlocks = Array.isArray(aboutUs?.content) && aboutUs.content.length > 0;

  return (
    <div id="abo" className="bg-gray-50">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-10 lg:px-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full">
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">🚛👮</span>
              <H3 className="text-sm font-semibold">Who we are</H3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {aboutUs?.title?.slice(0, 6) || 'About '}{' '}
              <span className="text-red-500">{aboutUs?.title?.slice(6, 40) || 'Us'}</span>
            </h2>
            <h4 className="text-3xl md:text-4xl font-bold leading-tight">
              {aboutUs?.sutitle?.slice(0, 6) || ''}{' '}
              <span className="text-red-500">{aboutUs?.sutitle?.slice(6, 40) || ''}</span>
            </h4>
            {isValidBlocks ? (
              <SanityBlockContent
                blocks={isExpanded ? aboutUs.content : aboutUs.content.slice(0, 3)}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                serializers={sanitySerializers}
              />
            ) : (
              <p className="text-[#565969] text-md">No content available.</p>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-red-500 font-medium hover:underline mt-2"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            <div className="mt-2 space-y-4">
              <div className="bg-white border-l-4 border-red-500 p-4 flex items-start shadow-md rounded-lg">
                <div className="bg-red-500 text-white p-3 rounded-full text-xl">
                  <FaGlobe />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">SIA Approved Company</h3>
                  <p className="text-gray-500 text-sm">
                    MAK Security is an SIA approved company since its inception in 2009. MAK is ISO9001 and ISO14001 certified.
                  </p>
                </div>
              </div>
              <div className="bg-white border-l-4 border-red-500 p-4 flex items-start shadow-md rounded-lg">
                <div className="bg-red-500 text-white p-3 rounded-full text-xl">
                  <FaBriefcase />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Local Service</h3>
                  <p className="text-gray-500 text-sm">
                    Based in Manchester, Liverpool, and Birmingham, MAK Security is a reputable security services company serving clients across the UK.
                  </p>
                </div>
              </div>
            </div>
            <button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-[#000]">
              More About Us <span>↗</span>
            </button>
          </div>
          <div className="lg:w-1/2 relative ml-6">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileHover={{
                scale: 1.08,
                rotate: 6,
                boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.4, ease: 'easeInOut' },
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              {aboutUs?.image?.asset?.url ? (
                <Image
                  src={aboutUs.image.asset.url}
                  alt="Our Team"
                  width={750}
                  height={500}
                  className="rounded-lg object-cover w-full h-[300px] sm:h-[200px] xs:h-[100px] md:h-[500px] lg:h-[500px]"
                />
              ) : (
                <Image
                  src="/default-placeholder.jpg"
                  alt="Default About Us Image"
                  width={750}
                  height={500}
                  className="rounded-lg object-cover w-full h-[300px] sm:h-[200px] xs:h-[100px] md:h-[500px] lg:h-[500px]"
                />
              )}
            </motion.div>
            <div className="absolute top-6 left-6 bg-white shadow-lg px-4 py-2 rounded-lg border-t-4 border-red-500">
              <h4 className="text-2xl font-bold text-black">16+</h4>
              <p className="text-xs font-semibold text-gray-600">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}