

'use client'
import Navbar from "../components/Navbar";
import Hero from "./Hero";
import { useEffect, useState } from "react";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import AboutUs from "./Aoutus";
import Features from "./Features";
import Header from "./Navbar";
import SocialMediaTestimonialsPage from "./Social";
import AccreditationPage from "./Accreditation";
import DirectorsMessage from "./Adirector";
import WhyChooseMakSecurity from "./why";
import SocialMedia from "./SocialMedia";
const Homes=  ({ homeDetail }) => {
    const [services, setServices] = useState(homeDetail?.services);

    const frontend = process.env.NEXT_PUBLIC_FRONT_URL;
    const [aboutUsData, setAboutUsData] = useState(homeDetail?.aboutUs?homeDetail?.aboutUs[0]:[]);
    
    const [newsData, setnewsData] = useState(homeDetail?.news)
  useEffect(() => {
    homeDetail 
    }),[]
    // SEO Metadata handling based on initialservice
    const metadata = {
      title: homeDetail.homeDetail[0]?.meta_name
        ? String(homeDetail?.homeDetail[0].meta_name)
        : "Mak Security UK | Professional Security Solutions",
      description: homeDetail.homeDetail?.meta_description
        ? String(homeDetail.homeDetail[0]?.meta_description)
        : "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
      keywords: homeDetail.homeDetail[0]?.meta_keywords
        ? String(homeDetail.homeDetail[0]?.meta_keywords)
        : "security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK",
      openGraph: {
        title:
        homeDetail.homeDetail[0]?.meta_name ||
          "Mak Security UK | Professional Security Solutions",
        description:
        homeDetail.homeDetail[0]?.meta_description || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
        url: `${frontend} || "mak-security-uk"}`,
        images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
      },
      twitter: {
        card: "summary_large_image",
        title:
        homeDetail.homeDetail[0]?.meta_name ||
          "Mak Security UK | Professional Security Solutions",
        description:
        homeDetail.homeDetail[0]?.meta_name || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
        url: `${frontend} || "mak-security-uk"}`,
        images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
      },
    };
    return (
      <> <title>{metadata.title}</title>

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
    <div className="w-full">
     

      <Header />
      <Hero slider={homeDetail?.sliders} />
      <Services services={services}  />
      <AboutUs aboutUs={aboutUsData} />
      <WhyChooseMakSecurity whyus={homeDetail?.whyus}  />
      <Features approch={homeDetail?.approch} />
      <SocialMediaTestimonialsPage/>
      
      <DirectorsMessage adata={homeDetail?.homeDetail} />
      <AccreditationPage accredation={homeDetail?.accreditation} />
      <div className=" bg-gray-100 flex flex-col items-center justify-center">
      <SocialMedia socialata={homeDetail?.homeDetail[0]} />
    </div>
      <Testimonials test={homeDetail?.testimonials} />
      <Footer />
    </div>
    </>
  );
}

export default Homes;