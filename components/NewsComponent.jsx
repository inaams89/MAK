'use client'

import { useEffect, useState } from "react";
import Header from "./Navbar";
import Link from "next/link";
import Footer from "./Footer";
import { H1, H3, H4, H5 } from "./Tyograohy";

const News = ({news}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serverUrl = process.env.NEXT_PUBLIC_DJANGO_URLS;
  const frontend=process.env.NEXT_PUBLIC_DJANGO_URLS;

  const metadata = {
    title: news?.meta_name
      ? String(news.meta_name)
      : "Mak Security UK | Professional Security Solutions",
    description: news?.meta_description
      ? String(news?.meta_description)
      : "Mak Security UK provides reliable and tailored security newss, including manned guarding, CCTV surveillance, and more.",
    keywords: news?.meta_keywords
      ? String(news.meta_keywords)
      : "security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK",
    openGraph: {
      title:
        news?.meta_name ||
        "Mak Security UK | Professional Security Solutions",
      description:
        news?.meta_description || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
      url: `${frontend} || "mak-security-uk"}`,
      images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
    },
    twitter: {
      card: "summary_large_image",
      title:
        news?.meta_name ||
        "Mak Security UK | Professional Security Solutions",
      description:
        news?.meta_name || "Mak Security UK provides reliable and tailored security newss, including manned guarding, CCTV surveillance, and more.",
      url: `${frontend} || "mak-security-uk"}`,
      images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
    },
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${serverUrl}news-articles/`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
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

      {/* Banner Section */}
      <div className="relative bg-cover bg-center h-96" >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <H1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Latest News & Articles</H1>
        </div>
      </div>

      {/* News Articles Grid */}
      <div className="container mx-auto p-6">
        {loading && <p className="text-center text-lg text-gray-600">Loading news...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services?.map((service) => (
            <Link key={service.slug} href={`/news/${service.slug}`}>
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                {service.image && (
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                )}
                <div className="space-y-2">
                  <H5 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">{service.title}</H5>
                  <p className="text-gray-500 text-sm">{service.sutitle?.slice(0, 200)}...</p>
                  {/* Date display */}
                  <p className="text-gray-400 text-xs mt-2">{new Date(service.published_date).toLocaleDateString()}</p>
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
    </>
  );
};

export default News