"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KAITitle from "./kAITitle";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  title: string;
  value: string;
  increase: string;
}

const StatCard = ({ title, value, increase }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cardRef} className="flex items-end justify-between gap-2 border-b border-black pb-0.5 px-2">
      <div className="flex items-center gap-4 pb-1.5">
        <p className="text-base leading-[1.32] text-[#333333] whitespace-pre-line">{title}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className="text-base font-medium leading-[1.02] tracking-[-0.01em] font-plus text-[#B8B8B8] mb-2">
          {increase}
        </span>
        <span className="text-[4.5rem] font-semibold leading-[1.02] tracking-[-0.02em] font-plus text-black">
          {isVisible ? (
            <CountUp
              start={0}
              end={parseFloat(value.replace(/,/g, ""))}
              duration={4}
              separator=","
              decimals={value.includes(".") ? value.split(".")[1].length : 0}
              decimal="."
            />
          ) : (
            "0"
          )}
        </span>
      </div>
    </div>
  );
};

export default function KAILab() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !title || !content) return;

    const SubTitle = section.querySelector("[data-title-animation]");
    const MainTitleLine = section.querySelector("[data-main-title-line-animation]");
    const MainTitleCulture = section.querySelector("[data-main-culture-animation]");
    const MainTitleDescription = section.querySelector("[data-main-description-animation]");
    const MainTitleExplain = section.querySelector("[data-main-explain-animation]");
    const MainTitleVideo = section.querySelector("[data-main-video-animation]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "75% center",
        toggleActions: "play none none none",

        onEnter: () => {
          document.documentElement.classList.remove("dark");
        },
        onLeave: () => {
          document.documentElement.classList.add("dark");
        },
        onEnterBack: () => {
          document.documentElement.classList.remove("dark");
        },
        onLeaveBack: () => {
          document.documentElement.classList.remove("dark");
        },
      },
    });

    tl.fromTo(
      SubTitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    )
      .from(title, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      })
      .fromTo(
        MainTitleLine,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .fromTo(
        MainTitleCulture,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        MainTitleVideo,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        MainTitleDescription,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .fromTo(
        MainTitleExplain,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        content.children,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  // useEffect(() => {
  //   const video01Container = document.querySelector("[data-main-video-animation01]");
  //   if (!video01Container) return;

  //   const video01 = video01Container.querySelector("video");
  //   if (!video01) return;

  //   let isReverse = false;

  //   const playVideo = (reverse: boolean = false) => {
  //     video01.currentTime = reverse ? video01.duration : 0;
  //     if (reverse) {
  //       const playBackwards: () => void = () => {
  //         if (video01.currentTime <= 0) {
  //           video01.removeEventListener("timeupdate", playBackwards);
  //           togglePlayDirection();
  //           return;
  //         }
  //         video01.currentTime -= 1 / 24; // 30fps로 더 자연스럽게 조정
  //       };
  //       video01.addEventListener("timeupdate", playBackwards);
  //     } else {
  //       video01.playbackRate = 1.0; // 정방향 재생 속도 정상화
  //       video01.play().then(() => {
  //         video01.addEventListener(
  //           "ended",
  //           () => {
  //             togglePlayDirection();
  //           },
  //           { once: true }
  //         );
  //       });
  //     }
  //   };

  //   const togglePlayDirection = () => {
  //     isReverse = !isReverse;
  //     playVideo(isReverse);
  //   };

  //   // 초기 재생 시작
  //   playVideo(false);

  //   return () => {
  //     video01.pause();
  //     video01.currentTime = 0;
  //     video01.removeEventListener("ended", togglePlayDirection);
  //   };
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white pt-40 pb-[150vh] dark:bg-black transition-all duration-700"
    >
      <div className="container max-w-[1700px] mx-auto">
        <div>
          <KAITitle title="K" subtitle="AI Lab" direction="left" className="mb-[5.5rem]" />
          <h2 ref={titleRef} className="text-[4.5rem] font-semibold leading-[1.12] tracking-[-0.01em] font-plus">
            AI That Understands
            <br />
            Korean <em className="inline-block w-16 h-[7px] bg-[#F82929] mb-4 mr-1" data-main-title-line-animation />
            <span className="inline-block" data-main-culture-animation>
              Culture
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-10 gap-8 items-center">
          <div className="col-span-3 space-y-6">
            <h3 className="text-[48px] font-semibold leading-[1.36] tracking-[-0.01em]" data-main-description-animation>
              글로벌 대비
              <br />
              7,200배 더 많은
              <br />
              한국어 학습량으로
            </h3>
            <p
              className="text-base font-medium leading-[1.86] tracking-[-0.01em] text-[#666666]"
              data-main-explain-animation
            >
              한국의 역사와 정서, 사회적 맥락은 물론, 일상 속에서 쓰이는 언어의
              <br />
              미묘한 표현까지 깊이 있게 학습한 한국형 AI입니다.
              <br />
              단어 하나에 담긴 의미의 결, 말투의 높낮이, 존댓말의 층위처럼 섬세한
              <br />
              언어 요소를 놓치지 않고 이해하며, 단순한 정보 전달을 넘어 사용자의
              <br />
              의도와 진심에 공감할 수 있는 응답을 만들어냅니다.
            </p>
          </div>

          <div className="col-span-4 relative max-w-[42.938rem] w-full h-[45.875rem]" data-main-video-animation>
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 w-full h-full" data-main-video-animation01>
                <video
                  src="/video/lab_video_reverse.mp4"
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="absolute top-0 left-0 w-full h-full" data-main-video-animation02>
                <video src="/video/lab_video.mp4" muted playsInline autoPlay className="w-full h-full object-cover" />
              </div> */}
            </div>
          </div>

          <div ref={contentRef} className="col-span-3 space-y-8">
            <StatCard title={"K-MMLU\nKorean Specific Subest"} value="55.21" increase="+0.58%" />
            <StatCard title={"HAE-RAE Bench:\nEvaluation of Korean Models"} value="84.14" increase="+23.37%" />
            <StatCard title={"KorNAT:\nCommon Knowledge Alignment"} value="70.16" increase="+83.18%" />
          </div>
        </div>
      </div>
    </section>
  );
}
