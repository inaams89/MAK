// components/ServicesSlug.js
"use client";
import { useEffect, useState } from "react";

import { PortableText } from "@portabletext/react";
import Header from "./Navbar";
import Footer from "./Footer";
import Features from "./Features";
import AccreditationPage from "./Accreditation";
import Testimonials from "./Testimonials";
import { H1, H3 } from "./Tyograohy";
import { urlFor } from "@/sanity/client";

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).url()}
        alt={value.alt || "Image"}
        style={{ width: "auto", height: "auto", objectFit: "contain" }}
        className="my-4"
      />
    ),
  },
  block: {
    normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
  },
};

export default function ServicesSlug({ initialservice }) {
  const [service, setService] = useState(initialservice);


  if (!service) {
    return <div className="font-sans bg-gray-100">No service data available</div>;
  }

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div
        className="relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${service.image ? urlFor(service.image).url() : "/images/fallback.jpg"})`,
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

        {service.description3 && (
          <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20 backdrop-blur-lg shadow-2xl hover:shadow-3xl hover:border-red-600 transition-all duration-500 hover:scale-[1.02]">
            <PortableText value={service.description3} components={portableTextComponents} />
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

      {/* <Features />
      <AccreditationPage />
      <Testimonials /> */}
      <Footer />
    </div>
  );
}