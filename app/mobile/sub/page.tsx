"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingBanner from "@/app/components/FloatingBanner";

gsap.registerPlugin(ScrollTrigger);

export default function MobilePage() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <main className="flex flex-col items-center justify-center bg-[#EEEEEE] overflow-hidden py-[101px] h-screen">
      <div
        className="group absolute top-0 left-0 w-[calc(50%-209.5px)] h-full z-50 hover:bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(255,255,255,0.00)_100%)] transition-all duration-300 cursor-pointer"
        onClick={() => {
          window.location.href = "/mobile";
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 rotate-180 group-hover:opacity-100 transition-opacity duration-300">
          <Image
            src="/images/icons/arrow_right_white.svg"
            alt="arrow-right"
            width={300}
            height={300}
            className="opacity-50"
          />
        </div>
      </div>
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative w-[419px] h-[878px] mx-auto border-[13px] rounded-4xl border-[#181A22] filter drop-shadow(0px 3.435px 2.748px rgba(0, 0, 0, 0.02)) drop-shadow(0px 8.687px 6.95px rgba(0, 0, 0, 0.03)) drop-shadow(0px 17.721px 14.177px rgba(0, 0, 0, 0.03)) drop-shadow(0px 36.502px 29.201px rgba(0, 0, 0, 0.04)) drop-shadow(0px 100px 80px rgba(0, 0, 0, 0.06)) overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="relative">
          <Image src="/images/mo/MO_sub.jpg" alt="hero" width={394} height={852} className="object-cover" />
          <div className="sticky bottom-0">
            <FloatingBanner device="mobile" />
          </div>
        </div>
      </section>
      <div
        className="group absolute top-0 right-0 w-[calc(50%-209.5px)] h-full z-50 hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.00)_0%,rgba(0,0,0,0.2)_100%)] transition-all duration-300 cursor-pointer"
        onClick={() => {
          window.location.href = "/mobile/chat";
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Image
            src="/images/icons/arrow_right_white.svg"
            alt="arrow-right"
            width={300}
            height={300}
            className="opacity-50"
          />
        </div>
      </div>
    </main>
  );
}
