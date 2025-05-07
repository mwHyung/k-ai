"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const VideoSwiper = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [slideIndex, setSlideIndex] = useState(0); // Add state for slide index

  const handleSlideChange = useCallback(() => {
    if (!swiper) return;
    const activeIndex = swiper.realIndex;
    setSlideIndex(activeIndex); // Update slide index to trigger animation reset
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.currentTime = 0;
          video.play().catch((error) => {
            console.log("Auto-play was prevented:", error);
          });
        } else {
          video.pause();
        }
      }
    });
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      // Initialize first slide
      handleSlideChange();

      // Start autoplay
      swiper.autoplay.start();
    }
  }, [swiper, handleSlideChange]);

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
        }}
        speed={1000}
        loop={true}
        className="w-full h-full"
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        pagination={{
          el: ".swiper-main-pagination",
          type: "fraction",
          formatFractionCurrent: (number) => (number < 10 ? `${number}` : number),
          formatFractionTotal: (number) => (number < 10 ? `${number}` : number),
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass} text-white mr-[3.438rem] inline-block"></span>
                    <span class="${totalClass} text-white inline-block"></span>`;
          },
        }}
        onAutoplayTimeLeft={(sCwiper, time, progress) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }
        }}
      >
        {[1, 2].map((_, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="w-full h-full">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="w-full h-full object-cover"
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
              >
                <source src={`/video/main_visual_${index + 1}.mp4`} type="video/mp4" />
              </video>
              {index === 0 ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 flex flex-col items-center">
                  <motion.p
                    key={`${slideIndex}-0-1`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transitionEnd: { color: "black" },
                    }}
                    transition={{ duration: 4.5, ease: "easeOut" }}
                    className="text-white text-xl font-semibold leading-[1.6] tracking-[-0.5px] transition-colors duration-1000"
                  >
                    &apos;K&apos;를 움직이는 진짜 AI, 지금 KT가 시작합니다
                  </motion.p>
                  <motion.p
                    key={`${slideIndex}-0-2`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transitionEnd: { color: "black" },
                    }}
                    transition={{ delay: 1, duration: 3.5, ease: "easeOut" }}
                    className="text-white text-82 font-semibold leading-[1.18] tracking-[-2px] text-center transition-colors duration-1000 font-plus whitespace-nowrap"
                  >
                    The True AI That Drives &apos;K&apos;
                  </motion.p>
                  <motion.p
                    key={`${slideIndex}-0-3`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transitionEnd: { color: "black" },
                    }}
                    transition={{ delay: 2, duration: 2.5, ease: "easeOut" }}
                    className="text-white text-82 font-semibold leading-[1.18] tracking-[-2px] text-center transition-colors duration-1000 font-plus whitespace-nowrap"
                  >
                    KT Is Leading The Way
                  </motion.p>
                </div>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 flex flex-col items-center">
                  <motion.p
                    key={`${slideIndex}-1-1`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    className="text-white text-xl font-semibold leading-[1.6] tracking-[-0.5px] transition-colors duration-1000"
                  >
                    한국어와 문화의 깊이를 이해하는 AI, 온누리로 더 나은 미래를 열어갑니다
                  </motion.p>
                  <motion.p
                    key={`${slideIndex}-1-2`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{ delay: 1, duration: 2, ease: "easeOut" }}
                    className="text-white text-82 font-semibold leading-[1.18] tracking-[-2px] text-center transition-colors duration-1000 font-plus whitespace-nowrap"
                  >
                    True AI Tailored For Korea,
                  </motion.p>
                  <motion.p
                    key={`${slideIndex}-1-3`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{ delay: 2, duration: 2, ease: "easeOut" }}
                    className="text-white text-82 font-semibold leading-[1.18] tracking-[-2px] text-center transition-colors duration-1000 font-plus whitespace-nowrap"
                  >
                    Powered By Onnuri
                  </motion.p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-50 flex items-center justify-start w-fit z-20">
        <div className="swiper-main-pagination" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-[#F82929]">
          <div ref={progressBarRef} className="h-full bg-[#262626] origin-right" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
};

export default VideoSwiper;
