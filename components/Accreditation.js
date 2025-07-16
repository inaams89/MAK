'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AccradationCard from './Acccard';
import { H4 } from './Tyograohy';

export default function AccreditationPage({ accreditation = [] }) {
  return (
    <div className="relative bg-gradient-to-b from-white to-[#FFEFEF] py-10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-red-500">Accreditations</span>
        </h2>
      </div>
      <div className="w-full px-4 mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {accreditation.length > 0 ? (
            accreditation.map((item, index) => (
              <SwiperSlide key={index}>
                <AccradationCard
                  accreditation={{
                    name: item.name || 'Unknown',
                    description: item.description || 'No description available.',
                    logo: item.logo?.asset?.url || '/default-placeholder.jpg',
                    obtainedDate: item.obtainedDate || 'N/A',
                  }}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p className="text-center text-gray-500">No accreditations available.</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}