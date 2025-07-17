'use client';
import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import Header from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { client } from '@/sanity/client';
import { z } from 'zod';

// Form validation schema using zod
const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  coverLetter: z.string().optional(),
  cv: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine((file) => file.type === 'application/pdf', 'File must be a PDF'),
});

// Portable Text components for custom rendering
const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.url || (value.asset?._ref ? value.asset.url : '')} // Use precomputed URL or fallback
        alt={value.alt || 'Job image'}
        className="my-8 rounded-2xl w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
      />
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition-colors"
        aria-label={`Link to ${value.href}`}
      >
        {children}
      </a>
    ),
  },
  block: {
    h3: ({ children }) => (
      <h3 className="text-3xl font-bold text-gray-900 mt-8 mb-4 font-poppins">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4 text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic2014 text-gray-700 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-gray-600">{children}</ul>
    ),
  },
};

export default function JobVacancyClient({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null,
  });
  const [formStatus, setFormStatus] = useState({ success: null, message: '' });
  const [formErrors, setFormErrors] = useState({});
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const animationVariants = shouldReduceMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, cv: file }));
    setFormErrors((prev) => ({ ...prev, cv: null }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ success: null, message: '' });
    setFormErrors({});
    // setIsSubmitting(true);

    // Validate form data
    try {
      formSchema.parse({ ...formData, cv: formData.cv });
    } catch (error) {
      const errors = error.flatten().fieldErrors;
      setFormErrors(errors);
      setFormStatus({ success: false, message: 'Please fix the errors in the form.' });
      setIsSubmitting(false);
      return;
    }

    try {
      let cvAssetId = null;
      if (formData.cv) {
        // Convert file to base64 for API route
        const reader = new FileReader();
        const filePromise = new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result.split(',')[1]); // Get base64 string without data URL prefix
          reader.onerror = reject;
          reader.readAsDataURL(formData.cv);
        });
        const fileBase64 = await filePromise;

        // Send file to API route
        const uploadResponse = await fetch('/api/upload-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: fileBase64, filename: formData.cv.name }),
        });

        if (!uploadResponse.ok) {
          throw new Error((await uploadResponse.json()).error || 'Failed to upload CV');
        }

        const { assetId } = await uploadResponse.json();
        cvAssetId = assetId;
      }

      // Submit application to Sanity
      const application = {
        _type: 'appliedJob',
        jobVacancy: { _type: 'reference', _ref: job._id },
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        cv: cvAssetId ? { _type: 'file', asset: { _type: 'reference', _ref: cvAssetId } } : null,
        applicationDate: new Date().toISOString(),
        status: 'pending',
      };

      await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      });

      setFormStatus({ success: true, message: 'Application submitted successfully!' });
      setFormData({ fullName: '', email: '', phone: '', coverLetter: '', cv: null });
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setFormStatus({
        success: false,
        message: error.message.includes('network')
          ? 'Network error. Please check your connection.'
          : error.message || 'Failed to submit application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-[400px] md:h-[600px] flex items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: job.imageUrl
              ? `url(${job.imageUrl})`
              : 'linear-gradient(135deg, #1e3a8a, #60a5fa)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <motion.div
            variants={animationVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-xl font-poppins">
              {job.title}
            </h1>
            <p className="text-lg md:text-2xl font-medium text-gray-100 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0.002L6.343 16.657A8 8 0 1117.657 16.657z"
                />
              </svg>
              <span>{job.location}</span>
            </p>
          </motion.div>
        </section>

        {/* Job Details Section */}
        <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content in Card */}
            <motion.div
              variants={animationVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-poppins">
                Job Description
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <PortableText value={job.description} components={portableTextComponents} />
              </div>
            </motion.div>

            {/* Sidebar in Card */}
            <motion.div
              variants={animationVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl sticky top-28">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-poppins">
                  Job Details
                </h3>
                <div className="space-y-5">
                  <p className="flex items-center text-gray-600 text-lg">
                    <svg
                      className="w-6 h-6 mr-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0.002L6.343 16.657A8 8 0 1117.657 16.657z"
                      />
                    </svg>
                    <span>
                      <span className="font-medium">Location:</span> {job.location}
                    </span>
                  </p>
                  <p className="flex items-center text-gray-600 text-lg">
                    <svg
                      className="w-6 h-6 mr-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      <span className="font-medium">Posted:</span>{' '}
                      {new Date(job.postedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </p>
                  <p className="flex items-center text-gray-600 text-lg">
                    <svg
                      className="w-6 h-6 mr-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      <span className="font-medium">Deadline:</span>{' '}
                      {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                  onClick={() => setIsModalOpen(true)}
 className="w-full bg-[#ff0600] text-white py-3 px-6 rounded-lg hover:from-[#0086B3] hover:to-[#006A8C] transition-all duration-300 font-semibold"                  aria-label={`Apply for ${job.title}`}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modal for Application Form */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setIsModalOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.div
                variants={shouldReduceMotion ? { initial: { scale: 1, opacity: 1 }, animate: { scale: 1, opacity: 1 } } : { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-6 max-w-2xl w-full mx-2 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 id="modal-title" className="text-xl font-bold text-gray-900 mb-6 font-poppins">
                  Apply for {job.title}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-2" noValidate>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 font-poppins">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 w-full p-2 border ${formErrors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all`}
                      aria-invalid={!!formErrors.fullName}
                      aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                    />
                    {formErrors.fullName && (
                      <p id="fullName-error" className="text-red-600 text-sm mt-1">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-poppins">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 w-full p-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-red-600 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 font-poppins">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="cv" className="block text-sm font-medium text-gray-700 font-poppins">
                      Upload CV (PDF, max 5MB) *
                    </label>
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      className={`mt-1 w-full p-3 border ${formErrors.cv ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all`}
                      aria-invalid={!!formErrors.cv}
                      aria-describedby={formErrors.cv ? 'cv-error' : undefined}
                    />
                    {formErrors.cv && (
                      <p id="cv-error" className="text-red-600 text-sm mt-1">
                        {formErrors.cv}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 font-poppins">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={5}
                      className="mt-1 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                  {formStatus.message && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm font-medium font-poppins ${
                        formStatus.success ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formStatus.message}
                    </motion.p>
                  )}
                  <motion.button
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                    type="submit"
 className="w-full bg-[#ff0600] text-white py-3 px-6 rounded-lg hover:from-[#0086B3] hover:to-[#006A8C] transition-all duration-300 font-semibold"                    aria-label="Submit application"
                  >
                    Submit Application
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

 
      </div>
      <Footer />
    </>
  );
}