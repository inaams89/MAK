'use client';

import * as FaIcons from 'react-icons/fa';
import { useMemo } from 'react';
import { H4 } from './Tyograohy';
import { IoArrowForwardOutline } from 'react-icons/io5';
import Link from 'next/link';
import { data } from 'autoprefixer';
import { PortableText } from '@portabletext/react';
import { useState } from 'react';

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset ? urlFor(value).url() : ''}
        alt={value.alt || 'News Article Image'}
        style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
        className="my-4"
      />
    ),
  },
  block: {
    normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
  },
};
const WhyChooseUs = ({ whyus }) => {
  console.log("why us")
  const features = useMemo(() => whyus?.benefits || [], [whyus]);
const [expanded, setExpanded] = useState(false);

  const getTextFromBlocks = (blocks) => {
    return blocks
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children.map(child => child.text).join(' ');
        }
        return '';
      })
      .join(' ')
      .trim();
  };

  const fullText = getTextFromBlocks(whyus.content);
  const wordCount = fullText.split(/\s+/).length;

  const truncatedText = fullText.split(/\s+/).slice(0, 200).join(' ') + '...';
  console.log("Features",features);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-200 py-24 rounded-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Header */}
            <H4 className="text-5xl md:text-6xl font-bold text-black text-center md:text-left">
              {whyus?.title || 'Why Us'}
            </H4>

            {/* Description and Learn More Button */}
            <div className="text-left max-w-2xl">
 <div className="text-black text-md md:text-md opacity-90 leading-normal">
      {wordCount <= 20 || expanded ? (
        <PortableText value={whyus.content} components={portableTextComponents} />
      ) : (
        <p>{truncatedText}</p>
      )}

      {wordCount > 20 && (
    <button
  onClick={() => setExpanded(!expanded)}
  className="flex items-center space-x-2 text-red-500 hover:text-red-600 mt-2 transition duration-300 font-semibold"
>
  <span>{expanded ? 'View Less' : 'View More'}</span>
  {!expanded && <IoArrowForwardOutline size={18} className="animate-bounce-horizontal" />}
</button>
      )}
    </div>                
           
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-200 flex justify-center mb-16 items-center py-2 px-8 relative overflow-hidden">
        <div className="relative z-10 max-w-8xl w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {features.length > 0 ? (
              features.map((feature, index) => {
                const IconComponent = FaIcons[feature.icon] || FaIcons.FaQuestionCircle;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center text-center p-8 w-80 h-48 rounded-xl bg-black shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-4 cursor-pointer group overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-full w-16 h-16 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                      <IconComponent size={28} color="white" aria-label={feature.title} />
                    </div>
                    <h3 className="mt-6 text-xl font-[500] text-white group-hover:text-white duration-300">
                      {feature.title}
                    </h3>
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 opacity-10 transition-opacity duration-500 animate-float"></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No features available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;