'use client';

import { useState } from 'react';
import Head from 'next/head';
import Header from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Testimonials from './Testimonials';
import Footer from './Footer';
import AboutUs from './Aoutus';
import Features from './Features';
import SocialMediaTestimonialsPage from './Social';
import AccreditationPage from './Accreditation';
import DirectorsMessage from './Adirector';
import WhyChooseMakSecurity from './Why';
import SocialMedia from './SocialMedia'


export default function Homes({ homeDetail }) {
  const defaultImage = homeDetail?.homeDetail?.seo?.image?.asset?.url || '/images/mak-security-logo.png';
  const metadata = {
    title: homeDetail?.homeDetail?.seo?.metaName || 'Mak Security UK | Professional Security Solutions',
    description: homeDetail?.homeDetail?.seo?.metaDescription || 'Mak Security UK provides reliable and tailored security services.',
    keywords: homeDetail?.homeDetail?.seo?.keywords?.join(', ') || 'security services, manned guarding, CCTV surveillance, Mak Security UK',
    openGraph: {
      title: homeDetail?.homeDetail?.seo?.metaName || 'Mak Security UK',
      description: homeDetail?.homeDetail?.seo?.metaDescription || 'Mak Security UK provides reliable security services.',
      url: process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://mak-security-uk',
      images: [defaultImage].filter(Boolean),
    },
    twitter: {
      card: 'summary_large_image',
      title: homeDetail?.homeDetail?.seo?.metaName || 'Mak Security UK',
      description: homeDetail?.homeDetail?.seo?.metaDescription || 'Mak Security UK provides reliable security services.',
      url: process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://mak-security-uk',
      images: [defaultImage].filter(Boolean),
    },
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {metadata.openGraph.images.length > 0 && (
          <meta property="og:image" content={metadata.openGraph.images[0]} />
        )}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        {metadata.twitter.images.length > 0 && (
          <meta name="twitter:image" content={metadata.twitter.images[0]} />
        )}
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:card" content={metadata.twitter.card} />
      </Head>
      <div className="w-full">
        <Header />
        <Hero slider={homeDetail?.sliders || []} />
        <Services services={homeDetail?.services || []} />
        <AboutUs aboutUs={homeDetail?.aboutUs || {}} />
        <WhyChooseMakSecurity whyus={homeDetail?.whyus || {}} />
        <Features approch={homeDetail?.approch || []} />
        <SocialMediaTestimonialsPage test={homeDetail?.testimonials || []} />
        <DirectorsMessage adata={homeDetail?.homeDetail || {}} />
        <AccreditationPage accreditation={homeDetail?.accreditation || []} />
        <div className="bg-gray-100 flex flex-col items-center justify-center">
          <SocialMedia social={homeDetail?.social || []} />
        </div>
        <Testimonials test={homeDetail?.testimonials || []} />
        <Footer homeDetail={homeDetail} />
      </div>
    </>
  );
}