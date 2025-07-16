'use client';

import { H4 } from './Tyograohy';
import Image from 'next/image';
import { FaQuestionCircle } from 'react-icons/fa';
import SanityBlockContent from '@sanity/block-content-to-react';
import { sanitySerializers } from '../sanity/sanitySerializers';

export default function Features({ approch = [] }) {
  return (
    <div>
      <div className="relative">
        <div className="relative bg-[#E54530] text-white py-24 px-6 text-center rounded-[40px] mx-auto overflow-hidden max-w-80 lg:max-w-7xl md:max-w-6xl sm:max-w-80 xs:max-w-7xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100"
            style={{ backgroundImage: "url('/image.webp')" }}
          ></div>
          <button className="relative border-2 border-white text-white px-4 py-2 rounded-full font-extrabold flex items-center mx-auto text-sm tracking-wide">
            👮🏻 HOW IT WORKS
          </button>
          <h2 className="relative text-4xl md:text-4xl font-extrabold mt-4">
            3 Easy Steps To Task
          </h2>
        </div>

        <div className="relative -mt-14 flex flex-col md:flex-row justify-center items-center gap-12 max-w-6xl mx-auto px-6">
          {approch.length > 0 ? (
            approch.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-12 rounded-xl shadow-lg text-black relative w-full md:w-1/3 text-center border-2 border-red-500 transition-transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-8">
                  <span className="bg-red-500 text-white rounded-full px-3 py-1 text-lg font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="bg-gray-100 p-3 rounded-full ml-4">
                    {feature.image?.asset?.url ? (
                      <Image
                        src={feature.image.asset.url}
                        alt={feature.title || 'Feature Icon'}
                        width={45}
                        height={45}
                      />
                    ) : (
                      <FaQuestionCircle size={45} />
                    )}
                  </div>
                </div>
                <h3 className="text-black font-bold text-2xl">{feature.title || 'No Title'}</h3>
                {feature.content ? (
                  <SanityBlockContent
                    blocks={feature.content}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    serializers={sanitySerializers}
                  />
                ) : (
                  <p className="text-[#565969] text-[14px] font-normal mt-2">
                    No description available.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No features available.</p>
          )}
        </div>
      </div>
    </div>
  );
}