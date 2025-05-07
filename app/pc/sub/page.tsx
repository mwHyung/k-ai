"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import FloatingBanner from "@/app/components/FloatingBanner";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ModelComparison from "@/app/components/ModelComparison";
import FeaturesSection from "@/app/components/FeaturesSection";
import UseCaseSlider from "@/app/components/UseCaseSlider";
import ImageSlider from "@/app/components/ImageSlider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OnnuriPage() {
  const lists = [
    { title: "한국어 전용 사전학습", description: "영어 번역 없이, 자연스러운 한국어로\n학습되었습니다." },
    {
      title: "자연어 생성 최적화",
      description: "한국어의 어순과 사고 흐름에 맞춰\n자연스럽고 매끄러운 문장을 생성합니다.",
    },
    {
      title: "정서·관계 중심 언어 이해",
      description: "말투, 정서, 화자 간 관계를 인식해\n더 공감력 있고 자연스러운 대화를 만듭니다.",
    },
    {
      title: "문화적 수용성 필터링",
      description: "한국 사회의 맥락을 고려해\n윤리적이고 수용 가능한 응답을 제공합니다.",
    },
    {
      title: "산업 도메인 최적화",
      description: "공공, 금융, 교육 등 한국 산업 언어에 특화되어\n실제 업무 환경에서도 바로 적용할 수 있습니다.",
    },
    { title: "7B/13B 선택형 스케일", description: "경량부터 고성능까지,\n7B 및 13B 모델로 유연한 적용이 가능합니다." },
  ];

  const animationOptions2: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 3,
        delayChildren: 1,
      },
    },
  };

  // 카운터 상태 관리
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const [count3, setCount3] = useState<number>(0);
  const [count4, setCount4] = useState<number>(0);

  // 화면에 보이는지 감지하는 ref
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Add section refs
  const overviewRef = useRef<HTMLElement>(null);
  const foundationRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);
  const usecaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const observedNode = countRef.current;
    // ref가 있으면 observe 시작
    if (observedNode) {
      observer.observe(observedNode);
    }

    return () => {
      if (observedNode) {
        observer.unobserve(observedNode);
      }
    };
  }, []);

  useEffect(() => {
    // 화면에 보일 때만 카운터 시작
    if (isVisible) {
      const timer1 = setInterval(() => {
        setCount1((prev) => (prev < 55.21 ? prev + 1 : 55.21));
      }, 30);

      const timer2 = setInterval(() => {
        setCount2((prev) => (prev < 84.14 ? prev + 1 : 84.14));
      }, 30);

      const timer3 = setInterval(() => {
        setCount3((prev) => (prev < 70.16 ? prev + 1 : 70.16));
      }, 30);

      const timer4 = setInterval(() => {
        setCount4((prev) => (prev < 76.3 ? prev + 1 : 76.3));
      }, 30);

      return () => {
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
      };
    }
  }, [isVisible]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeListTab, setActiveListTab] = useState<number>(0);

  useEffect(() => {
    // Create Intersection Observer for each section
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px", // Trigger when section is in the middle of viewport
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find index of intersecting section
          const refs = [overviewRef, foundationRef, performanceRef, usecaseRef];
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            setActiveTab(index);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = [overviewRef.current, foundationRef.current, performanceRef.current, usecaseRef.current];

    sections.forEach((section) => {
      if (section) {
        sectionObserver.observe(section);
      }
    });

    // Cleanup
    return () => {
      sections.forEach((section) => {
        if (section) {
          sectionObserver.unobserve(section);
        }
      });
    };
  }, []); // Empty dependency array since refs won't change

  const handleTabClick = (index: number) => {
    setActiveTab(index);

    // Scroll to corresponding section
    const refs = [overviewRef, foundationRef, performanceRef, usecaseRef];
    const targetRef = refs[index];

    if (targetRef?.current) {
      const yOffset = -220; // Offset to account for sticky header
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const handleListTabClick = (index: number) => {
    setActiveListTab(index);
  };

  useEffect(() => {
    const element = document.querySelector("[data-motion-animation]");
    const items = document.querySelectorAll("[data-motion-item-animation]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "+=100%",
      },
    });

    const animateChildren = (elements: NodeListOf<Element>) => {
      if (!elements) return;

      elements.forEach((element, i) => {
        Array.from(element.children).forEach((child, index) => {
          tl.fromTo(
            child,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            index === 0 && i === 0 ? undefined : "-=0.7"
          );
        });
      });
    };

    animateChildren(items);
  }, []);

  return (
    <div className="bg-black text-white">
      <Header />
      <main className="relative">
        <FloatingBanner device="pc" />
        {/* Hero Section */}
        <section className="relative w-full h-screen mx-auto">
          <video src="/video/main_visual_2.mp4" autoPlay muted loop className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 h-[16.188rem] top-[calc(100vh-16.188rem)]"
            style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 14.8%, #000 70.46%)" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.h1
              className="flex items-center text-[8.75rem] font-semibold leading-[1] mb-[50px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              온
              <span className="mt-4.5 px-2 bg-gradient-to-r from-[#FA3E59] to-[#3B22E1] bg-clip-text text-xl font-bold leading-[1.72] text-[#E21119]">
                ONNURI
              </span>
              누리
            </motion.h1>
            <motion.p
              className="text-[28px] font-medium leading-[1.72] tracking-[-1px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              온누리는 한국어로 배우고, 한국인의 마음으로 응답하는 KT의 차세대 대규모 언어 모델입니다. <br />
              일상 속에서 따뜻한 연결을 만들어가는 AI, K-AI는 기술을 넘어 사람과 사람을 이어주는 다리가 되고자 합니다.
            </motion.p>
          </div>
        </section>

        {/* 화면 탭 버튼 */}
        <div className="sticky top-24 z-20 mt-[8.125rem]">
          <motion.div
            className="w-fit mx-auto flex bg-[#1c1c1c] rounded-full px-2 py-[7px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              amount: 0.4,
              once: true,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {["Overview", "Foundation & Validation", "Performance", "Usecase"].map((text, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`${
                  activeTab === index
                    ? "p-0.5 text-xl font-medium leading-[1.3] rounded-[100px] bg-gradient-to-r from-[#E21119] to-[#255AED]"
                    : "px-[1.875rem] py-[0.938rem] text-xl font-medium leading-[1.3] text-white/60 hover:text-white transition-colors"
                } cursor-pointer`}
              >
                {activeTab === index ? (
                  <span className="flex items-center bg-black w-full h-full rounded-full px-8 py-2">{text}</span>
                ) : (
                  text
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Intro Section */}
        <section ref={overviewRef} className="w-full mx-auto">
          <motion.div
            className="container mx-auto pt-[60px] pb-[100px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-[11.25rem]">
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-[5.625rem] font-semibold leading-[1.1] tracking-[-0.01em] mb-10">
                  Korean language model
                </h2>
                <p className="text-24 leading-[1.72] text-[#CCCCCC] mb-[3.75rem]">
                  KT의 통신 인프라와 데이터 기술력을 바탕으로, K-AI는 일상과 비즈니스에 자연스럽게 스며드는 AI 솔루션을
                  제공합니다. <br />
                  AI 생태계와의 유연한 연결성, 그리고 KT의 오랜 노하우를 기반으로 혁신적인 경험을 만들어갑니다.
                </p>
              </motion.div>

              <motion.div
                className="relative flex"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-b to-white/30 from-white/5" />
                <div className="flex flex-col relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-white/30 to-white/5" />
                  {lists.slice(0, 2).map((item, index) => (
                    <div className={`flex items-start pl-[2.625rem] pt-5 pb-[54px] pr-24`} key={index}>
                      <div className="flex flex-col items-start">
                        <Image
                          src={`/images/icons/sub_list0${index === 0 ? 1 : 4}.svg`}
                          alt="한국어 인공 지능대화"
                          width={80}
                          height={80}
                          className="mb-6"
                        />
                        <div className="flex flex-col items-start gap-3.5">
                          <span
                            className={`w-0.5 h-6 bg-[#e21119] absolute top-0 left-0 ${
                              index === 0 ? "translate-y-32" : "translate-y-103"
                            }`}
                          />
                          <h3 className="text-2xl font-medium leading-[1.3]">{item.title}</h3>
                          <p className="text-lg leading-[1.72] text-[#999999] whitespace-pre-line">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b to-white/30 from-white/5" />
                  {lists.slice(2, 4).map((item, index) => (
                    <div className={`min-w-[360px] flex items-start pl-[2.625rem] pt-5 pb-[54px] pr-28`} key={index}>
                      <div className="flex flex-col items-start">
                        <Image
                          src={`/images/icons/sub_list0${index === 0 ? 2 : 5}.svg`}
                          alt="한국어 인공 지능대화"
                          width={80}
                          height={80}
                          className="mb-6"
                        />
                        <div className="flex flex-col items-start gap-3.5">
                          <span
                            className={`w-0.5 h-6 bg-[#e21119] absolute top-0 left-0 ${
                              index === 0 ? "translate-y-32" : "translate-y-103"
                            }`}
                          />
                          <h3 className="text-2xl font-medium leading-[1.3]">{item.title}</h3>
                          <p className="text-lg leading-[1.72] text-[#999999] whitespace-pre-line">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-white/30 to-white/5" />
                  {lists.slice(4, 6).map((item, index) => (
                    <div className={`flex items-start pl-[2.625rem] pt-5 pb-[54px]`} key={index}>
                      <div className="flex flex-col items-start">
                        <Image
                          src={`/images/icons/sub_list0${index === 0 ? 3 : 6}.svg`}
                          alt="한국어 인공 지능대화"
                          width={80}
                          height={80}
                          className="mb-6"
                        />
                        <div className="flex flex-col items-start gap-3.5">
                          <span
                            className={`w-0.5 h-6 bg-[#e21119] absolute top-0 left-0 ${
                              index === 0 ? "translate-y-32" : "translate-y-103"
                            }`}
                          />
                          <h3 className="text-2xl font-medium leading-[1.3]">{item.title}</h3>
                          <p className="text-lg leading-[1.72] text-[#999999] whitespace-pre-line">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="w-full mx-auto pt-[160px] pb-[120px] relative">
          <div className="absolute top-0 left-0 w-full h-[354px] mt-[160px]">
            {/* <video src="/video/k_inspiration_video.mp4" autoPlay muted loop className="w-full h-full object-cover">
              <source src="/video/k_inspiration_video.mp4" type="video/mp4" />
            </video> */}
            <Image src="/images/sub/sub_bg.png" alt="Framework" width={1920} height={354} className="w-full h-full" />
          </div>
          <div ref={foundationRef} className="container mx-auto pt-96">
            <div className="flex flex-col items-center">
              <motion.div
                className="text-26 font-medium leading-[1.3] text-white/80 border border-white/30 py-[0.938rem] px-8 rounded-full mb-[2.125rem]"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Foundation & Validation
              </motion.div>
              <motion.h2
                className="text-90 font-semibold leading-[1.1] tracking-[-0.01em] mb-10"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Technical Design to Scientific Proof
              </motion.h2>
              <motion.p
                className="text-24 leading-[1.7] text-white/80 mb-60 text-center"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                온누리의 모델 구조(Framework), 공개 코드 및 API 접근 방식(Code), 공식 연구 결과(Publication)까지 모두
                투명하게 소개합니다.
                <br />
                어떻게 설계되었는지, 어떻게 구현되었는지, 그리고 왜 믿을 수 있는지를 이곳에서 확인하세요.
              </motion.p>
              <div className="grid grid-cols-3 gap-[12.813rem]" data-motion-animation>
                {/* 01 */}
                <div className="flex flex-col items-start" data-motion-item-animation>
                  <div className="flex items-start gap-1.5 mb-[6.375rem]">
                    <span className="text-sm font-normal leading-[1.32]">01</span>
                    <h3 className="text-42 font-semibold leading-[1.4] relative">
                      Framework
                      <p className="text-xl leading-[1.8]">한국어에 최적화된 아키텍처</p>
                    </h3>
                  </div>
                  <div>
                    <Image src="/images/sub/sub_con01.png" alt="Framework" width={307} height={307} className="mb-24" />
                  </div>
                  <p className="text-lg text-white leading-[1.8]">
                    한글 형태소 분석에 특화된 토크나이저
                    <br />
                    한국 문화 데이터 3조 토큰 규모의 프리트레이닝
                    <br />
                    전문가 피드백 기반 RLHF 적용
                  </p>
                </div>

                {/* 02 */}
                <div className="flex flex-col items-start" data-motion-item-animation>
                  <div className="flex items-start gap-1.5 mb-[5.625rem]">
                    <span className="text-sm font-normal leading-[1.32]">02</span>
                    <h3 className="text-42 font-semibold leading-[1.4] relative">
                      Publication
                      <p className="text-xl leading-[1.8]">세계가 주목한 연구 성과</p>
                    </h3>
                  </div>
                  <div>
                    <Image
                      src="/images/sub/sub_con02.png"
                      alt="Framework"
                      width={268}
                      height={276}
                      className="mb-[5.75rem] ml-10"
                    />
                  </div>
                  <p className="text-lg text-white leading-[1.8]">
                    한국어 특화 토크나이징 알고리즘 개발
                    <br />
                    문화적 맥락 이해를 위한 새로운 학습 방법론 제시
                    <br />
                    언어 모델의 문화적 편향 측정 및 완화 기법
                  </p>
                </div>

                {/* 03 */}
                <div className="flex flex-col items-start" data-motion-item-animation>
                  <div className="flex items-start gap-1.5 mb-[7.75rem]">
                    <span className="text-sm font-normal leading-[1.32]">03</span>
                    <h3 className="text-42 font-semibold leading-[1.4] relative">
                      Code
                      <p className="text-xl leading-[1.8]">손쉬운 통합, 강력한 확장성</p>
                    </h3>
                  </div>
                  <div>
                    <Image
                      src="/images/sub/sub_con03.png"
                      alt="Framework"
                      width={363}
                      height={210}
                      className="mb-[7.75rem]"
                    />
                  </div>
                  <p className="text-lg text-white leading-[1.8]">
                    Hugging Face 호환
                    <br />
                    REST API, 클라우드/온프레미스 지원
                    <br />
                    Colab 기반 데모 제공
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full mx-auto pt-[200px] pb-[100px] relative">
          <div className="container mx-auto">
            <div ref={performanceRef} className="flex flex-col items-center">
              <motion.h2
                className="text-90 font-semibold leading-[1.1] tracking-[-0.01em] mb-10"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                ONNURI Performance
              </motion.h2>
              <motion.p
                className="text-24 leading-[1.7] text-white/80 mb-60 text-center"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                온누리는 한국어 자연어 처리 분야에서 글로벌 최고 수준의 성능을 보여줍니다. <br />
                특히 한국 문화적 맥락 이해와 언어 표현력 평가에서 타 모델 대비 우수한 결과를 기록했습니다.
              </motion.p>
              <div className="grid grid-cols-3 gap-8 w-full">
                <motion.div
                  className="group flex flex-col items-center pb-9 rounded-[20px] border border-[#530000] bg-[linear-gradient(145deg,rgba(6,14,44,0.80)_72.75%,rgba(226,17,25,0.80)_112.09%)] cursor-pointer"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  onClick={() => handleListTabClick(0)}
                >
                  <div className="relative">
                    <motion.div
                      initial={{ rotate: 360 }}
                      whileInView={{ rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <Image
                        src="/images/sub/sub_con04.png"
                        alt="Framework"
                        width={307}
                        height={307}
                        className="mt-[2.875rem] mb-11"
                      />
                    </motion.div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-[9px]">
                      <p className="text-xl leading-[1.72] tracking-[0.6px] text-[#ff7b7f]">ONNURI</p>
                      <h2 className="flex items-end text-80 font-semibold leading-[1] tracking-[-4px] bg-[linear-gradient(0deg,#B4B4B4_0%,#FFF_100%)] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-suit">
                        94.3
                        <p className="pb-2 pl-1.5 text-58 font-semibold leading-[1] tracking-[-1.16px]">점</p>
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <h3 className="text-30 font-semibold leading-[1.6] relative">KLUE 벤치마크</h3>
                    <p className="text-xl font-light leading-[1.5] text-center">
                      온누리는 다양한 벤치마크에서
                      <br />
                      상당히 향상된 성능을 보여줍니다.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="group flex flex-col items-center pb-9 rounded-[20px] border border-[#001253] bg-[linear-gradient(145deg,rgba(6,14,44,0.60)_72.75%,rgba(17,125,226,0.60)_112.09%)] cursor-pointer"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  onClick={() => handleListTabClick(1)}
                >
                  <div className="relative">
                    <Image
                      src="/images/sub/sub_con05.png"
                      alt="Framework"
                      width={323}
                      height={293}
                      className="mt-[2.875rem] mb-11"
                    />
                    <div className="absolute top-0 left-0 w-full h-[293px] overflow-hidden mt-[0.3rem]">
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 137, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-0 -bottom-6 -translate-x-3.5"
                      >
                        <Image src="/images/sub/sub_data_chat1.png" alt="Framework" width={66} height={137} />
                      </motion.div>
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 173, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-0 -bottom-6 translate-x-8.5"
                      >
                        <Image src="/images/sub/sub_data_chat2.png" alt="Framework" width={66} height={173} />
                      </motion.div>
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 155, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.4, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-0 -bottom-6 translate-x-20.5"
                      >
                        <Image src="/images/sub/sub_data_chat3.png" alt="Framework" width={66} height={155} />
                      </motion.div>
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 173, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.6, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-0 -bottom-6 translate-x-32.5"
                      >
                        <Image src="/images/sub/sub_data_chat4.png" alt="Framework" width={66} height={173} />
                      </motion.div>
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 153, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.8, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute right-0 -bottom-6 -translate-x-20"
                      >
                        <Image src="/images/sub/sub_data_chat5.png" alt="Framework" width={66} height={153} />
                      </motion.div>
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 135, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute right-0 -bottom-6 -translate-x-8"
                      >
                        <Image src="/images/sub/sub_data_chat6.png" alt="Framework" width={66} height={135} />
                      </motion.div>
                      <motion.div
                        initial={{ height: 0, y: -25 }}
                        whileInView={{ height: 153, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.2, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute right-0 -bottom-6 translate-x-3.5"
                      >
                        <Image src="/images/sub/sub_data_chat7.png" alt="Framework" width={66} height={153} />
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <h3 className="text-30 font-semibold leading-[1.6] relative">데이터 크기별 진화</h3>
                    <p className="text-xl font-light leading-[1.5] text-center">
                      데이터 크기별 성능 변화를 통해
                      <br /> AI 모델의 확장성과 효율성 향상을 확인해보세요.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center pb-9 rounded-[20px] border border-[#360053] bg-[linear-gradient(145deg,rgba(6,14,44,0.80)_72.75%,rgba(145,54,187,0.60)_112.09%)] cursor-pointer"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 }}
                  onClick={() => handleListTabClick(2)}
                >
                  <div className="relative">
                    <Image
                      src="/images/sub/sub_con06.png"
                      alt="Framework"
                      width={280}
                      height={280}
                      className="mt-[2.875rem] mb-11"
                    />
                    <motion.div
                      initial={{ opacity: 0, rotate: -360 }}
                      whileInView={{ opacity: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 2.6, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute top-1/2 left-1/2 -translate-x-26 -translate-y-1/2 w-[176px] h-[176px] flex flex-col items-center justify-center origin-[57%_50%]"
                    >
                      <Image src="/images/sub/sub_con06-2.png" alt="Framework" width={150} height={176} />
                    </motion.div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <h3 className="text-30 font-semibold leading-[1.6] relative">ONNURI 성능 지표</h3>
                    <p className="text-xl font-light leading-[1.5] text-center">
                      AI 모델의 기술, 효율성, 확장성 향상을
                      <br />
                      한눈에 확인하세요.
                    </p>
                  </div>
                </motion.div>

                {/* 탭 컨텐츠 */}
                <motion.ul
                  className="col-span-3"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {activeListTab === 1 ? (
                    <li>
                      <div className="flex flex-col items-center pt-20 pl-[5.625rem] pb-[12.125rem] pr-[5.625rem] rounded-[20px] bg-[linear-gradient(248deg,rgba(0,0,0,0.00)_11.38%,rgba(102,102,102,0.45)_114.02%),linear-gradient(72deg,rgba(0,0,0,0.00)_22.59%,rgba(102,102,102,0.45)_113.4%)]">
                        <div className="flex items-start justify-between w-full mb-14">
                          <div className="flex flex-col justify-center gap-5">
                            <h3 className="text-40 font-semibold leading-[1.4]">
                              AI 성능의 발전 : 데이터 크기별 성능 향상
                            </h3>
                            <p className="text-xl font-light leading-[1.5]">
                              데이터 크기가 커짐에 따라 AI 모델의 성능은 어떻게 진화하는지, 그 차이를 살펴보세요. <br />
                              이번 비교를 통해 모델의 확장성과 효율성이 어떻게 발전해왔는지 확인할 수 있으며, 이를
                              바탕으로 더욱 고도화된 성능을 구현한 결과를 경험하실 수 있습니다.
                            </p>
                          </div>
                        </div>
                        <ModelComparison />
                      </div>
                    </li>
                  ) : activeListTab === 2 ? (
                    <li>
                      <div className="flex flex-col items-center pt-20 pl-[5.625rem] pb-[12.125rem] pr-[5.625rem] rounded-[20px] bg-[linear-gradient(248deg,rgba(0,0,0,0.00)_11.38%,rgba(102,102,102,0.45)_114.02%),linear-gradient(72deg,rgba(0,0,0,0.00)_22.59%,rgba(102,102,102,0.45)_113.4%)]">
                        <div className="flex items-start justify-between w-full mb-14">
                          <div className="flex flex-col justify-center gap-5">
                            <h3 className="text-40 font-semibold leading-[1.4]">
                              온누리 성능 지표 : AI 모델의 종합적 성능
                            </h3>
                            <p className="text-xl font-light leading-[1.5]">
                              온누리의 다양한 성능 지표를 통해 AI 모델의 고도화된 기술, 효율성, 확장성 등을 종합적으로
                              확인할 수 있습니다. <br />각 지표는 온누리가 어떻게 성능을 향상시키고 발전시켰는지를
                              보여줍니다.
                            </p>
                          </div>
                        </div>
                        <FeaturesSection />
                      </div>
                    </li>
                  ) : (
                    <li>
                      <div
                        ref={countRef}
                        className="flex flex-col items-center pt-20 pl-[5.625rem] pb-[5.625rem] pr-[5.625rem] rounded-[20px] bg-[linear-gradient(248deg,rgba(0,0,0,0.00)_11.38%,rgba(102,102,102,0.45)_114.02%),linear-gradient(72deg,rgba(0,0,0,0.00)_22.59%,rgba(102,102,102,0.45)_113.4%)]"
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex flex-col justify-center gap-5">
                            <h3 className="text-40 font-semibold leading-[1.4]">KLUE 벤치마크</h3>
                            <p className="text-xl font-light leading-[1.5]">
                              온누리는 한국어 자연어 처리 분야에서 글로벌 최고 수준의 성능을 보여줍니다. <br />
                              특히 한국 문화적 맥락 이해와 언어 표현력 평가에서 타 모델 대비 우수한 결과를 기록했습니다.
                            </p>
                          </div>
                          <p className="text-lg font-semibold leading-[1.2] text-white">Model Performance Benchmarks</p>
                        </div>
                        <div className="flex items-end justify-between w-full">
                          <ul className="grid grid-cols-2 gap-x-[4.375rem] gap-y-[5.625rem]">
                            <li className="flex flex-col">
                              <strong className="text-80 font-semibold leading-[1] tracking-[-1.6px] font-suit bg-[linear-gradient(0deg,#B4B4B4_0%,#FFF_100%)] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] pb-6 border-b border-white/40 mb-4">
                                {count1}
                              </strong>
                              <p className="text-15 font-medium leading-[1.36] text-white/80">
                                K-MMLU <br />
                                Korean Specific Subest
                              </p>
                            </li>
                            <li className="flex flex-col">
                              <strong className="text-80 font-semibold leading-[1] tracking-[-1.6px] font-suit bg-[linear-gradient(0deg,#B4B4B4_0%,#FFF_100%)] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] pb-6 border-b border-white/40 mb-4">
                                {count2}
                              </strong>
                              <p className="text-15 font-medium leading-[1.36] text-white/80">
                                HAE-RAE Bench
                                <br />
                                Evaluation of Korean Models
                              </p>
                            </li>
                            <li className="flex flex-col">
                              <strong className="text-80 font-semibold leading-[1] tracking-[-1.6px] font-suit bg-[linear-gradient(0deg,#B4B4B4_0%,#FFF_100%)] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] pb-6 border-b border-white/40 mb-4">
                                {count3}
                              </strong>
                              <p className="text-15 font-medium leading-[1.36] text-white/80">
                                KorNAT <br />
                                Common Knowledge Alignment
                              </p>
                            </li>
                            <li className="flex flex-col">
                              <strong className="text-80 font-semibold leading-[1] tracking-[-1.6px] font-suit bg-[linear-gradient(0deg,#B4B4B4_0%,#FFF_100%)] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] pb-6 border-b border-white/40 mb-4">
                                {count4}
                              </strong>
                              <p className="text-15 font-medium leading-[1.36] text-white/80">
                                AI-Model Bench <br />
                                Performance Evaluation
                              </p>
                            </li>
                          </ul>
                          <div className="flex flex-col items-center w-[672px] h-[672px] relative">
                            {/* animation area */}
                            <div className="relative rounded-full overflow-hidden w-full h-full">
                              <motion.div
                                className="w-full h-full rounded-full bg-black border border-[#A40E26] absolute top-0 right-0 overflow-hidden"
                                initial={{
                                  scale: 0.1,
                                  originX: "top",
                                  originY: "right",
                                }}
                                whileInView={{
                                  scale: 1,
                                  originX: "top",
                                  originY: "right",
                                }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 3,
                                  delay: 1,
                                  ease: [0.25, 1, 0.5, 1],
                                  delayChildren: 0.8,
                                }}
                              >
                                <motion.div
                                  className="w-[85%] h-[85%] rounded-full bg-[linear-gradient(227deg,rgba(255,255,255,0.80)_13.3%,#A2051F_82.16%)] absolute top-[18px] right-[10px]"
                                  initial={{
                                    scale: 0.1,
                                    originX: "top",
                                    originY: "right",
                                  }}
                                  whileInView={{
                                    scale: 1,
                                    originX: "top",
                                    originY: "right",
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 3,
                                    delay: 1.4,
                                    ease: [0.25, 1, 0.5, 1],
                                    delayChildren: 0.8,
                                  }}
                                >
                                  <motion.div
                                    className="w-[82%] h-[82%] rounded-full bg-black border border-[#A40E26] absolute top-[14px] right-[12px]"
                                    initial={{
                                      scale: 0.1,
                                      originX: "top",
                                      originY: "right",
                                    }}
                                    whileInView={{
                                      scale: 1,
                                      originX: "top",
                                      originY: "right",
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                      duration: 3,
                                      delay: 1.8,
                                      ease: [0.25, 1, 0.5, 1],
                                      delayChildren: 0.8,
                                    }}
                                  >
                                    <motion.div
                                      className="w-[74%] h-[74%] rounded-full bg-[linear-gradient(227deg,rgba(255,255,255,0.80)_13.3%,#A2051F_82.16%)] absolute top-[16px] right-[20px]"
                                      initial={{
                                        scale: 0.1,
                                        originX: "top",
                                        originY: "right",
                                      }}
                                      whileInView={{
                                        scale: 1,
                                        originX: "top",
                                        originY: "right",
                                      }}
                                      viewport={{ once: true }}
                                      transition={{
                                        duration: 3,
                                        delay: 2.2,
                                        ease: [0.25, 1, 0.5, 1],
                                      }}
                                    >
                                      <motion.div
                                        initial={{
                                          scale: 0.1,
                                          originX: "top",
                                          originY: "right",
                                        }}
                                        whileInView={{
                                          scale: 1,
                                          originX: "top",
                                          originY: "right",
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                          duration: 3,
                                          delay: 2.6,
                                          ease: [0.25, 1, 0.5, 1],
                                        }}
                                        className="w-[62%] h-[62%] rounded-full bg-black border border-[#A40E26] absolute top-[16px] right-[20px]"
                                      ></motion.div>
                                    </motion.div>
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            </div>
                            <motion.div
                              className="absolute top-0 right-0 w-full h-full flex items-center justify-center"
                              initial="offscreen"
                              whileInView="onscreen"
                              viewport={{
                                amount: 0.7,
                                once: true,
                              }}
                            >
                              <motion.div
                                className="absolute bottom-[5%] left-[22%] before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:absolute before:top-1.5 before:-left-5 before:bg-[#FF4646] before:transition-all before:duration-300 before:ease-in-out before:hover:w-full before:hover:h-full"
                                variants={animationOptions2}
                              >
                                <span className="text-lg font-semibold leading-[1.2] tracking-[-0.03em]">
                                  Worldwide <br />
                                  Confidence
                                </span>
                                <motion.div
                                  className="absolute bottom-[15px] left-[230px] before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:absolute before:top-1.5 before:-left-5 before:bg-[#FF4646] before:transition-all before:duration-300 before:ease-in-out before:hover:w-full before:hover:h-full"
                                  variants={animationOptions2}
                                >
                                  <span className="text-lg font-semibold leading-[1.2] tracking-[-0.03em]">
                                    Global Recognition
                                  </span>
                                  <motion.div
                                    className="absolute bottom-[186px] left-[-137px] before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:absolute before:top-1.5 before:-left-5 before:bg-[#FF4646] before:transition-all before:duration-300 before:ease-in-out before:hover:w-full before:hover:h-full"
                                    variants={animationOptions2}
                                  >
                                    <span className="text-lg font-semibold leading-[1.2] tracking-[-0.03em]">
                                      AI Performance <br />
                                      Benchmark
                                    </span>
                                    <motion.div
                                      className="absolute bottom-[12px] left-[192px] before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:absolute before:top-1.5 before:-left-5 before:bg-[#FF4646] before:transition-all before:duration-300 before:ease-in-out before:hover:w-full before:hover:h-full"
                                      variants={animationOptions2}
                                    >
                                      <span className="text-lg font-semibold leading-[1.2] tracking-[-0.03em]">
                                        Knowledge <br />
                                        Alignment
                                      </span>
                                      <motion.div
                                        className="absolute bottom-[154px] left-[-15px] before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:absolute before:top-1.5 before:-left-5 before:bg-[#FF4646] before:transition-all before:duration-300 before:ease-in-out before:hover:w-full before:hover:h-full"
                                        variants={animationOptions2}
                                      >
                                        <span className="text-lg font-semibold leading-[1.2] tracking-[-0.03em]">
                                          Korean Models <br />
                                          Evaluation
                                        </span>

                                        <motion.div
                                          className="absolute top-[-162px] right-[-186px] flex flex-col gap-1.5"
                                          variants={animationOptions2}
                                        >
                                          <span className="text-lg font-semibold leading-[1.2] tracking-[-0.03em]">
                                            Korean Language
                                            <br /> Understanding
                                          </span>
                                          <Image
                                            src="/images/sub/sub_con_cir.png"
                                            alt="circle icon"
                                            width={26}
                                            height={26}
                                            className="-ml-2"
                                          />
                                        </motion.div>
                                      </motion.div>
                                    </motion.div>
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </motion.ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full mx-auto pt-[160px] pb-[100px] relative">
          <div className="container mx-auto">
            <div ref={usecaseRef} className="flex flex-col items-center mb-[7.5rem]">
              <motion.h2
                className="text-90 font-semibold leading-[1.1] tracking-[-0.01em] mb-10"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Use case
              </motion.h2>
              <motion.p
                className="text-24 leading-[1.7] text-white/80 text-center"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                특화된 언어지능으로, 온누리는 한국 사회 곳곳의 다양한 문제에 도전했습니다.
                <br />
                일상 대화부터 공공 서비스, 금융 상담까지 한국어에 최적화된 AI가 어떻게 실질적인 변화를 이끌어냈는지
                확인해보세요.
              </motion.p>
            </div>
          </div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <UseCaseSlider />
          </motion.div>
        </section>

        {/* 이미지지 슬라이더 */}
        <section className="w-full mx-auto pt-[160px] pb-[190px] relative">
          <ImageSlider />
        </section>
      </main>
      <Footer />
    </div>
  );
}
