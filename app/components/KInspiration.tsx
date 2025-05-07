"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KAITitle from "./kAITitle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "맥락 기반 이해력",
    subtitle: "관계와 의도를 읽는 한국형 담화 처리",
    description:
      "문장을 해석하는 데서 그치지 않습니다.\n화자와 청자의 관계, 맥락 속에 숨은 감정선,\n말끝의 온도까지 고려합니다",
    image: "/images/context-understanding.jpg",
  },
  {
    title: "자연스러운 문장 생성",
    subtitle: "한국어 고유의 어순과 표현 리듬",
    description:
      "번역 기반의 언어 생성이 아닌, 한국어 고유의 어순,\n표현 리듬, 논리 전개 방식에 맞춰 문장을\n자연스럽고 정돈된 흐름으로 완성합니다.",
    image: "/images/natural-sentence.jpg",
  },
  {
    title: "실전형 도메인 최적화",
    subtitle: "공공의 언어 구조에 최적화",
    description:
      "민원 처리, 고객 상담, 금융 텍스트, 행정 문서 등\n공공의 언어 구조에 최적화된 텍스트로 학습되어\n기업/기관이 바로 활용 가능한 성능을 보입니다.",
    image: "/images/domain-optimization.jpg",
  },
  {
    title: "문화 감수성 반영 응답",
    subtitle: "한국 사회 인식 기준에 맞춘 판단",
    description:
      "어떤 맥락에서, 어떤 방식으로 전달 되는지 고려,\n한국 특유의 집단 정서, 문화적 판단, 의미 있는\n응답과 적절한 거리감을 설계합니다.",
    image: "/images/cultural-sensitivity.jpg",
  },
];

export default function KInspiration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featureWrapRefs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const featureWrap = featureWrapRefs.current;
    if (!section || !featureWrap) return;

    const Subtitle = section.querySelector("[data-title-animation]");
    const Title = section.querySelector("[data-main-title-animation]");
    const Description = section.querySelector("[data-description-animation]");

    // Set initial opacity and transform of features
    featureRefs.current.forEach((feature) => {
      if (feature) {
        gsap.set(feature, {
          opacity: 0,
          y: 50,
          scale: 0.95,
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center top",
        toggleActions: "play none none none",
        // pin: true,
        // pinSpacing: true,
      },
    });

    // Title animations sequence
    tl.fromTo(
      Subtitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    )
      .fromTo(
        Title,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        Description,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // Features animations after description
      .add(() => {
        featureRefs.current.forEach((feature, index) => {
          gsap.to(feature, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
          });
        });
      });

    gsap.fromTo(
      featureWrap,
      {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      {
        yPercent: -60,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          toggleActions: "play none none none",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-white to-[#E4E8E9] py-32">
      <div className="container flex justify-between max-w-[1700px] w-full mx-auto px-4">
        {/* Title Section */}
        <div className="mb-24 flex-2/4 h-fit">
          <KAITitle title="Meet K" subtitle="Inspiration" direction="left" className="mb-20" />
          <h2 className="text-[3.25rem] font-bold leading-[1.4] tracking-[-0.02em] mb-10" data-main-title-animation>
            KT는 &apos;진짜 한국형 AI&apos;,
            <br /> K-AI를 통해 우리 언어와 문화를
            <br /> 깊이 이해하는 인공지능의 새로운
            <br /> 시대를 열어갑니다.
          </h2>
          <p className="text-lg font-medium leading-[1.86] text-[#333] max-w-[800px]" data-description-animation>
            K-AI는 KT가 만든 가장 한국적인 방식으로 설계된 인공지능
            <br /> 생태계입니다. 이곳은 KT의 기술, 철학, 그리고 한국형 AI의 실체를 직접 만나고
            <br /> 체험할 수 있는 K-AI의 중심 공간입니다.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={featureWrapRefs} className="flex gap-12 mt-[7rem] flex-2/4 flex-wrap">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => {
                featureRefs.current[index] = el;
              }}
              className={`relative flex-1/3 bg-[#F8F8F8] rounded-[1.25rem] px-8 py-[2.875rem] max-h-[31.625rem] h-full ${
                index === 1 ? "mt-24" : ""
              } ${index === 2 ? "-mt-24" : ""}`}
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={`/images/k-inspration/image_${index + 1}.png`}
                  alt={feature.title}
                  width={index === 0 ? 228 : index === 1 ? 234 : index === 2 ? 219 : 216.8}
                  height={index === 0 ? 228 : index === 1 ? 234 : index === 2 ? 219 : 180}
                  className="mb-[2.063rem]"
                />
                <div className="flex flex-col gap-3 mb-3.5">
                  <h3 className="text-26 font-bold leading-[1.2]">{feature.title}</h3>
                  <p className="text-base font-semibold leading-[1.36] text-[#252525]">{feature.subtitle}</p>
                </div>
                <p className="text-15 leading-[1.58] text-[#666] whitespace-pre-line">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
