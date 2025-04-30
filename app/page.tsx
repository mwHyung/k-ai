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
    const container = containerRef.current;
    if (!sections.length || !container) return;

    // parallax scrolling이 필요한 섹션들만 선택
    const parallaxSections = sections.slice(0, 3);

    // 컨테이너의 높이를 parallax 섹션들의 높이 합으로 설정
    gsap.set(container, {
      height: `${parallaxSections.length * 100}vh`,
    });

    // 각 parallax 섹션의 초기 스타일 설정
    parallaxSections.forEach((section, index) => {
      if (!section) return;

      gsap.set(section, {
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        yPercent: index === 0 ? 0 : 100,
        zIndex: 10 + index,
      });

      // 각 섹션의 ScrollTrigger 생성
      ScrollTrigger.create({
        trigger: container,
        start: `${index * 31}% top`,
        end: `${(index + 1) * 31}% top`,
        scrub: 1,
        markers: true,
        onEnter: () => {
          gsap.to(section, {
            yPercent: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            yPercent: index === 0 ? 0 : 100,
            duration: 1,
            ease: "power2.inOut",
          });
        },
        // onUpdate: (self) => {
        //   const progress = self.progress;
        //   if (index > 0) {
        //     gsap.to(section, {
        //       yPercent: -100 + progress * 100,
        //       ease: "power2.inOut",
        //       immediateRender: false,
        //     });
        //   }
        // },
      });
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
        <div ref={containerRef} className="relative">
          <div ref={addToRefs} className="relative z-[10] h-screen">
            <VideoSwiper />
          </div>
          <div ref={addToRefs} className="relative z-[11] h-screen bg-white">
            <KIntelligence />
          </div>
          <div ref={addToRefs} className="relative z-[12] h-screen bg-white">
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
