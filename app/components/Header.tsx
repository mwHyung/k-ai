"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isSubPage = pathname?.startsWith("/onnuri");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Add fade-down after 4 seconds with smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-[0.813rem] transition-all duration-700 ease-in-out
      ${isScrolled && !isSubPage ? "bg-white/75 backdrop-blur-[50px] dark:bg-black/75" : "bg-transparent"}
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
    >
      <div className="container max-w-[1920px] mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center transition-transform duration-300 hover:scale-105">
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
            href="/onnuri"
            className="text-[1.063rem] font-semibold uppercase transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            Model
          </Link>
          <Link
            href="/agent"
            className="text-[1.063rem] font-semibold uppercase transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            Agent
          </Link>
          <Link
            href="/rai"
            className="text-[1.063rem] font-semibold uppercase transition-all duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 hover:-translate-y-0.5"
          >
            RAI
          </Link>
          <Link
            href="/experience"
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
