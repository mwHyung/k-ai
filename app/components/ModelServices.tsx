"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KAITitle from "./kAITitle";

gsap.registerPlugin(ScrollTrigger);

interface ModelServicesProps {
  sectionIndex: number;
}

const models = [
  {
    name: "온누리",
    title: "글에 최적화된 언어모델,\n한국 문화와 맥락에 강한",
    description:
      "조사의 미묘한 차이, 말맛을 살리는 표현, 존댓말의\n층위를 온전히 이해하고 밈부터 뉴스, 지역적 특색까지\n온누리는 한국인의 일상과 정서를 담아냅니다",
    src: "/video/model_services_1.mp4",
  },
  {
    name: "하늬",
    title: "이미지를 읽고, 감각을 이해하는,\n보이는 것을 넘어 '보는 방식'을 바꾸는",
    description:
      "색의 온도, 구성의 흐름, 시선의 결을 읽어내고\n한글 간판, 한복의 선, 공간의 감성까지\n하늬는 한국인의 감각과 시선을 담아냅니다",
    src: "/video/model_services_2.mp4",
  },
  {
    name: "다온",
    title: "목소리를 이해하고,\n맥락을 읽어 좋은 방향으로 이끄는",
    description:
      "말투의 온도, 감정의 결, 대화의 흐름을 읽어내고\n질문 뒤의 진심, 멈칫거림 속의 고민까지\n다온은 한국인의 말 속 의미를 놓치지 않습니다.",
    src: "/video/model_services_3.mp4",
  },
];

export default function ModelServices({ sectionIndex }: ModelServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const modelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modelNameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modelDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modelTitleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimated.current) return;

    const SubTitleElement = section.querySelector("[data-title-animation]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => {
          return sectionIndex === 2 ? "-202% 200%" : "top top";
        },
        end: "bottom bottom",
        toggleActions: "play none none none",
        onEnter: () => {
          hasAnimated.current = true;
        },
      },
    });

    // 1. Subtitle animation
    tl.fromTo(
      SubTitleElement,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      }
    );

    // 2. Main title animation
    gsap.set(mainTitleRef.current, {
      opacity: 0,
      y: 30,
    });

    tl.to(
      mainTitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "+=0.1"
    );

    // 3. Models animation - each element separately
    models.forEach((_, index) => {
      // Set initial states for all elements
      gsap.set([modelNameRefs.current[index], modelDotRefs.current[index], modelTitleRefs.current[index]], {
        opacity: 0,
        y: 100,
      });

      // Animate each model group with staggered timing
      tl.to(
        [modelNameRefs.current[index], modelDotRefs.current[index], modelTitleRefs.current[index]],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15, // Elements within each model animate with slight delay
        },
        // Add delay between model groups
        index === 0 ? "+=0.2" : "-=0.4" // Changed to negative delay for overlapping animations
      );
    });

    return () => {
      tl.kill();
    };
  }, [sectionIndex]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#fafafa] py-32 flex items-center">
      <div className="container max-w-[1700px] w-full flex items-center justify-between mx-auto px-4">
        {/* Title Section */}
        <div className="mb-24 text-left">
          {/* Sub Title */}
          <div ref={subTitleRef}>
            <KAITitle title="About K" subtitle="AI" direction="left" className="mb-40" />
          </div>
          {/* Main Title */}
          <h2 ref={mainTitleRef} className="text-[6.875rem] font-medium leading-28 tracking-tighter font-plus">
            About <br />
            <div className="relative">
              <div className="absolute inset-0 z-0 overflow-hidden pt-3">
                <video className="w-full h-full object-cover" autoPlay muted loop src="/video/model_services_bg.mp4" />
              </div>
              <p className="relative z-10 mix-blend-lighten bg-[#fafafa] text-black">Model</p>
            </div>
            <p className="text-[#B9B9C5]">& Agent</p>
            Services
          </h2>
        </div>

        {/* Models Grid */}
        <div className="flex flex-col gap-[6.563rem]">
          {models.map((model, index) => (
            <div
              key={model.name}
              ref={(el) => {
                modelRefs.current[index] = el;
              }}
              className="relative"
            >
              <div
                className={`flex gap-4 justify-end ${index === 1 ? "mr-[1.563rem]" : index === 2 ? "mr-[2rem]" : ""}`}
              >
                <div
                  ref={(el) => {
                    modelNameRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-[1.625rem]"
                >
                  <h3 className="text-[6rem] text-right font-semibold leading-24 tracking-[-0.075rem] pl-11">
                    {model.name}
                  </h3>
                  <div className={`h-2 w-full overflow-hidden`}>
                    <video className="w-full h-full object-cover" autoPlay muted loop src={model.src} />
                  </div>
                </div>
                <p
                  ref={(el) => {
                    modelDotRefs.current[index] = el;
                  }}
                  className="w-2 h-2 rounded-full bg-black mx-16 mt-2"
                />
                <div
                  ref={(el) => {
                    modelTitleRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-3.5"
                >
                  <p className="text-lg font-medium text-[#202020] leading-[1.575rem] whitespace-pre-line">
                    {model.title}
                  </p>
                  <p className="text-sm text-[#777] leading-[1.418rem] tracking-[-0.014rem] whitespace-pre-line">
                    {model.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
