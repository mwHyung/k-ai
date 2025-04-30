"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 컨테이너의 높이를 섹션들의 높이 합으로 설정
    container.style.height = `${sectionsRef.current.length * 180}vh`;
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
          <motion.div
            ref={addToRefs}
            className="fixed top-0 left-0 w-full h-screen z-[10]"
            style={{
              y: useTransform(scrollYProgress, [0, 0], ["0%", "0%"]),
            }}
          >
            <VideoSwiper />
          </motion.div>
          <motion.div
            ref={addToRefs}
            className="fixed top-0 left-0 w-full h-screen z-[11] bg-white"
            style={{
              y: useTransform(scrollYProgress, [0, 0.44], ["100%", "0%"]),
            }}
          >
            <KIntelligence />
          </motion.div>
          <motion.div
            ref={addToRefs}
            className="fixed top-0 left-0 w-full h-screen z-[12] bg-white"
            style={{
              y: useTransform(scrollYProgress, [0.44, 1], ["100%", "0%"]),
            }}
          >
            <ModelServices />
          </motion.div>
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
