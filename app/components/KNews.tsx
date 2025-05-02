"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface NewsCardProps {
  image: string;
  title: string;
  description: string;
  date?: string;
  isMain?: boolean;
}

const NewsCard = forwardRef<HTMLDivElement, NewsCardProps>(
  ({ image, title, description, date, isMain = false }, ref) => {
    return (
      <div className={`${isMain ? "w-full" : "w-[400px]"}`} ref={ref}>
        <div className={`${isMain ? "sticky top-32" : ""}`}>
          <div className={`relative ${isMain ? "h-[600px] mb-10" : "h-[280px] mb-6"} rounded-2xl overflow-hidden`}>
            <Image src={image} alt={title} fill className="object-cover" />
            {isMain && (
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.03)]" />
            )}
          </div>
          <div className={`flex flex-col ${isMain ? "gap-3.5" : "gap-2"}`}>
            <h3
              className={`${
                isMain
                  ? "text-[1.875rem] leading-[1.19] tracking-[-0.03em] font-bold"
                  : "text-[1.25rem] leading-normal tracking-[-0.6px] font-bold text-black"
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-ellipsis overflow-hidden whitespace-nowrap ${
                isMain ? "text-lg leading-[1.58] text-[#333333]" : "text-base leading-[1.48] text-[#666666]"
              }`}
            >
              {description}
            </p>
            {date && <p className="text-base leading-[1.32] text-[#666666] pt-3">{date}</p>}
          </div>
        </div>
      </div>
    );
  }
);

NewsCard.displayName = "NewsCard";

export default function KNews() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      image: "/images/k-news/news_1.png",
      title: "뉘앙스를 이해하는 AI, 고객 만족도 28% 향상",
      description: "텍스트 기반 AI의 자연어 이해 능력이 고객센터 응대 품질을",
    },
    {
      image: "/images/k-news/news_2.png",
      title: "AI는 어디까지 공감할 수 있을까? 윤리 기반 포럼 개최",
      description: "기술의 정교함을 넘어서, 사용자와의 공감과 책임을 논의하는",
    },
    {
      image: "/images/k-news/news_3.png",
      title: "AI, 목소리 속 감정까지 캐치하다",
      description: "대화형 AI가 단어를 넘어 말의 톤과 속도까지 분석하며",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    tl.from(titleRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
    }).from(
      contentRef.current.children,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.4"
    );

    cardRefs.current.forEach((child, index) => {
      tl.from(
        child,
        {
          opacity: 0,
          y: 100,
          duration: 0.4,
          delay: index * 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-[8.125rem] dark:bg-black transition-all duration-700">
      <div className="container mx-auto">
        <div ref={titleRef} className="flex items-center justify-between gap-4 mb-12">
          <h2 className="text-52 font-plus font-semibold leading-[1.12] tracking-[-0.01em]">Latest news</h2>
          <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 transition-colors">
            <Image src="/images/icons/arrow_right_black.svg" alt="arrow" width={28} height={28} />
          </button>
        </div>
        <div ref={contentRef} className="flex justify-between gap-[6.563rem]">
          <NewsCard
            isMain
            image="/images/k-news/news_main.gif"
            title="패턴을 넘어서 시선을 읽다 – 의료 영상 분석에 적용된 이미지 AI '하늬(Hanee)'"
            description="영상 속 미세한 변화까지 감지하는 이미지 인식 AI '하늬(Hanee)'가 실제 의료 현장 테스트를 마쳤습니다."
            date="Apr 1, 2025"
          />
          <div className="flex flex-col gap-[60px]">
            {cards.map((card, index) => (
              <NewsCard
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                image={card.image}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
