"use client";

import Image from "next/image";
import KAITitle from "./kAITitle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KIntelligence = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const titleElement = section.querySelector("[data-title-animation]");
    const descriptionElement = section.querySelector("[data-description-animation]");
    const dataRows = section.querySelectorAll("[data-row-animation]");
    const imageElements = section.querySelectorAll("[data-image-animation]");
    const imageProgress = section.querySelectorAll("[data-image-progress]");
    const ctaElement = section.querySelector("[data-cta-animation]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom top",
        end: "bottom bottom",
        markers: true,
        toggleActions: "play none none none", // Changed to only play once
      },
    });

    // Title and description animations
    tl.to(
      titleElement,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        ease: "power3.out",
      },
      0
    ).to(
      descriptionElement,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Data rows animations with different starting positions
    dataRows.forEach((row) => {
      const rowElement = row as HTMLElement;
      const direction = rowElement.getAttribute("data-direction");

      // Set initial positions based on direction
      if (direction === "lt") {
        gsap.set(row, { x: -300, y: -20, opacity: 0 });
      } else if (direction === "rt") {
        gsap.set(row, { x: 200, y: -20, opacity: 0 });
      } else if (direction === "cb") {
        gsap.set(row, { x: 320, y: 40, opacity: 0 });
      } else if (direction === "rb") {
        gsap.set(row, { x: 40, y: 220, opacity: 0 });
      } else if (direction === "lb") {
        gsap.set(row, { x: -200, y: 50, opacity: 0 });
      } else if (direction === "bb") {
        gsap.set(row, { x: 40, y: 150, opacity: 0 });
      }

      // Add animations for all rows simultaneously with their specific intermediate positions
      const animationConfig = {
        lt: { start: { x: -50, y: 50 }, initial: { x: -300, y: -20 } },
        rt: { start: { x: -100, y: 20 }, initial: { x: 200, y: -20 } },
        cb: { start: { x: 180, y: 0 }, initial: { x: 180, y: 40 } },
        rb: { start: { x: -120, y: 50 }, initial: { x: 40, y: 220 } },
        lb: { start: { x: 50, y: -30 }, initial: { x: -200, y: 50 } },
        bb: { start: { x: -60, y: 0 }, initial: { x: 40, y: 150 } },
      };

      const config = animationConfig[direction as keyof typeof animationConfig];
      if (config) {
        gsap.set(row, { ...config.initial, opacity: 0 });
        tl.to(
          row,
          {
            ...config.start,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "start"
        ).to(
          row,
          {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "end"
        );
      }
    });

    tl.to(
      dataRows,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0,
      },
      "-=0.2"
    );

    // Image animations
    // First image
    if (imageElements[0]) {
      const imageElement = imageElements[0] as HTMLElement;
      const progressElement = imageProgress[0] as HTMLElement;

      gsap.set(imageElement, { opacity: 0 });

      tl.to(
        imageElement,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        4
      ).to(
        progressElement,
        {
          xPercent: 100,
          duration: 0.8,
          ease: "power2.inOut",
        },
        4
      );
    }

    // Second and third images
    // Second and third images simultaneously
    for (let i = 1; i <= 2; i++) {
      if (imageElements[i]) {
        const imageElement = imageElements[i] as HTMLElement;
        const progressElement = imageProgress[i] as HTMLElement;

        gsap.set(imageElement, { opacity: 0 });
        tl.to(
          imageElement,
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          4.8
        ).to(
          progressElement,
          {
            xPercent: 100,
            duration: 0.8,
            ease: "power2.inOut",
          },
          4.8
        );
      }
    }

    // Section content floating animation
    tl.fromTo(
      section,
      {
        y: 0,
        duration: 0.8,
        ease: "power1.inOut",
      },
      {
        y: -15,
        duration: 0.8,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(section, {
            y: 0,
            duration: 0.8,
            ease: "power1.inOut",
          });
        },
      }
    );

    // Fourth and fifth images
    if (imageElements[3]) {
      const imageElement = imageElements[3] as HTMLElement;
      const progressElement = imageProgress[3] as HTMLElement;

      gsap.set(imageElement, { opacity: 0 });

      tl.to(
        imageElement,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        5.2
      ).to(
        progressElement,
        {
          xPercent: 100,
          duration: 0.8,
          ease: "power2.inOut",
        },
        5.4
      );
    }
    if (imageElements[4]) {
      const imageElement = imageElements[4] as HTMLElement;
      const progressElement = imageProgress[4] as HTMLElement;

      gsap.set(imageElement, { opacity: 0 });

      tl.to(imageElement, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }).to(progressElement, {
        xPercent: 100,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }

    // CTA animation
    if (ctaElement) {
      gsap.set(ctaElement, { opacity: 0, y: 100 });
      tl.to(ctaElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const items = [
    { number: "01", title: "DNA" },
    { number: "02", title: "빅데이터" },
    { number: "03", title: "팔만대장경" },
    { number: "04", title: "끝판왕" },
    { number: "05", title: "K라는 이름" },
    { number: "06", title: "가장 빛나게" },
  ];

  return (
    <section ref={sectionRef} className="relative flex w-full min-h-screen bg-white pt-[8.438rem] pb-[8.313rem]">
      {/* Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <div className="relative">
          {/* Circular Images */}
          <div className="absolute -top-3 left-1/2 -translate-x-5/7 opacity-0" data-image-animation>
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-white" style={{ width: "100%" }} data-image-progress></div>
              <div className="w-[14.125rem] h-[7rem] rounded-[9999px] overflow-hidden">
                <video src="/video/intelligence_1.mp4" autoPlay muted loop />
              </div>
            </div>
          </div>
          <div
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pr-[10rem] opacity-0"
            data-image-animation
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white" style={{ width: "100%" }} data-image-progress></div>
              <Image
                src="/images/k-intelligence/image-2.png"
                alt="Circular Image 2"
                width={112}
                height={112}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="absolute top-1/2 right-[calc(50%-19rem)] -translate-y-1/2 opacity-0" data-image-animation>
            <div className="relative">
              <div className="absolute inset-0 bg-white" style={{ width: "100%" }} data-image-progress></div>
              <div className="w-[14.125rem] h-[7rem] rounded-[9999px] overflow-hidden">
                <video src="/video/intelligence_2.mp4" autoPlay muted loop />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-[calc(50%-3.5rem)] translate-y-1 opacity-0" data-image-animation>
            <div className="relative">
              <div className="absolute inset-0 bg-white" style={{ width: "100%" }} data-image-progress></div>
              <div className="w-[14.125rem] h-[7rem] rounded-[9999px] overflow-hidden">
                <video src="/video/intelligence_3.mp4" autoPlay muted loop />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 translate-x-68 translate-y-2 opacity-0" data-image-animation>
            <div className="relative">
              <div className="absolute inset-0 bg-white" style={{ width: "100%" }} data-image-progress></div>
              <Image
                src="/images/k-intelligence/image-5.svg"
                alt="Circular Image 5"
                width={112}
                height={112}
                className="rounded-full"
              />
            </div>
          </div>

          {/* 데이터 표시 */}
          <div className="flex flex-col gap-[3.125rem] min-w-[50.875rem]">
            <div className="flex items-center justify-between">
              {items.slice(0, 2).map((item, index) => (
                <div
                  key={item.number}
                  className={`flex flex-col items-center text-center relative opacity-0
                  ${index === 0 ? "ml-4" : index === 1 ? "-mr-12" : ""}`}
                  data-row-animation
                  data-direction={index === 0 ? "lt" : "rt"}
                >
                  <span className="text-[0.9375rem] font-medium leading-5 absolute -top-1 -left-8">
                    ({item.number})
                  </span>
                  <h3 className="text-[5.5rem] font-bold tracking-tight leading-24">{item.title}</h3>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              {items.slice(2, 4).map((item, index) => (
                <div
                  key={item.number}
                  className={`flex flex-col items-center text-center relative opacity-0
                ${index === 0 ? "ml-12" : index === 1 ? "-mr-50" : ""}`}
                  data-row-animation
                  data-direction={index === 0 ? "cb" : "rb"}
                >
                  <span className="text-15 font-medium leading-5 absolute -top-1 -left-10">({item.number})</span>
                  <h3 className="text-[5.5rem] font-bold tracking-tight leading-24">{item.title}</h3>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              {items.slice(4, 6).map((item, index) => (
                <div
                  key={item.number}
                  className={`flex flex-col items-center text-center relative opacity-0
              ${index === 0 ? "-ml-48" : index === 1 ? "-mr-30" : ""}`}
                  data-row-animation
                  data-direction={index === 0 ? "lb" : "bb"}
                >
                  <span className="text-15 font-medium leading-5 absolute -top-1 -left-10">({item.number})</span>
                  <h3 className="text-[5.5rem] font-bold tracking-tight leading-24">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-between">
        <KAITitle
          title="Hello K"
          subtitle="AI"
          description="K-AI는 KT가 만든 한국형 인공지능 브랜드입니다. 한국인의 언어와 정서를 깊이 이해하고, 일상 속에서 따뜻한 연결을 만들어가는 AI, K-AI는 기술을 넘어 사람과 사람을 이어주는 다리가 되고자 합니다."
        />

        {/* CTA Button */}
        <div className="flex justify-center" data-cta-animation>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition-colors">
            K intelligence 더 알아보기
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="ml-1"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M10 8l6 4-6 4V8z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default KIntelligence;
