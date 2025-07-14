import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialMedia = ({ socialata }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-4">
      {/* Facebook Icon */}
      <Link
        href={`${socialata?.facedbook || "#"}`}
        target="_blank"
        aria-label={socialata?.facedbook || "#"}
        rel="noopener noreferrer"
        className="social-icon bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-12 h-12 flex items-center justify-center"
      >
        <FaFacebookF className="text-white text-xl" />
      </Link>

      {/* Twitter Icon */}
      <Link
        href={`${socialata?.xurl || "#"}`}
        target="_blank"
        aria-label={socialata?.xurl || "#"}
        rel="noopener noreferrer"
        className="social-icon bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-12 h-12 flex items-center justify-center"
      >
        <FaTwitter className="text-white text-xl" />
      </Link>

      {/* Instagram Icon */}
      <Link
        href={`${socialata?.instagram || "#"}`}
        target="_blank"
        aria-label={socialata?.instagram || "#"}
        rel="noopener noreferrer"
        className="social-icon bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-12 h-12 flex items-center justify-center"
      >
        <FaInstagram className="text-white text-xl" />
      </Link>

      {/* LinkedIn Icon */}
      <Link
        href={`${socialata?.linkedin || "#"}`}
        target="_blank"
        aria-label={socialata?.linkedin || "#"}
        rel="noopener noreferrer"
        className="social-icon bg-blue-700 p-3 rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-12 h-12 flex items-center justify-center"
      >
        <FaLinkedinIn className="text-white text-xl" />
      </Link>
    </div>
  );
};
export default SocialMedia;