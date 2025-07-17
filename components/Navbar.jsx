'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { client } from '@/sanity/client';
import { settingsQuery, serviceCategoriesQuery, serviceAreasQuery } from '@/sanity/queries'; // Adjust path to your queries
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const [serviceCategories, setServiceCategories] = useState([]);
  const [serviceAreas, setServiceAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for desktop service dropdown
  const [mobileServiceOpen, setMobileServiceOpen] = useState(null); // State for mobile service submenu
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, categoriesData, areasData] = await Promise.all([
          client.fetch(settingsQuery),
          client.fetch(serviceCategoriesQuery),
          client.fetch(serviceAreasQuery),
        ]);
        setSettings(settingsData || {});
        setServiceCategories(categoriesData || []);
        setServiceAreas(areasData || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <header className="shadow-lg sticky top-0 z-50 bg-white">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#060505] to-[#1a1a1a] text-white py-2 text-sm px-14">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8">
          {/* Contact Information */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt size={16} className="text-red-500" />
              <Link
                href={`tel:${settings.phone}`}
                aria-label={settings.phone || 'Phone number'}
                className="hover:underline hover:text-red-500 transition duration-300 font-medium"
              >
                {settings.phone || 'N/A'}
              </Link>
            </div>
            <span className="hidden md:inline text-white">|</span>
            <div className="flex items-center space-x-2">
              <FaEnvelope size={16} className="text-red-500" />
              <Link
                href={`mailto:${settings.email}`}
                aria-label={settings.email || 'Email address'}
                className="hover:underline hover:text-red-500 transition duration-300 font-medium"
              >
                {settings.email || 'N/A'}
              </Link>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {[
              { icon: <FaFacebookF size={16} />, href: settings.facedbook || '#', label: 'Facebook' },
              { icon: <FaTwitter size={16} />, href: settings.xurl || '#', label: 'Twitter' },
              { icon: <FaInstagram size={16} />, href: settings.instagram || '#', label: 'Instagram' },
              { icon: <FaLinkedinIn size={16} />, href: settings.linkedin || '#', label: 'LinkedIn' },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white hover:text-red-500 transition duration-300 hover:scale-110"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-14 py-4 flex items-center justify-between">
        {/* Logo and Menus */}
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-extrabold">
            <Link href="/" className="hover:opacity-80 transition duration-300">
              <Image
                width={200}
                height={40}
                aria-label="Mak Security"
                alt="Mak Security"
                src="https://usercontent.one/wp/www.mak-security.co.uk/wp-content/uploads/2019/06/Mak-Security-Logo-300x60.png?media=1718891222"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link
              href="/"
              className="text-gray-700 font-medium hover:text-red-500 transition duration-300 relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Service Dropdown */}
            {serviceCategories.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="text-gray-700 font-medium hover:text-red-500 transition duration-300 relative group flex items-center"
                  aria-haspopup="true"
                  onClick={() => router.push('/service')}

                  aria-expanded={dropdownOpen}
                >
                  Services
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-64 z-50">
                    {serviceCategories.map((category) => (
                      <div key={category._id} className="px-4 py-2">
                        <Link
                          href={`/service/${category.slug.current}`}
                          className="block text-gray-700 font-medium hover:text-red-500 transition duration-300"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {category.name}
                        </Link>
                        {category.subServices && category.subServices.length > 0 && (
                          <ul className="ml-4 mt-2 space-y-2">
                            {category.subServices.map((subService) => (
                              <li key={subService._id}>
                                <Link
                                  href={`/service/${category.slug.current}/${subService.slug.current}`}
                                  className="block text-gray-600 text-sm hover:text-red-500 transition duration-300"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {subService.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Areas Covered */}
            {serviceAreas.length > 0 && (
              <div className="relative">
                <Link
                  href="/areas-covered"
                  className="text-gray-700 font-medium hover:text-red-500 transition duration-300 relative group"
                >
                  Areas Covered
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            )}

            <Link
              href="/news"
              className="text-gray-700 font-medium hover:text-red-500 transition duration-300 relative group"
            >
              News
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/job"
              className="text-gray-700 font-medium hover:text-red-500 transition duration-300 relative group"
            >
              Career
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        {/* Contact Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/contact"
            className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl hover:bg-[#000]"
          >
            <span>Contact</span>
            <RiArrowRightUpLine size={18} className="animate-bounce-horizontal" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none hover:text-red-500 transition duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-r from-[#060505] to-[#1a1a1a] text-white py-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <ul className="space-y-3 text-center">
          <li>
            <Link
              href="/"
              className="text-white font-medium hover:text-red-500 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* Mobile Services Menu with Submenu */}
          {serviceCategories.length > 0 && (
            <li>
              <button
                className="text-white font-medium hover:text-red-500 transition duration-300 w-full text-center"
                onClick={() => setMobileServiceOpen(mobileServiceOpen === 'services' ? null : 'services')}
                aria-expanded={mobileServiceOpen === 'services'}
                aria-haspopup="true"
              >
                Services
              </button>
              {mobileServiceOpen === 'services' && (
                <ul className="mt-2 space-y-2 px-4">
                  {serviceCategories.map((category) => (
                    <li key={category._id}>
                      <Link
                        href={`/service/${category.slug.current}`}
                        className="block text-white font-medium hover:text-red-500 transition duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                      {category.subServices && category.subServices.length > 0 && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {category.subServices.map((subService) => (
                            <li key={subService._id}>
                              <Link
                                href={`/service/${category.slug.current}/${subService.slug.current}`}
                                className="block text-white text-sm hover:text-red-500 transition duration-300"
                                onClick={() => setIsOpen(false)}
                              >
                                {subService.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}

          {/* Mobile Areas Covered */}
          {serviceAreas.length > 0 && (
            <li>
              <Link
                href="/areas-covered"
                className="text-white font-medium hover:text-red-500 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Areas Covered
              </Link>
            </li>
          )}

          <li>
            <Link
              href="/news"
              className="text-white font-medium hover:text-red-500 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-white font-medium hover:text-red-500 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}