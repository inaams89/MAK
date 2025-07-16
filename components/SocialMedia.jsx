'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function SocialMedia({ social = [] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-4">
      {social.length > 0 ? (
        social.map((link, index) => {
          const platformIcons = {
            Facebook: FaFacebookF,
            Twitter: FaTwitter,
            Instagram: FaInstagram,
            LinkedIn: FaLinkedinIn,
          };
          const IconComponent = platformIcons[link.platform] || FaFacebookF;
          return (
            <Link
              key={index}
              href={link.url || '#'}
              target="_blank"
              aria-label={link.platform || 'Social Media'}
              rel="noopener noreferrer"
              className={`social-icon p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-12 h-12 flex items-center justify-center ${
                link.platform === 'Facebook'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : link.platform === 'Twitter'
                  ? 'bg-blue-400 hover:bg-blue-500'
                  : link.platform === 'Instagram'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              <IconComponent className="text-white text-xl" />
            </Link>
          );
        })
      ) : (
        <p className="text-gray-500">No social media links available.</p>
      )}
    </div>
  );
}