"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoSwiper from "./components/VideoSwiper";
import KIntelligence from "@/app/components/KIntelligence";
import ModelServices from "@/app/components/ModelServices";
import KInspiration from "@/app/components/KInspiration";
import KExperience from "@/app/components/KExperience";
import KAILab from "@/app/components/KAILab";
import KExperienceDemo from "@/app/components/KExperienceDemo";
import KUseCase from "@/app/components/KUseCase";
import KNews from "@/app/components/KNews";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import FloatingBanner from "@/app/components/FloatingBanner";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    const main = mainRef.current;
    const container = containerRef.current;
    if (!sections.length || !main || !container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    sections.forEach((section, index) => {
      if (!section || index === 0) return; // 첫 번째 섹션은 제외

      // 각 섹션의 초기 스타일 설정
      gsap.set(section, {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 10 + index,
      });

      // 스크롤에 따라 섹션이 아래에서 위로 올라오는 애니메이션
      tl.fromTo(
        section,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "power2.inOut",
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <Header />
      <main ref={mainRef} className="relative">
        <FloatingBanner />
        <div ref={containerRef} className="relative flex flex-col">
          <div ref={addToRefs} className="relative z-[10] h-full">
            <VideoSwiper />
          </div>
          <div ref={addToRefs} className="relative z-[11] bg-white h-full">
            <KIntelligence />
          </div>
          <div ref={addToRefs} className="relative z-[12] bg-white h-full">
            <ModelServices />
          </div>
        </div>
        <div className="relative z-[14] bg-white transition-colors duration-700 dark:bg-black">
          <KInspiration />
          <KExperience />
          <KAILab />
          <KExperienceDemo />
          <KUseCase />
          <KNews />
        </div>
      </main>
      <Footer />
    </>
  );
}
