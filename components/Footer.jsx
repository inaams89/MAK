'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaHome, FaHouseUser, FaArrowUp, FaCity } from 'react-icons/fa';
import { H5, H6 } from './Tyograohy'; // Adjust path to your Typography components
import { client } from '@/sanity/client';
import { settingsQuery, footerLinksQuery, footerContentQuery, newsQuery} from '@/sanity/queries'; // Adjust path to your queries

export default function Footer() {
  const [settings, setSettings] = useState({});
  const [footerLinks, setFooterLinks] = useState([]);
  const [footerContent, setFooterContent] = useState({});
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, linksData, contentData, newsData] = await Promise.all([
          client.fetch(settingsQuery),
          client.fetch(footerLinksQuery),
          client.fetch(footerContentQuery),
          client.fetch(newsQuery),
        ]);
        setSettings(settingsData || {});
        setFooterLinks(linksData || []);
        setFooterContent(contentData || {});
        setNews(newsData || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("settings",settings);

  if (loading) return <div className="text-center py-4 text-white">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <footer className="bg-[#060505] py-2 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Get In Touch */}
          <div>
            <H5 className="text-xl font-semibold mb-4">Get In Touch </H5>
            <div>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaHome className="w-4 h-4 text-red-500" />
                  <span>{settings.addresstitle }</span>
                </strong>
              </p>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaHouseUser className="w-4 h-4 text-red-500" />
                  <span>{settings.house || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaArrowUp className="w-4 h-4 text-red-500" />
                  <span>{settings.street || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <strong className="flex items-center space-x-2">
                  <FaCity className="w-4 h-4 text-red-500" />
                  <span>{settings.city || 'N/A'}</span>
                </strong>
              </p>
              <p className="mb-2">
                <Link href={`tel:${settings.phone || '#'}`} aria-label={settings.phone || 'Phone'}>
                  <strong className="flex items-center space-x-2">
                    <FaPhone className="w-4 h-4 text-red-500" />
                    <span>{settings.phone || 'N/A'}</span>
                  </strong>
                </Link>
              </p>
              <p className="mb-2">
                <Link href={`mailto:${settings.email || '#'}`} aria-label={settings.email || 'Email'}>
                  <strong className="flex items-center space-x-2">
                    <FaEnvelope className="w-4 h-4 text-red-500" />
                    <span>{settings.email || 'N/A'}</span>
                  </strong>
                </Link>
              </p>
            </div>
            <div className="mt-4 flex space-x-4">
              <div className="flex justify-center gap-6 my-8 w-60 h-10">
                {[
                  { icon: <FaFacebookF className="text-white text-2xl" />, href: settings.facedbook || '#', label: 'Facebook', bg: 'bg-blue-600 hover:bg-blue-700' },
                  { icon: <FaTwitter className="text-white text-2xl" />, href: settings.xurl || '#', label: 'Twitter', bg: 'bg-blue-400 hover:bg-blue-500' },
                  { icon: <FaInstagram className="text-white text-2xl" />, href: settings.instagram || '#', label: 'Instagram', bg: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' },
                  { icon: <FaLinkedinIn className="text-white text-2xl" />, href: settings.linkedin || '#', label: 'LinkedIn', bg: 'bg-blue-700 hover:bg-blue-800' },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`social-icon p-2 rounded-[20%] transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.bg}`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div>
            <H5 className="text-xl font-semibold mb-4">Top Pages</H5>
            <ul>
              {footerLinks.length > 0 ? (
                footerLinks.map((link) => (
                  <li key={link._id}>
                    <Link href={link.url} className="text-white hover:text-red-500 transition duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No links available</li>
              )}
            </ul>
          </div>

          {/* News/Updates */}
          <div>
            <H5 className="text-xl font-semibold mb-4">News/Updates</H5>
            <ul>
            
               { news.map((item) => (
                  <li key={item._id} className="mb-4">
                    <Link href={`/news/${item.slug.current}`} className="text-white hover:text-red-500 transition duration-300">
                      <strong>{item.title}</strong>
                      <br />
                      <span className="text-sm text-gray-300">
                        {new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </Link>
                  </li>
                ))}
             
            </ul>
            <div className="mt-4 text-center">
              <H6 className="text-xl text-center font-semibold mb-4">{footerContent.title || 'Join Our Newsletter'}</H6>
              <form>
                <input
                  type="email"
                  className="px-4 py-2 rounded-l-lg border-2 border-white bg-gray-800 text-white focus:outline-none"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-500 ml-0.2 text-white font-bold rounded-r-lg hover:bg-opacity-60 hover:bg-white transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-300">
          <p>{settings.copyrights || `© ${new Date().getFullYear()} Mak Security`}</p>
        </div>
      </div>
    </footer>
  );
}