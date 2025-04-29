"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KAITitle from "./kAITitle";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  title: string;
  value: string;
  increase: string;
}

const StatCard = ({ title, value, increase }: StatCardProps) => {
  return (
    <div className="flex items-end justify-between gap-2 border-b border-black pb-0.5 px-2">
      <div className="flex items-center gap-4 pb-1.5">
        <p className="text-base leading-[1.32] text-[#333333] whitespace-pre-line">{title}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className="text-base font-medium leading-[1.02] tracking-[-0.01em] font-plus text-[#B8B8B8] mb-2">
          {increase}
        </span>
        <span className="text-[4.5rem] font-semibold leading-[1.02] tracking-[-0.02em] font-plus text-black">
          {value}
        </span>
      </div>
    </div>
  );
};

export default function KAILab() {
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
        stagger: 0.2,
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white pt-40 pb-[9.563rem]">
      <div className="container max-w-[1700px] mx-auto">
        <div ref={titleRef}>
          <KAITitle title="K" subtitle="AI Lab" direction="left" className="mb-[5.5rem]" />
          <h2 className="text-[4.5rem] font-semibold leading-[1.12] tracking-[-0.01em] font-plus">
            AI That Understands
            <br />
            Korean <em className="inline-block w-16 h-[7px] bg-[#F82929] mb-4 mr-1" />
            Culture
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-3 space-y-6">
            <h3 className="text-[48px] font-semibold leading-[1.36] tracking-[-0.01em]">
              글로벌 대비
              <br />
              7,200배 더 많은
              <br />
              한국어 학습량으로
            </h3>
            <p className="text-base font-medium leading-[1.86] tracking-[-0.01em] text-[#666666]">
              한국의 역사와 정서, 사회적 맥락은 물론, 일상 속에서 쓰이는 언어의
              <br />
              미묘한 표현까지 깊이 있게 학습한 한국형 AI입니다.
              <br />
              단어 하나에 담긴 의미의 결, 말투의 높낮이, 존댓말의 층위처럼 섬세한
              <br />
              언어 요소를 놓치지 않고 이해하며, 단순한 정보 전달을 넘어 사용자의
              <br />
              의도와 진심에 공감할 수 있는 응답을 만들어냅니다.
            </p>
          </div>

          <div className="col-span-6 relative w-full h-[45.875rem]">
            <video src="/video/lab_video.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>

          <div ref={contentRef} className="col-span-3 space-y-8">
            <StatCard title={"K-MMLU\nKorean Specific Subest"} value="55.21" increase="+0.58%" />
            <StatCard title={"HAE-RAE Bench:\nEvaluation of Korean Models"} value="84.14" increase="+23.37%" />
            <StatCard title={"KorNAT:\nCommon Knowledge Alignment"} value="70.16" increase="+83.18%" />
          </div>
        </div>
      </div>
    </section>
  );
}
