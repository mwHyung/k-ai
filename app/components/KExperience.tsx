"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCardProps {
  title: string;
  description: string;
  videoSrc: string;
}

const ExperienceCard = ({ title, description, videoSrc }: ExperienceCardProps) => {
  return (
    <div className="relative flex flex-col items-center text-white group">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video src={videoSrc} autoPlay muted loop playsInline className="w-5/4 h-5/4 object-cover" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5/11 w-full h-full flex flex-col items-center justify-center group-hover:-translate-y-1/2 transition-all duration-800">
        <h3 className="text-64 font-semibold tracking-[-0.05em] leading-[1.1] mb-5 font-plus">{title}</h3>
        <p className="text-lg font-semibold leading-[1.58] text-center mb-6">{description}</p>

        <button className="inline-flex items-center gap-2 pl-[2.25rem] pr-[1.75rem] py-[1.125rem] bg-white/70 backdrop-blur-[25px] rounded-full text-white transition-all opacity-0 group-hover:opacity-100 duration-800 group-hover:delay-800">
          <span className="text-base text-black font-medium leading-[1.3] tracking-[-0.016em]">더 알아보기</span>
          <Image src="/images/icons/arrow_right_black.svg" alt="arrow-right" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default function KExperience() {
  const experienceCards = [
    {
      title: "Model",
      subtitle: "모델",
      description: "대화 흐름과 문화적 맥락을 깊이 이해하는 최적화된 모델",
      videoSrc: "/video/model_video.mp4",
    },
    {
      title: "Agent",
      subtitle: "에이전트",
      description: "K-AI 모델을 사람과 연결하는 인터페이스",
      videoSrc: "/video/agent_video.mp4",
    },
    {
      title: "Experience",
      subtitle: "익스피리언스",
      description: "K-AI를 체험할 수 있는 인터랙티브한 공간",
      videoSrc: "/video/experience_video.mp4",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="w-full h-screen">
        <div className="h-full grid grid-cols-3">
          {experienceCards.map((card) => (
            <ExperienceCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
