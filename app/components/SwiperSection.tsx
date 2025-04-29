"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperSection = () => {
  return (
    <section className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="h-[500px]"
        >
          {[1, 2, 3].map((index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">Slide {index}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperSection;
