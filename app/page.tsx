"use client";

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

export default function Home() {
  return (
    <main className="relative">
      <VideoSwiper />
      <KIntelligence />
      <ModelServices />
      <KInspiration />
      <KExperience />
      <KAILab />
      <KExperienceDemo />
      <KUseCase />
      <KNews />
      <Footer />
    </main>
  );
}
