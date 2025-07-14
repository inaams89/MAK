'use client'

import { useEffect, useState } from "react";
import Header from "./Navbar";
import Link from "next/link";
import Footer from "./Footer";
import Features from "./Features";
import AccreditationPage from "./Accreditation";
import Testimonials from "./Testimonials";
import { H1, H3 } from "./Tyograohy";
const ServicesSlug = ({initialservice}) => {
  
    console.log(initialservice)
  const [service, setServices] = useState(initialservice);
const [sanitizedHTML,setsanitizedhtml]=useState()
const [sanitizedHTML2,setsanitizedhtml2]=useState()
const frontend=process.env.NEXT_PUBLIC_DJANGO_URLS;
// SEO Metadata handling based on initialservice
const metadata = {
  title: service?.meta_name
    ? String(service.meta_name)
    : "Mak Security UK | Professional Security Solutions",
  description: service?.meta_description
    ? String(service?.meta_description)
    : "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
  keywords: service?.meta_keywords
    ? String(service.meta_keywords)
    : "security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK",
  openGraph: {
    title:
      service?.meta_name ||
      "Mak Security UK | Professional Security Solutions",
    description:
      service?.meta_description || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
    url: `${frontend} || "mak-security-uk"}`,
    images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
  },
  twitter: {
    card: "summary_large_image",
    title:
      service?.meta_name ||
      "Mak Security UK | Professional Security Solutions",
    description:
      service?.meta_name || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
    url: `${frontend} || "mak-security-uk"}`,
    images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
  },
};
    useEffect(() => {
        const adjustImagePaths = (html, baseUrl) => {
          if (typeof window !== 'undefined') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const images = doc.querySelectorAll("img");
          
            images.forEach((img) => {
              const src = img.getAttribute("src");
          
              // Skip base64 images
              if (src && src.startsWith("data:")) {
                img.style.width = "auto";  // Let the image retain its natural width
                img.style.height = "auto"; // Let the image retain its natural height
                img.style.objectFit = "contain"; 
              }
          
              // Adjust non-base64 image paths
              if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                img.setAttribute("src", `${src}`);
              }
            });
          
            return doc.body.innerHTML;
            
          }
         
        };
        setsanitizedhtml(adjustImagePaths(initialservice?.description ))
        setsanitizedhtml2(adjustImagePaths(initialservice?.description2 ))

        }),[]

  return (
    <>
    <title>{metadata.title}</title>

<meta name="title" content={metadata.title} />
<meta name="description" content={metadata.description} />
<meta name="keywords" content={metadata.keywords} />
<meta property="og:title" content={metadata.openGraph.title} />
<meta
  property="og:description"
  content={metadata.openGraph.description}
/>
<meta property="og:url" content={metadata.openGraph.url} />
<meta property="og:image" content={metadata.openGraph.images} />
<meta name="twitter:title" content={metadata.twitter.title} />
<meta name="twitter:description" content={metadata.twitter.description} />
<meta name="twitter:image" content={metadata.twitter.images} />
    <div className="font-sans bg-gray-100">
      <Header />
            <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: `url(${service?.image})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
  <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{service?.title}</H1>
  
  {/* Subtitle on a new row with margin-top for spacing */}
  <H3 className="text-lg md:text-lg lg:text-lg font-semibold mt-4 opacity-80">
    {service?.sutitle}
  </H3>
</div>
      
      </div>

<div className="container mx-auto p-6">
  {service?.description && (
    <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20  shadow-2xl hover:shadow-3xl hover:border-red-600 transition-all duration-500 hover:scale-[1.02]">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} className="leading-relaxed" />
    </div>
  )}

  <AccreditationPage />

  {service?.description2 && (
    <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20 backdrop-blur-xs shadow-2xl hover:shadow-3xl hover:border-red-600 transition-all duration-500 hover:scale-[1.02]">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML2 }} className="leading-relaxed" />
    </div>
  )}

  {service?.description3 && (
    <div className="text-gray-800 mb-6 p-8 border-l-4 border-red-500 rounded-xl bg-white/20 backdrop-blur-lg shadow-2xl hover:shadow-3xl hover:border-red-600 transition-all duration-500 hover:scale-[1.02]">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML3 }} className="leading-relaxed" />
    </div>
  )}
</div>

      {/* <Features />
      <AccreditationPage />
      <Testimonials /> */}
      <Footer />
    </div>
    </>
  )

};


export default ServicesSlug