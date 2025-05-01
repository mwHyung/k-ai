import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { type Swiper as SwiperType } from "swiper";

const slides = [
  {
    id: 1,
    image: "/images/sub/sub_slide01.png",
    title: "금융 언어를 이해하는 온누리, 상담을 자연스럽게 자동화하다",
    description:
      "대출, 보험, 투자 상품 등 금융 전문 용어를 쉽게 풀어내고,\n자연스러운 상담 흐름을 만들어 고객 경험을 개선합니다.",
  },
  {
    id: 2,
    image: "/images/sub/sub_slide02.png",
    title: "학습 흐름을 이해하는 온누리, 맞춤형 교육 자료를 완성하다",
    description: "교재, 학습 요약문, 시험 문제 등을\n학습자 수준에 맞게 자연스럽고 매끄럽게 생성합니다.",
  },
  {
    id: 3,
    image: "/images/sub/sub_slide03.png",
    title: "기업 지식의 흐름을 꿰뚫는 온누리, 정보를 빠르게 연결하다",
    description: "사내 규정, 매뉴얼, 정책 문서를 자연어로 요약하고,\n지식 흐름을 빠르게 연결해 정보 활용을 높입니다.",
  },
  {
    id: 4,
    image: "/images/sub/sub_slide04.png",
    title: "정서와 상황을 읽어내는 온누리, 사람 같은 대화를 만들어가다",
    description: "화자 간 관계와 감정 뉘앙스를 이해해\n더 자연스럽고 공감력 있는 대화를 지원합니다.",
  },
];

const UseCaseSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <div className="w-full relative">
      <Swiper
        effect={"creative"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2.5}
        initialSlide={0}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-125%", "20%", -400],
            rotate: [0, 0, -5],
          },
          next: {
            shadow: true,
            translate: ["125%", "20%", -400],
            rotate: [0, 0, 5],
          },
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".swiper-pagination",
          type: "fraction",
          formatFractionCurrent: (number) => (number < 10 ? `${number}` : number),
          formatFractionTotal: (number) => (number < 10 ? `${number}` : number),
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass} text-base text-white mr-[3.438rem] inline-block"></span>
                      <span class="${totalClass} text-base text-white inline-block"></span>`;
          },
        }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="usecase-swiper"
        onActiveIndexChange={handleSlideChange}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative rounded-2xl overflow-hidden transition-all duration-300 mb-10">
              <Image
                src={slide.image}
                alt={slide.title}
                width={862}
                height={484}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`flex flex-col items-center justify-center gap-2.5 transition-all duration-500 ${
                currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <h3 className="text-white/80 text-24 font-medium leading-[1.7] text-center">{slide.title}</h3>
              <p
                className="text-white/80 text-lg font-medium leading-[1.7] opacity-80 text-center"
                style={{ whiteSpace: "pre-line" }}
              >
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative w-full flex items-center justify-center mt-10">
        <div className="swiper-pagination relative" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-[#F82929]">
          <div ref={progressBarRef} className="h-full bg-[#262626] origin-right" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
};

export default UseCaseSlider;
