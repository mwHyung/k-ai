"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { TypingAnimation } from "../components/TypingAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const USER = {
  name: "Cian",
  plan: "Free 요금제",
  avatar: "/images/icons/slidebar_user.png", // 대체 이미지 경로
};

const exampleSlides = [
  { category: "여행", question: "로마 콜로세움 입장권 가격이\n랑 운영 시간 알려줘" },
  { category: "금융", question: "주식 투자 초보자가 알아야 할\n기본 지식은 뭐야?" },
  { category: "쇼핑", question: "20대 여자친구 생일 선물뭐가\n좋을까?" },
  { category: "비즈니스", question: "구글 애널리틱스(GA4)로 쇼핑\n몰 분석하는 방법 알려줘" },
  { category: "외국어", question: "미국 고객에게 사과할 때 어떤\n표현을 쓰는 게 좋아?" },
  { category: "생활", question: "집에서 할 수 있는 간단한 운동\n뭐가 있어?" },
  { category: "의료", question: "화상 입었을 때 응급처치는 어\n떻게 해야 하나요?" },
  { category: "여행", question: "로마 콜로세움 입장권 가격이\n랑 운영 시간 알려줘" },
  { category: "금융", question: "주식 투자 초보자가 알아야 할\n기본 지식은 뭐야?" },
  { category: "쇼핑", question: "20대 여자친구 생일 선물뭐가\n좋을까?" },
  { category: "비즈니스", question: "구글 애널리틱스(GA4)로 쇼핑\n몰 분석하는 방법 알려줘" },
  { category: "외국어", question: "미국 고객에게 사과할 때 어떤\n표현을 쓰는 게 좋아?" },
  { category: "생활", question: "집에서 할 수 있는 간단한 운동\n뭐가 있어?" },
  { category: "의료", question: "화상 입었을 때 응급처치는 어\n떻게 해야 하나요?" },
];

