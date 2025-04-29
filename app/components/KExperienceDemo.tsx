"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import KAITitle from "./kAITitle";

gsap.registerPlugin(ScrollTrigger);

interface ChatBubbleProps {
  text: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
  return (
    <div className="flex shrink-0 px-8 py-[1.375rem] bg-[#8B8B8B]/60 backdrop-blur-[12px] rounded-lg">
      <p className="text-base font-medium leading-[1.86] tracking-[-0.01em] text-white whitespace-pre-line">{text}</p>
    </div>
  );
};

export default function KExperienceDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
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
        stagger: 0.1,
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const chatBubbles = [
    "대학 입시를 위한 어휘 공부를 도와줘",
    "우리 동네 편의시설 알려줘",
    "간편 김장법",
    "생선성 향상을 위한 아침 루틴 만들기",
    "왜 아침형 인간이어야 되?",
    "휴식 알림 1시간 마다 해줘",
    "사업설명서 작성하는 방법",
    "이메일 보고서 Python 스크립트 작성",
    "세금계산서 작성하는 방법",
    "경복궁을 외국인에게 소개해줘",
    "글쓰기 브레인스토밍 같이해",
    "프로그래밍 설계하는 방법",
    "오늘 날씨 어때?",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative max-h-[60.188rem] bg-black pt-[8.125rem] pb-[3.25rem] overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          src="/video/k_inspiration_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[calc(100vh-33.5rem)] object-cover object-bottom bottom-0 absolute"
        />
      </div>
      <div className="absolute left-0 top-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent z-10 w-[29.5rem] h-full" />
      <div className="absolute right-0 top-0 bg-gradient-to-l from-black/100 via-black/60 to-transparent z-10 w-[29.5rem] h-full" />

      <div className="container mx-auto px-4 relative">
        <div ref={titleRef} className="text-center mb-[7.5rem]">
          <KAITitle title="K" subtitle="Experience" direction="center" className="mb-10" color="white" />
          <h2 className="text-[4.5rem] font-semibold leading-[1.12] tracking-[-0.01em] font-plus text-white mb-8">
            Spark inspiration. Unlock ideas.
            <br />
            Make it happen.
          </h2>
          <p className="text-lg leading-[1.86] tracking-[-0.01em] text-white">
            영감을 얻고, 아이디어를 떠올리며, 원하는 결과를 만들어보세요
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <div ref={contentRef} className="flex gap-3.5">
            {chatBubbles.slice(0, 6).map((text, index) => (
              <ChatBubble key={index} text={text} />
            ))}
          </div>
          <div ref={contentRef} className="flex gap-3.5 mb-[8.688rem]">
            {chatBubbles.slice(6, 13).map((text, index) => (
              <ChatBubble key={index} text={text} />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 pl-10 pr-8 py-6 border border-[#AAAAAA] rounded-full text-white hover:bg-white/10 transition-colors">
            <span className="text-lg font-semibold leading-[1.3] tracking-[-0.01em]">K-AI 체험하러 가기</span>
            <Image src="/images/icons/arrow_right_white.svg" alt="arrow-right" width={20} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
