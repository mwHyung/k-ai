"use client";

import { useState } from "react";
import VideoSwiper from "@/app/components/VideoSwiper";
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
import SmoothScroll from "@/app/components/SmoothScroll";

export default function Home() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  return (
    <>
      <Header />
      <main className="relative scroll-smooth">
        <FloatingBanner device="pc" />
        <SmoothScroll onSectionChange={setCurrentSectionIndex}>
          <div className="w-full h-screen z-[10] scroll-container" tabIndex={0} aria-label="Video Swiper Section">
            <VideoSwiper />
          </div>
          <div
            className="w-full h-screen z-[11] bg-white scroll-container"
            tabIndex={0}
            aria-label="KIntelligence Section"
          >
            <KIntelligence sectionIndex={currentSectionIndex} />
          </div>
          <div
            className="w-full h-screen z-[12] bg-white scroll-container"
            tabIndex={0}
            aria-label="Model Services Section"
          >
            <ModelServices sectionIndex={currentSectionIndex} />
          </div>
        </SmoothScroll>
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
