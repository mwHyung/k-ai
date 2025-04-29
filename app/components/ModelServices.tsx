"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KAITitle from "./kAITitle";

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    name: "온누리",
    title: "글에 최적화된 언어모델,\n한국 문화와 맥락에 강한",
    description:
      "조사의 미묘한 차이, 말맛을 살리는 표현, 존댓말의\n층위를 온전히 이해하고 밈부터 뉴스, 지역적 특색까지\n온누리는 한국인의 일상과 정서를 담아냅니다",
    gradient: "from-[#FF0347] via-[#11299A] to-[#0854FF]",
  },
  {
    name: "하늬",
    title: "이미지를 읽고, 감각을 이해하는,\n보이는 것을 넘어 '보는 방식'을 바꾸는",
    description:
      "색의 온도, 구성의 흐름, 시선의 결을 읽어내고\n한글 간판, 한복의 선, 공간의 감성까지\n하늬는 한국인의 감각과 시선을 담아냅니다",
    gradient: "from-[#FF0347] via-[#ED3ACE] to-[#0847F1]",
  },
  {
    name: "다온",
    title: "목소리를 이해하고,\n맥락을 읽어 좋은 방향으로 이끄는",
    description:
      "말투의 온도, 감정의 결, 대화의 흐름을 읽어내고\n질문 뒤의 진심, 멈칫거림 속의 고민까지\n다온은 한국인의 말 속 의미를 놓치지 않습니다.",
    gradient: "from-[#0854FF] via-[#11299A] to-[#FF47AF]",
  },
];

export default function ModelServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const modelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    modelRefs.current.forEach((model, index) => {
      tl.from(
        model,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.2,
        },
        "-=0.4"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#fafafa] py-32 flex items-center">
      <div className="container max-w-[1700px] w-full flex items-center justify-between mx-auto px-4">
        {/* Title Section */}
        <div ref={titleRef} className="mb-24 text-left">
          <KAITitle title="About K" subtitle="AI" direction="left" className="mb-40" />
          <h2 className="text-[6.875rem] font-medium leading-28 tracking-tighter font-plus">
            About <br />
            <p className="text-[#B9B9C5]">Model</p>
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
                <div className="flex flex-col gap-[1.625rem]">
                  <h3 className="text-[6rem] text-right font-semibold leading-24 tracking-[-0.075rem] pl-11">
                    {model.name}
                  </h3>
                  <div className={`h-2 w-full bg-gradient-to-r ${model.gradient}`} />
                </div>
                <p className="w-2 h-2 rounded-full bg-black mx-16 mt-2" />
                <div className="flex flex-col gap-3.5">
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