function ImageChange() {
  const [submitIcon, setSubmitIcon] = useState("/images/icons/submit_arrow.svg");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSubmitIcon("/images/icons/submit_stop.svg");
    }, 4800);

    const timer2 = setTimeout(() => {
      setSubmitIcon("/images/icons/submit.svg");
    }, 7200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return <Image src={submitIcon} alt="전송" width={36} height={36} />;
}

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState(-1);
  const [typingText, setTypingText] = useState("");
  const liRef = useRef<HTMLLIElement>(null);
  const liRef2 = useRef<HTMLLIElement>(null);

  const handleSelectedSlide = (slide: number) => {
    setSelectedSlide(slide);
  };

  const handleTyping = (text: string) => {
    setTypingText(text);
  };

  return (
    <main className="flex h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside
        className={`relative transition-all duration-300 bg-white border-r border-[#E5E5E5] flex flex-col justify-between
          ${sidebarOpen ? "w-[257px] min-w-[257px]" : "w-[76px] min-w-[76px] overflow-hidden"}`}
      >
        {/* 메뉴 토글 버튼 */}
        <button
          aria-label={sidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <Image src="/images/icons/sidebar.svg" alt="메뉴" width={24} height={24} />
        </button>
        <button
          aria-label={sidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setSidebarOpen((v) => !v)}
          className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center cursor-pointer transition-all ${
            sidebarOpen ? "opacity-100 duration-300 delay-300" : "opacity-0 duration-75 delay-0"
          }`}
        >
          <Image src="/images/icons/search.svg" alt="검색" width={24} height={24} />
        </button>
        {/* 사이드바 내용 */}
        <div
          className={`flex flex-col h-full justify-between pt-20 pb-6 px-4 transition-all ${
            sidebarOpen ? "opacity-100 visible duration-300 delay-300" : "opacity-0 invisible duration-75 delay-0"
          }`}
        >
          {/* 메뉴 리스트 */}
          <nav className="flex flex-col gap-3 pr-3 pl-1.5">
            <button className="flex items-center gap-3 pt-3 rounded-lg font-medium text-base leading-[1.25] uppercase text-[#222]">
              <Image src="/images/icons/sidebar_1.svg" alt="Onnuri" width={24} height={24} /> ONNURI
            </button>
            <button className="flex items-center gap-3 pt-3 rounded-lg font-medium text-base leading-[1.25] uppercase text-[#222]">
              <Image src="/images/icons/sidebar_2.svg" alt="Hanee" width={24} height={24} /> HANEE
            </button>
            <button className="flex items-center gap-3 pt-3 rounded-lg font-medium text-base leading-[1.25] uppercase text-[#222]">
              <Image src="/images/icons/sidebar_3.svg" alt="Daon" width={24} height={24} /> DAON
            </button>
            <p className="w-full h-[1px] bg-[#f3f3f3] my-3" />
            <button className="flex items-center gap-3 rounded-lg font-medium text-base leading-[1.25] uppercase text-[#222]">
              오늘의 발견
            </button>
            <button className="flex items-center gap-3 pt-3 rounded-lg font-medium text-base leading-[1.25] uppercase text-[#222]">
              지난 대화
            </button>
          </nav>
        </div>
        {/* 하단 프로필 */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mt-auto px-1.5 py-3">
            <Image src={USER.avatar} alt="프로필" width={40} height={40} className="rounded-full" />
            <div className="flex items-center justify-between w-full flex-1">
              <div>
                <div className="text-sm leading-[1.28] text-[#1c1c1c]">{USER.name}</div>
                <div className="text-xs text-[#8f8f8f] leading-[1.5]">{USER.plan}</div>
              </div>
              <Image src="/images/icons/arrow_down_gray.png" alt="화살표" width={10} height={6} />
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <section className="relative flex-1 flex flex-col items-center justify-center min-w-0">
        <Link href="/pc">
          <div className="absolute top-[31px] left-10 flex items-center gap-2.5">
            <h2 className="text-lg font-medium leading-[1] uppercase text-black">ONNURI</h2>
            <Image src="/images/icons/arrow_down_gray.png" alt="화살표" width={10} height={6} />
          </div>
        </Link>
        {/* Example Grid Swiper */}
        <div
          className={`relative w-full flex flex-col justify-center items-center py-20 mb-30 transition-all duration-500 delay-300 z-20 ${
            typingText ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <header className="w-full text-center">
            <h1 className="font-semibold text-[40px] text-black leading-[1] tracking-[-0.01em]">
              시안님, 무엇이든 물어보세요
            </h1>
          </header>
          <div className="relative w-full flex justify-center items-center py-20">
            <div className="w-[432px] h-[300px] rounded-xl bg-[linear-gradient(270deg,rgba(255,255,255,0.00)_0%,#FFF_100%)] absolute top-0 left-0 z-10" />
            <div className="w-full relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: ".button-prev",
                  nextEl: ".button-next",
                }}
                slidesPerView="auto"
                spaceBetween={16}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="relative chat-swiper h-[170px]"
              >
                {exampleSlides.map((slide, idx) => {
                  return (
                    <SwiperSlide
                      key={idx}
                      className="flex justify-center !w-[248px]"
                      onClick={() => handleSelectedSlide(idx)}
                    >
                      {slide ? (
                        <div
                          key={idx}
                          className={`flex items-center justify-center rounded-xl w-[248px] transition-all duration-300 cursor-pointer ${
                            selectedSlide === idx
                              ? "bg-[linear-gradient(119deg,#F00_14.34%,#2D3EFF_78.99%)] shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08)]"
                              : "bg-[#F7F9FB]"
                          }`}
                        >
                          <div
                            className={`w-full h-full flex flex-col py-7 px-5 rounded-xl m-[2px] ${
                              selectedSlide === idx ? "bg-white" : "bg-[#F7F9FB]"
                            }`}
                          >
                            <span className="font-bold text-[15px] text-black mb-1.5">{slide.category}</span>
                            <span className="text-[17px] text-[#333] leading-[1.48] tracking-[-0.01em] whitespace-pre-line">
                              {slide.question}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div key={idx} className="bg-transparent w-[243px]" />
                      )}
                    </SwiperSlide>
                  );
                })}
                {/* Custom navigation buttons */}
              </Swiper>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <button
                  className="button-prev absolute right-145 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center shadow hover:bg-gray-100 z-10 cursor-pointer"
                  aria-label="이전"
                >
                  <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="button-next absolute left-145 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center shadow hover:bg-gray-100 z-10 cursor-pointer"
                  aria-label="다음"
                >
                  <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-[432px] h-[300px] rounded-xl bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0.00)_100%)] absolute top-0 right-0 z-10" />
          </div>

          {/* 선택된 슬라이드 */}
          {selectedSlide > -1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-[432px] h-[300px] rounded-xl bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0.00)_100%)] absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/3 z-10"
            >
              <ul className="flex flex-col gap-3.5">
                <li
                  className="text-[#383838] text-[14px] font-normal leading-[100%] tracking-[-0.14px] pt-[15px] cursor-pointer"
                  onClick={() => handleTyping("GA4를 이용해서 쇼핑몰 데이터를 효과적으로 분석하려면 어떻게 해야 해?")}
                >
                  GA4를 이용해서 쇼핑몰 데이터를 효과적으로 분석하려면 어떻게 해야 해?
                </li>
                <li
                  className="text-[#383838] text-[14px] font-normal leading-[100%] tracking-[-0.14px] pt-[15px] border-t border-[#E9E9E9] cursor-pointer"
                  onClick={() => handleTyping("GA4 초보자도 이해할 수 있게 쇼핑몰 분석하는 방법 알려줘")}
                >
                  GA4 초보자도 이해할 수 있게 쇼핑몰 분석하는 방법 알려줘
                </li>
                <li
                  className="text-[#383838] text-[14px] font-normal leading-[100%] tracking-[-0.14px] pt-[15px] border-t border-[#E9E9E9] cursor-pointer"
                  onClick={() => handleTyping("GA4로 실제 쇼핑몰 매출이나 전환율을 분석하는 실용적인 방법을 알려줘")}
                >
                  GA4로 실제 쇼핑몰 매출이나 전환율을 분석하는 실용적인 방법을 알려줘
                </li>
                <li
                  className="text-[#383838] text-[14px] font-normal leading-[100%] tracking-[-0.14px] pt-[15px] border-t border-[#E9E9E9] cursor-pointer"
                  onClick={() => handleTyping("구글 애널리틱스 4로 어떤 지표를 보면 쇼핑몰 개선점을 알 수 있을까?")}
                >
                  구글 애널리틱스 4로 어떤 지표를 보면 쇼핑몰 개선점을 알 수 있을까?
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* 채팅 메시지 */}
        {typingText && (
          <motion.div className="w-full max-w-[766px] absolute top-[100px] left-1/2 -translate-x-1/2">
            <ul className="flex flex-col gap-2">
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4, ease: "easeInOut" }}
                className="w-fit flex items-center gap-2 bg-[#F7F9FB] rounded-[16px] px-6 py-4 self-end"
              >
                <span className="text-base text-black leading-[1.6] font-plus">{typingText}</span>
              </motion.li>
              <motion.li
                ref={liRef2}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  gsap.to(liRef2.current, {
                    opacity: 0,
                    display: "none",
                    duration: 0.4,
                    delay: 0.8,
                    ease: "easeInOut",
                  });
                }}
                className="w-fit flex items-center self-start mt-[21px]"
              >
                <span className="text-base text-[#666] font-medium leading-[1.3] tracking-[-0.02em] font-plus">
                  잠시만 기다려 주세요.
                </span>
              </motion.li>
              <motion.li
                ref={liRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  gsap.to(liRef.current, {
                    opacity: 0,
                    display: "none",
                    duration: 0.4,
                    delay: 0.8,
                    ease: "easeInOut",
                  });
                }}
                className="w-fit flex items-center self-start mt-[21px]"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((item, index) => (
                    <motion.span
                      key={item}
                      className="w-1.5 h-1.5 rounded-full bg-[#8F8F8F]"
                      initial={{ y: 0 }}
                      animate={{ y: -5 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.2,
                        delay: index * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.li>
              <motion.li className="w-fit flex flex-col items-start gap-8 self-start mt-[21px]">
                <motion.strong
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 4.6, ease: "easeInOut" }}
                  className="text-xl text-black font-bold leading-[1.6] tracking-[-0.01em]"
                >
                  1. GA4 쇼핑몰 분석, 기본 흐름
                </motion.strong>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 4.8, ease: "easeInOut" }}
                  className="text-base text-black leading-[1.6] tracking-[-0.01em]"
                >
                  쇼핑몰은 GA4에서 **“이커머스 이벤트”**를 기반으로 분석합니다. 즉, 고객 행동을 이벤트로 기록하고 → 그
                  데이터를 분석하는 구조입니다.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5.0, ease: "easeInOut" }}
                  className=""
                >
                  <p className="text-base text-black font-semibold leading-[1.6] tracking-[-0.01em]">필수 세팅</p>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center text-base text-black leading-[1.6] tracking-[-0.01em] before:content-[''] before:w-[3px] before:h-[3px] before:rounded-full before:bg-black before:mr-2">
                      GA4 기본 설치 완료
                    </li>
                    <li className="flex items-center text-base text-black leading-[1.6] tracking-[-0.01em] before:content-[''] before:w-[3px] before:h-[3px] before:rounded-full before:bg-black before:mr-2">
                      GA4에 이커머스(전자상거래) 기능 활성화
                    </li>
                    <li className="flex items-center text-base text-black leading-[1.6] tracking-[-0.01em] before:content-[''] before:w-[3px] before:h-[3px] before:rounded-full before:bg-black before:mr-2">
                      쇼핑몰 페이지에 GA4 이벤트 코드 연동 (gtag.js 또는 GTM)
                    </li>
                  </ul>
                </motion.div>
              </motion.li>
              <motion.li className="w-fit flex flex-col items-start gap-2 self-start mt-[42px] relative overflow-hidden">
                <motion.strong
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5.2, ease: "easeInOut" }}
                  className="text-xl text-black font-bold leading-[1.6] tracking-[-0.01em]"
                >
                  2. 이커머스 트래킹을 위해 필요한 이벤트
                </motion.strong>
                <motion.div
                  className="w-[300px] rounded-md border border-[#D1D1D1] overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5.4, ease: "easeInOut" }}
                >
                  <table className="w-full">
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <thead>
                      <tr className="border-b border-[#D1D1D1] bg-[#efefef]">
                        <th className="py-[5px] pl-[13px] text-[11px] text-black font-medium leading-[1.6] tracking-[-0.01em]">
                          이벤트명
                        </th>
                        <th className="py-[5px] pl-[13px] text-[11px] text-black font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          설명
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#D1D1D1]">
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em]">
                          view_item_list
                        </td>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          상품 리스트(카테고리) 조회
                        </td>
                      </tr>
                      <tr className="border-b border-[#D1D1D1]">
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em]">
                          add_to_cart
                        </td>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          상품 상세페이지 조회
                        </td>
                      </tr>
                      <tr className="border-b border-[#D1D1D1]">
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em]">
                          checkout
                        </td>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          장바구니 추가
                        </td>
                      </tr>
                      <tr className="border-b border-[#D1D1D1]">
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em]">
                          begin_checkout
                        </td>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          결제 시작 (구매폼 진입)
                        </td>
                      </tr>
                      <tr className="border-b border-[#D1D1D1]">
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em]">
                          add_payment_info
                        </td>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          주문 취소
                        </td>
                      </tr>
                      <tr>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em]">
                          purchase
                        </td>
                        <td className="py-[5px] pl-[13px] text-[11px] text-[#666] font-medium leading-[1.6] tracking-[-0.01em] border-l border-[#D1D1D1]">
                          최종 결제 완료
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
                <motion.strong
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5.6, ease: "easeInOut" }}
                  className="text-black text-base font-bold leading-[1.6] tracking-[-0.01em] mt-5"
                >
                  → 쇼핑몰에서는 이 6개 이벤트는 거의 필수로 잡아야 해요.
                </motion.strong>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5.8, ease: "easeInOut" }}
                  className="text-black text-base leading-[1.6] tracking-[-0.01em]"
                >
                  (자동으로 잡히지 않으니까 개발팀이나 GTM으로 직접 세팅해야 합니다.)
                </motion.p>

                <motion.div
                  initial={{ y: "0%" }}
                  animate={{ y: "100%" }}
                  transition={{ duration: 0.8, delay: 6.8, ease: "easeInOut" }}
                  className="w-full h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.20)_0%,#FFF_46.15%)] absolute top-0 left-0 z-10"
                />
              </motion.li>
            </ul>
          </motion.div>
        )}

        {/* Input */}
        <footer className="w-full max-w-[766px] absolute bottom-10 left-1/2 -translate-x-1/2 right-0 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)]">
          <form className="flex flex-col bg-white rounded-2xl border border-[rgba(13,13,13,0.1)] px-4 py-3 gap-2">
            {/* 좌측 아이콘 */}
            {typingText ? (
              <TypingAnimation text={typingText} />
            ) : (
              <input
                className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-gray-400 pt-2 pr-3 pb-4"
                placeholder="생각을 정리해 보세요"
                aria-label="메시지 입력"
              />
            )}
            {/* 전송 버튼 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center">
                  <Image src="/images/icons/plus.svg" alt="플러스" width={36} height={36} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center">
                  <Image src="/images/icons/web.svg" alt="웹" width={36} height={36} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center">
                  <Image src="/images/icons/attach.svg" alt="첨부" width={36} height={36} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center">
                  <Image src="/images/icons/image.svg" alt="이미지" width={36} height={36} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center">
                  <Image src="/images/icons/idea.svg" alt="아이디어" width={36} height={36} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center">
                  <Image src="/images/icons/mic.svg" alt="음성" width={36} height={36} />
                </button>
                {typingText ? (
                  <button className="w-9 h-9 flex items-center justify-center">
                    <ImageChange />
                  </button>
                ) : (
                  <button className="w-9 h-9 flex items-center justify-center">
                    <Image src="/images/icons/submit.svg" alt="전송" width={36} height={36} />
                  </button>
                )}
              </div>
            </div>
          </form>
        </footer>
      </section>
    </main>
  );
}
