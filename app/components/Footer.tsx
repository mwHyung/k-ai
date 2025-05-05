"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink = ({ href, children, className = "" }: FooterLinkProps) => (
  <Link href={href} className={`text-sm leading-[1.32] hover:text-black transition-colors ${className}`}>
    {children}
  </Link>
);

interface FooterColumnProps {
  title: string;
  links: { href: string; label: string }[];
  isSubPage: boolean;
}

const FooterColumn = ({ title, links, isSubPage }: FooterColumnProps) => (
  <div className="flex flex-col gap-8">
    <h3 className="text-lg font-semibold leading-[1.3] uppercase">{title}</h3>
    <div className="flex flex-col gap-[22px]">
      {links.map((link) => (
        <FooterLink
          key={link.label}
          href={link.href}
          className={`text-[#333333] text-[15px] leading-[1.3] uppercase ${isSubPage ? "text-white" : ""}`}
        >
          {link.label}
        </FooterLink>
      ))}
    </div>
  </div>
);

const socialLinks = [
  { icon: "/images/icons/instagram.svg", href: "#", label: "Instagram" },
  { icon: "/images/icons/facebook.svg", href: "#", label: "Facebook" },
  { icon: "/images/icons/x.svg", href: "#", label: "X" },
  { icon: "/images/icons/youtube.svg", href: "#", label: "YouTube" },
  { icon: "/images/icons/blog.svg", href: "#", label: "Blog" },
];

const footerColumns = [
  {
    title: "Model",
    links: [
      { href: "#", label: "Onnuri" },
      { href: "#", label: "Hanee" },
      { href: "#", label: "Daon" },
    ],
  },
  {
    title: "Agent",
    links: [
      { href: "#", label: "Nuribot" },
      { href: "#", label: "Maru" },
      { href: "#", label: "Sena" },
    ],
  },
  {
    title: "RAI",
    links: [],
  },
  {
    title: "Blog & News",
    links: [
      { href: "#", label: "Use Case" },
      { href: "#", label: "Latest news" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isSubPage = pathname?.startsWith("/onnuri");

  return (
    <footer className={`relative z-[100] ${isSubPage ? "bg-black" : "bg-white"}`}>
      <div className={`px-10 pt-[3.313rem] border-t ${isSubPage ? "border-white/40" : " border-[#EAEAEA]"}`}>
        <div className="flex items-start">
          <Image
            src={`${isSubPage ? "/images/logo_white.png" : "/images/logo.svg"}`}
            alt="KT AI"
            width={54}
            height={21}
          />
          <div className="flex flex-col gap-4 ml-[14.688rem]">
            <div className="flex items-start gap-[5.75rem] mb-[5rem]">
              {footerColumns.map((column) => (
                <FooterColumn key={column.title} {...column} isSubPage={isSubPage} />
              ))}
              <div className="flex items-center gap-0.5">
                <Link href="/pc/chat" className="text-lg font-semibold leading-[1.3]">
                  Experience
                </Link>
                <Image
                  src={`${isSubPage ? "/images/icons/arrow_up_right_white.png" : "/images/icons/arrow_up_right.svg"}`}
                  alt=""
                  width={16}
                  height={16}
                  className="-mt-1"
                />
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-[15px] font-semibold leading-[1.3] tracking-[-0.02em] ml-auto">
            패밀리 사이트
            <Image
              src={`${isSubPage ? "/images/icons/chevron_down_white.png" : "/images/icons/chevron_down.svg"}`}
              alt=""
              width={17}
              height={17}
            />
          </button>
        </div>
        <div className="flex items-start justify-between pb-[5.625rem] ml-[18.063rem]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FooterLink href="#" className={`text-[#333333] font-semibold ${isSubPage ? "text-white" : ""}`}>
                개인정보처리방침
              </FooterLink>
              <div className="w-px h-3 bg-[#E6E6E6]" />
              <FooterLink href="#" className={`text-[#666666] ${isSubPage ? "text-white" : ""}`}>
                이용약관
              </FooterLink>
              <div className="w-px h-3 bg-[#E6E6E6]" />
              <FooterLink href="#" className={`text-[#666666] ${isSubPage ? "text-white" : ""}`}>
                제휴
              </FooterLink>
              <div className="w-px h-3 bg-[#E6E6E6]" />
              <FooterLink href="#" className={`text-[#666666] ${isSubPage ? "text-white" : ""}`}>
                문의
              </FooterLink>
            </div>
            <div className="pb-8">
              <p className={`text-sm leading-[1.32] ${isSubPage ? "text-white" : "text-[#888888]"}`}>ⓒ KT Corp.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 transition-colors ${
                  isSubPage ? "text-white" : ""
                }`}
                aria-label={link.label}
              >
                <Image
                  src={`${isSubPage ? link.icon.replace(".svg", "_white.png") : link.icon}`}
                  alt=""
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
