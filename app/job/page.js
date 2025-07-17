'use client';
import { useEffect, useState } from 'react';
import { client, urlFor } from '@/sanity/client';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion'; // For animations
import { FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt, FaUsers, FaStar, FaQuestionCircle, FaBriefcase } from 'react-icons/fa'; // Added icons for visual appeal

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "jobVacancy"] | order(postedDate desc) {
          title,
          slug,
          location,
          postedDate,
          applicationDeadline,
          image,
          seo {
            metaName,
            metaDescription,
            keywords
          }
        }`
      )
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-t-[#ff0600] border-gray-300 rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Career Opportunities | MAK Security</title>
        <meta
          name="description"
          content="Discover rewarding career opportunities with MAK Security, a leading UK security firm. Join our team to protect communities with integrity and excellence."
        />
        <meta
          name="keywords"
          content="security jobs, MAK Security careers, UK security employment, security guard jobs, career opportunities, MAK Security, security services"
        />
        <meta name="author" content="MAK Security" />
        <meta property="og:title" content="Career Opportunities | MAK Security" />
        <meta
          property="og:description"
          content="Join MAK Security, a trusted UK security provider, and explore exciting career paths in security services."
        />
        <meta property="og:url" content="https://www.mak-security.co.uk/jobs" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.mak-security.co.uk/images/careers-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MAKSecurityUK" />
        <link rel="canonical" href="https://www.mak-security.co.uk/jobs" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Career Opportunities | MAK Security",
              "description": "Explore career opportunities with MAK Security, a leading UK security firm.",
              "url": "https://www.mak-security.co.uk/jobs",
              "publisher": {
                "@type": "Organization",
                "name": "MAK Security",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.mak-security.co.uk/images/logo.png"
                }
              }
            }
          `}
        </script>
      </Head>
      <Header />
      <main className="bg-gradient-to-br from-gray-50 to-gray-200">
        {/* Hero Section */}
    <section
  className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
  style={{
    backgroundImage: jobs[0]?.image
      ? `url(${urlFor(jobs[0].image).width(1200).height(500).url()})`
      : 'none',
  }}
