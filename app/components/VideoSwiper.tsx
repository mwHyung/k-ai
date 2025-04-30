"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const VideoSwiper = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleSlideChange = () => {
    if (!swiper) return;
    const activeIndex = swiper.realIndex;
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
  };

  useEffect(() => {
    if (swiper) {
      // Initialize first slide
      handleSlideChange();

      // Start autoplay
      swiper.autoplay.start();
    }
  }, [swiper]);

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
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
                preload="auto"
              >
                <source src={`/video/main_visual_${index + 1}.mp4`} type="video/mp4" />
              </video>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSwiper;
