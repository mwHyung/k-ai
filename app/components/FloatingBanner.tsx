"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FloatingBannerProps {
  device: "pc" | "mobile";
}

const FloatingBanner = ({ device }: FloatingBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottom, setBottom] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = 467; // 푸터의 대략적인 높이
      const scrollBottom = scrollPosition + windowHeight;
      const distanceFromBottom = documentHeight - scrollBottom;

      // 푸터와의 거리에 따라 위치 조정
      if (distanceFromBottom < footerHeight) {
        setBottom(true);
      } else {
        setBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`left-1/2 -translate-x-1/2 z-50 rounded-full transition-all duration-300 ${
        isVisible ? "w-[296px]" : "w-[240px]"
      } ${bottom ? "absolute bottom-14" : "fixed bottom-[5.813rem]"}
      ${device === "mobile" ? "!absolute !bottom-8" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Ask K-ON"
    >
      <div className="border-gradient-primary transform transition-all duration-500">
        <div
          className={`flex items-center justify-between gap-2 rounded-full m-0.5 pl-6 pr-2 py-[2px] bg-white cursor-pointer border-4 border-transparent transition-all duration-300`}
          style={{
            boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.12)",
          }}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Ask K-ON"
        >
          <span className="text-[#333333] text-sm font-normal">
            {isVisible ? <span className="w-[1px] h-4 bg-[#333333] block text-blink" /> : "무엇이든 물어보세요!"}
          </span>
          {isVisible ? (
            <div className="relative h-9 w-9 rounded-full bg-[#333333] flex items-center justify-center">
              <div className="flex gap-0.5">
                <Image src={`/images/icons/voice_icon_2.gif`} alt="" width={23} height={23} className="voice-icon" />
              </div>
            </div>
          ) : (
            <Image src={`/images/icons/voice_icon_1.svg`} alt="" width={36} height={36} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingBanner;