>
  

          <div className="absolute inset-0 bg-[#060505] opacity-60"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
           
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 font-poppins tracking-tight">
              Build Your Career with MAK Security
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Join a leading UK security firm dedicated to protecting lives and businesses with integrity, innovation, and excellence.
            </p>
        
          </motion.div>
        </section>

        {/* Company Overview Section */}
        <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 font-poppins text-[#060505]">
              About MAK Security
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Founded in 2003, MAK Security is a premier UK security provider with a legacy of protecting communities and businesses across the nation. Our commitment to integrity, innovation, and excellence drives everything we do. Join our team to contribute to a safer world while growing your career in a supportive and dynamic environment.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <FaShieldAlt className="text-4xl text-[#ff0600] mb-4" />
                <h3 className="text-xl font-semibold text-[#060505]">Integrity</h3>
                <p className="text-gray-600">We operate with transparency and trust in all our actions.</p>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="text-4xl text-[#ff0600] mb-4" />
                <h3 className="text-xl font-semibold text-[#060505]">Collaboration</h3>
                <p className="text-gray-600">Our team thrives on unity and shared goals.</p>
              </div>
              <div className="flex flex-col items-center">
                <FaStar className="text-4xl text-[#ff0600] mb-4" />
                <h3 className="text-xl font-semibold text-[#060505]">Excellence</h3>
                <p className="text-gray-600">We deliver top-tier security solutions with precision.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Culture Spotlight Section */}
        <section className="bg-[#060505] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold font-poppins">Our Workplace Culture</h2>
              <p className="text-lg mt-4 max-w-3xl mx-auto">
                At MAK Security, we foster a culture of respect, growth, and empowerment. Our team members are our greatest asset, and we’re committed to creating an inclusive environment where everyone can thrive.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Diversity & Inclusion',
                  description: 'We celebrate diverse perspectives and ensure equal opportunities for all.',
                },
                {
                  title: 'Career Growth',
                  description: 'Access to mentorship and career advancement programs to fuel your success.',
                },
                {
                  title: 'Work-Life Balance',
                  description: 'Flexible schedules and wellness programs to support your well-being.',
                },
              ].map((culture, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white text-[#060505] p-6 rounded-2xl shadow-xl"
                >
                  <h3 className="text-xl font-semibold mb-2">{culture.title}</h3>
                  <p className="text-gray-600">{culture.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-poppins text-[#060505]">
              Why Choose MAK Security?
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              We offer a rewarding work environment with benefits designed to support your professional and personal growth.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Competitive Salaries',
                description: 'Industry-leading pay with performance-based incentives.',
                icon: <FaBriefcase className="text-4xl text-[#ff0600] mb-4" />,
              },
              {
                title: 'Comprehensive Training',
                description: 'Ongoing professional development to keep you at the forefront of security.',
                icon: <FaStar className="text-4xl text-[#ff0600] mb-4" />,
              },
              {
                title: 'Health & Wellness',
                description: 'Access to health benefits, mental health support, and wellness programs.',
                icon: <FaUsers className="text-4xl text-[#ff0600] mb-4" />,
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-xl text-center"
              >
                {benefit.icon}
                <h3 className="text-xl font-semibold mb-2 text-[#060505]">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Application Process Section */}
        <section className="bg-[#060505] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold font-poppins">How to Join Our Team</h2>
              <p className="text-lg mt-4 max-w-3xl mx-auto">
                Our application process is straightforward and designed to help you succeed.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  step: '1. Submit Application',
                  description: 'Apply online through our job portal with your CV and cover letter.',
                },
                {
                  step: '2. Interview Process',
                  description: 'Participate in interviews to discuss your skills and experience.',
                },
                {
                  step: '3. Training & Onboarding',
                  description: 'Join our team with comprehensive training to prepare you for success.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white text-[#060505] p-6 rounded-2xl shadow-xl text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Jobs List Section */}
        <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-poppins text-[#060505]">
              Current Job Openings
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              Browse our open positions and find the role that’s right for you.
            </p>
          </motion.div>
          {jobs.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-2xl text-[#060505] font-semibold font-poppins"
            >
              No job vacancies available at the moment. Check back soon or subscribe for updates!
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {jobs.map((job) => (
                <motion.div
                  key={job.slug.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/job/${job.slug.current}`}>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                      {job.image && (
                        <img
                          src={urlFor(job.image).width(400).height(200).url()}
                          alt={job.title || 'job'}
                          className="w-full h-56 object-cover rounded-t-2xl"
                          loading="lazy"
                        />
                      )}
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-3 text-[#060505] font-poppins tracking-tight">
                          {job.title}
                        </h2>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2 text-[#ff0600]" />
                          <p>{job.location}</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <FaCalendarAlt className="mr-2 text-[#ff0600]" />
                          <p>
                            Deadline:{' '}
                            {new Date(job.applicationDeadline).toLocaleDateString()}
                          </p>
                        </div>
                        <button className="w-full bg-[#ff0600] text-white py-3 px-6 rounded-lg hover:from-[#0086B3] hover:to-[#006A8C] transition-all duration-300 font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-poppins text-[#060505]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              Find answers to common questions about working at MAK Security.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                question: 'What qualifications do I need to work at MAK Security?',
                answer: 'Most roles require a valid SIA license and a passion for security. Specific requirements are listed in each job posting.',
              },
              {
                question: 'What is the training process like?',
                answer: 'We provide comprehensive training, including on-the-job learning and industry-specific certifications, to ensure you’re prepared.',
              },
              {
                question: 'Are there opportunities for career advancement?',
                answer: 'Yes! We offer clear career paths, mentorship, and opportunities to grow into leadership roles.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-start">
                  <FaQuestionCircle className="text-2xl text-[#ff0600] mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#060505] mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      
      </main>
      <Footer />
    </>
  );
}