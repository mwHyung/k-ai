"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isSubPage = pathname?.startsWith("/pc/sub");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isSubPage) {
        // 서브 페이지에서의 스크롤 방향에 따른 헤더 표시/숨김
        if (currentScrollY > lastScrollY.current) {
          // 아래로 스크롤
          setIsHeaderVisible(false);
        } else {
          // 위로 스크롤
          setIsHeaderVisible(true);
        }
        lastScrollY.current = currentScrollY;
      } else {
        // Add fade-down after 4 seconds with smooth animation
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 4000);
        return () => clearTimeout(timer);
      }

      setIsScrolled(currentScrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    if (!isSubPage) {
      // Only set timer for main page
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSubPage]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-[0.813rem] transition-all duration-700 ease-in-out
        // 메인 스크롤 시 배경 투명도 조절
      ${isScrolled && !isSubPage ? "bg-white/75 backdrop-blur-[50px] dark:bg-black/75" : "bg-transparent"}
      // 서브 페이지 스크롤 시 배경 색상 조절 
      ${isSubPage && isScrolled ? "!bg-black" : ""}
      // 메인 페이지에서 헤더 표시/숨김
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
      // 서브 페이지에서 헤더 표시/숨김
      ${isSubPage && !isHeaderVisible ? "!-translate-y-full" : "!translate-y-0"}
      ${isSubPage ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container max-w-[1920px] mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/pc" className="relative flex items-center transition-transform duration-300 hover:scale-105">
          <div className="w-[5.625rem] h-[1.875rem] relative">
            <div className="absolute top-0 left-0 w-[1.875rem] h-[1.875rem]" />
            <Image
              src={`${isSubPage ? "/images/logo_white.png" : "/images/logo.svg"}`}
              alt="K-AI Logo"
              width={54}
              height={21}
              className="absolute top-0 left-0 dark:invert"
            />
          </div>
        </Link>
        {/* Navigation */}
        <nav className="flex items-center gap-12">
          <Link
            href="/pc/sub"
            className="text-[1.063rem] font-semibold uppercase transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            Model
          </Link>
          <Link
            href="#"
            className="text-[1.063rem] font-semibold uppercase transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            Agent
          </Link>
          <Link
            href="#"
            className="text-[1.063rem] font-semibold uppercase transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            RAI
          </Link>
          <Link
            href="/pc/chat"
            className="flex items-center gap-0.5 text-[1.063rem] font-semibold transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            Experience
            <Image
              src={`${isSubPage ? "/images/icons/arrow_up_right_white.png" : "/images/icons/arrow_up_right.svg"}`}
              alt="External Link"
              width={16}
              height={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:invert"
            />
          </Link>
        </nav>
        {/* Right Section */}
        <div className="flex items-center gap-6">
          <button className="flex items-center justify-center w-6 h-6 transition-transform duration-300 hover:rotate-180">
            <Image
              src={`${isSubPage ? "/images/icons/globe_white.png" : "/images/icons/globe.svg"}`}
              alt="Language"
              width={24}
              height={24}
              className="dark:invert"
            />
          </button>
          <Link
            href="/login"
            className={`px-[1.125rem] py-2.5 dark:bg-white dark:text-black rounded-full text-sm font-semibold transition-all duration-300 hover:bg-gray-900 dark:hover:bg-gray-100 hover:scale-105 active:scale-95 ${
              isSubPage ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
