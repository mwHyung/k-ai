"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import KAITitle from "./kAITitle";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ChatBubbleProps {
  text: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
  return (
    <div className="flex shrink-0 rounded-lg" data-chat-bubble-animation>
      <div className="bg-[#8B8B8B]/60 backdrop-blur-[12px] rounded-lg" data-chat-bubble-animation-text>
        <p
          className="text-base font-medium leading-[1.86] tracking-[-0.01em] text-white whitespace-pre-line px-8 py-[1.375rem] transition-all duration-500"
          data-chat-bubble-animation-text-content
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default function KExperienceDemo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("[data-title-animation]");
    const leftSlide = section.querySelector("[data-left-slide-animation]");
    const rightSlide = section.querySelector("[data-right-slide-animation]");
    const chatBubble = section.querySelectorAll("[data-chat-bubble-animation]");
    const chatBubbleText = section.querySelectorAll("[data-chat-bubble-animation-text]");
    const chatBubbleTextContent = section.querySelectorAll("[data-chat-bubble-animation-text-content]");
    const chatWrapper = section.querySelector("[data-chat-wrapper-animation]");
    const chatArea = section.querySelector("[data-chat-area-animation]");
    const chatTextOne = section.querySelector("[data-chat-text-one-animation]");
    const chatTextTwo = section.querySelector("[data-chat-text-two-animation]");
    const chatTextThree = section.querySelector("[data-chat-text-three-animation]");
    const chatTextFour = section.querySelector("[data-chat-text-four-animation]");
    const chatTextFive = section.querySelector("[data-chat-text-five-animation]");
    const chatTextSix = section.querySelector("[data-chat-text-six-animation]");
    const chatTextSeven = section.querySelector("[data-chat-text-seven-animation]");
    const chatTextThreeCircle = section.querySelectorAll("[data-chat-text-three-animation-circle]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "40% center",
        end: "bottom center",
        toggleActions: "play none none none",

        onEnter: () => {
          document.documentElement.classList.add("dark");
        },
        onLeave: () => {
          document.documentElement.classList.remove("dark");
        },
        onEnterBack: () => {
          document.documentElement.classList.add("dark");
        },
        onLeaveBack: () => {
          document.documentElement.classList.remove("dark");
        },
      },
    });

    gsap.set(title, {
      opacity: 1,
      y: 0,
    });

    tl.fromTo(
      leftSlide,
      {
        xPercent: 100,
      },
      {
        xPercent: 0,
        duration: 5,
        ease: "power3.out",
      }
    )
      .fromTo(
        rightSlide,
        {
          xPercent: -110,
        },
        {
          xPercent: -7,
          duration: 5,
          ease: "power3.out",
        },
        "-=5"
      )
      .to(chatBubble[9], {
        padding: "3px",
        background:
          "linear-gradient(90deg, #FF0347 0%, #11299A 20.67%, #0854FF 33.17%, #FDFFFF 42.08%, #C9FDFF 49.98%, #0847F1 71.97%, #ED3ACE 85.14%, #FF0347 100%)",
      })
      .to(
        chatBubbleText[9],
        {
          background: "black",
        },
        "-=1"
      )
      .to(
        chatBubbleTextContent[9],
        {
          fontSize: "26px",
        },
        "-=1"
      )
      .to(chatWrapper, {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      })
      .fromTo(
        chatArea,
        {
          yPercent: 100,
        },
        {
          yPercent: -4,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        chatTextOne,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .fromTo(
        chatTextTwo,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .fromTo(
        chatTextThree,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        "-=0.5"
      )
      .fromTo(
        chatTextFour,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: -40,
          duration: 1,
          delay: 3,
        }
      )
      .fromTo(
        chatTextFive,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: -32,
          duration: 1,
        }
      )
      .fromTo(
        chatTextSix,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: -32,
          duration: 1,
        }
      )
      .fromTo(
        chatTextSeven,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: -30,
          duration: 1,
        }
      );

    chatTextThreeCircle.forEach((circle, index) => {
      tl.fromTo(
        circle,
        {
          y: -5,
        },
        {
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.2,
        },
        index * 0.2
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const chatBubbles = [
    "대학 입시를 위한 어휘 공부를 도와줘",
    "우리 동네 편의시설 알려줘",
    "간편 김장법",
    "생선성 향상을 위한 아침 루틴 만들기",
    "왜 아침형 인간이어야 되?",
    "휴식 알림 1시간 마다 해줘",
    "사업설명서 작성하는 방법",
    "이메일 보고서 Python 스크립트 작성",
    "세금계산서 작성하는 방법",
    "경복궁을 외국인에게 소개해줘",
    "글쓰기 브레인스토밍 같이해",
    "프로그래밍 설계하는 방법",
    "오늘 날씨 어때?",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative max-h-[60.188rem] bg-black pt-[8.125rem] pb-[3.25rem] overflow-hidden mt-52"
    >
      <div className="absolute inset-0">
        <video
          src="/video/k_inspiration_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[28vw] object-cover object-bottom bottom-0 absolute"
        />
      </div>
      <div className="absolute left-0 top-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent z-10 w-[29.5rem] h-full" />
      <div className="absolute right-0 top-0 bg-gradient-to-l from-black/100 via-black/60 to-transparent z-10 w-[29.5rem] h-full" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-[7.5rem]">
          <KAITitle title="K" subtitle="Experience" direction="center" className="mb-10" color="white" />
          <h2 className="text-[4.5rem] font-semibold leading-[1.12] tracking-[-0.01em] font-plus text-white mb-8">
            Spark inspiration. Unlock ideas.
            <br />
            Make it happen.
          </h2>
          <p className="text-lg leading-[1.86] tracking-[-0.01em] text-white">
            영감을 얻고, 아이디어를 떠올리며, 원하는 결과를 만들어보세요
          </p>
        </div>

        <div className="flex flex-col gap-3.5" data-chat-wrapper-animation>
          <div className="flex gap-3.5" data-left-slide-animation>
            {chatBubbles.slice(0, 6).map((text, index) => (
              <ChatBubble key={index} text={text} />
            ))}
          </div>
          <div className="flex items-center gap-3.5 mb-[8.688rem]" data-right-slide-animation>
            {chatBubbles.slice(6, 13).map((text, index) => (
              <ChatBubble key={index} text={text} />
            ))}
          </div>
        </div>

        <div className="flex justify-center relative z-[51]">
          <Link href="/onnuri">
            <button className="inline-flex items-center gap-2 pl-10 pr-8 py-6 border border-[#AAAAAA] rounded-full text-white hover:bg-white/10 transition-colors">
              <span className="text-lg font-semibold leading-[1.3] tracking-[-0.01em]">K-AI 체험하러 가기</span>
              <Image src="/images/icons/arrow_right_white.svg" alt="arrow-right" width={20} height={20} />
            </button>
          </Link>
        </div>
      </div>

      {/* chat area */}
      <div
        className="absolute bottom-0 left-0 w-full h-full z-50 flex items-center justify-center"
        data-chat-area-animation
      >
        <div className="container w-[1120px] h-[675px] mx-auto px-4 pb-[2.125rem] bg-white rounded-3xl overflow-hidden flex flex-col justify-between">
          {/* chat header */}
          <div className="relative px-6 pt-4 flex items-center justify-between mb-11">
            <Image
              src="/images/logo_gray.svg"
              alt="k-experience-demo-bg"
              width={36}
              height={14}
              className="object-cover"
            />
            <p className="flex items-center gap-2">
              Onnuri <Image src="/images/icons/arrow_down_gray.svg" alt="arrow-down" width={8} height={8} />
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Image src="/images/icons/sun.svg" alt="sun" width={32} height={32} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors mr-2">
                <Image src="/images/icons/moon.svg" alt="moon" width={32} height={32} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Image src="/images/icons/setting.svg" alt="setting" width={32} height={32} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Image src="/images/icons/user.svg" alt="user" width={32} height={32} />
              </button>
            </div>
          </div>

          {/* chat text */}
          <div className="flex flex-col gap-2 flex-1 ">
            <div className="flex items-center justify-end mx-20 mb-0.5" data-chat-text-one-animation>
              <div className="flex items-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#f3f3f3]">
                <p className="text-base font-medium leading-[1.3] tracking-[-0.02em] text-[#333333]">
                  경복궁을 외국인에게 소개해줘
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start mx-20" data-chat-text-two-animation>
              <div className="flex items-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#f9f9f9]">
                <p className="text-base font-medium leading-[1.3] tracking-[-0.02em] text-[#333333]">잠시만 기다려</p>
              </div>
            </div>
            <div className="flex items-center justify-start mx-20" data-chat-text-three-animation>
              <div className="flex items-center gap-2 px-4 py-3.5 rounded-[12px]">
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((item, index) => (
                    <svg
                      key={item}
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      data-chat-text-three-animation-circle
                      style={{
                        animationDelay: `${index * 0.3}s`,
                        animation: "pulse 1s infinite",
                      }}
                    >
                      <circle cx="2.66634" cy="2.99984" r="2.33333" fill="#8F8F8F" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start mx-20" data-chat-text-four-animation>
              <div className="flex items-center gap-2 px-6 py-3.5 rounded-[12px] bg-white border border-[#e3e3e3]">
                <p className="text-base font-medium leading-[1.3] tracking-[-0.02em] text-[#333333]">
                  “Gyeongbokgung is the main royal palace of Korea’s Joseon Dynasty. It represents the history,
                  <br />
                  aresilience, and beauty of Korea — a must-visit if you want to truly feel Korean heritage.”
                  <br />
                  <strong>Tip</strong> : Don’t miss the “Gwanghwamun Gate” and “Geunjeongjeon Hall,” two of the most
                  iconic spots inside!
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start mx-20 gap-2">
              <div
                className="flex items-center gap-2 p-1.5 rounded-[12px] bg-white border border-[#e3e3e3]"
                data-chat-text-five-animation
              >
                <Image src="/images/chat_1.png" alt="chat_1" width={206} height={128} />
              </div>
              <div
                className="flex items-center gap-2 p-1.5 rounded-[12px] bg-white border border-[#e3e3e3]"
                data-chat-text-six-animation
              >
                <Image src="/images/chat_2.png" alt="chat_2" width={121} height={128} />
              </div>
            </div>
            <div className="flex items-center justify-start mx-20" data-chat-text-seven-animation>
              <div className="flex items-center gap-2 py-3.5 bg-white">
                <p className="text-base font-medium leading-[1.3] tracking-[-0.02em] text-[#333333]">
                  필요하면 **포멀한 버전(공식 가이드북 느낌)**이나, **친근한 말투(외국인 친구에게 말하듯)**로 바꿔서도
                  소개해줄게!
                </p>
              </div>
            </div>
          </div>

          {/* chat input */}
          <div className="flex items-center justify-between py-3 rounded-full bg-[#f3f3f3] p-3 mx-20">
            <div className="flex items-center gap-2">
              <button className="rounded-full flex items-center justify-center hover:bg-white/10 transition-colors p-2">
                <Image src="/images/icons/add.svg" alt="voice" width={24} height={24} />
              </button>
              <p className="text-sm leading-[1.5] text-[#999999]">생각을 정리하고 싶다면, 여기에 적어보세요…</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Image src="/images/icons/voice.svg" alt="voice" width={36} height={36} />
              </button>
              <button className="rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Image src="/images/icons/up.svg" alt="mic" width={36} height={36} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
