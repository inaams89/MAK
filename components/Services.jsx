import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import Image from "next/image";

const Services = ({ services }) => {
  return (
    <section className="bg-gray-200 py-20">
      {/* Hero Section */}
      <section className="bg-gray-200 rounded-lg relative overflow-hidden">
  <div className="absolute inset-0  "></div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Left Side: Our Services */}
      <div className="text-4xl md:text-5xl font-bold text-black text-center md:text-left">
        Our <span className="text-red-500">Services</span>
      </div>

      {/* Right Side: Description and See More Button */}
      <div className="text-left max-w-2xl">
        <p className="text-black text-md md:text-md opacity-90 leading-normal">
          We supply and manage trained SIA licensed Security Officers who
          specialize in Manned Security Guarding, Event Security, and Mobile
          Patrolling. Rest assured, your property is in safe hands.
        </p>
        {/* See More Button */}
        <div className="mt-4 flex justify-center md:justify-start">
          <Link href="/services" legacyBehavior>
            <a className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-300">
              <span className="text-red-500 font-semibold">See More</span>
              <IoArrowForwardOutline size={16} className="animate-bounce-horizontal text-red-500" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-14 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {services?.map((service, index) => (
      <div
        key={index}
        className="group flex flex-col bg-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer overflow-hidden relative"
      >
        {/* Service Image with Hover Zoom Effect */}
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[250px] overflow-hidden">
          <Image
            src={service?.image}
            alt={service?.name || "Service"}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          {/* Gradient Overlay */}
          <div className="group-hover:rotate-x-2 group-hover:rotate-y-2 transition-transform duration-500 ease-in-out"></div>   
              </div>

        {/* Service Details at Bottom with Red Gradient Background */}
        <div className="absolute bottom-0 left-0 group-hover:text-white right-0 bg-gradient-to-r from-red-600 to-red-800 bg-opacity-90 p-4 sm:p-6 mx-4 sm:mx-8 mb-4 sm:mb-6 rounded-2xl text-center transform transition-all duration-500 ease-in-out group-hover:scale-105">
          <p className="text-sm text-white font-semibold uppercase mb-2 group-hover:text-white">
            {/* {service.category} */}
          </p>
          <h3 className="text-sm font-semibold text-white mb-4 group-hover:text-white"> 
          {service.name}
          </h3>

          {/* Read More Button with Animated Arrow */}
          <div className="flex justify-center">
            <Link href={`/service/${service.slug}`} legacyBehavior>
            <a className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300 animate-pulse">                <span>Read More</span>
                <IoArrowForwardOutline
                  size={16}
                  className="animate-bounce-horizontal flex justify-center mt-[2px]"
                />
              </a>
            </Link>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        {/* <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 blur opacity-50"></div>
        </div> */}

        {/* Floating Animation */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 opacity-10 group-hover:opacity-20 transition-opacity duration-500 animate-float"></div>
        </div>
      </div>
    ))}
    </div>
  </div>
    </section>
  );
};

export default Services;