"use client";

import Image from "next/image";
import Link from "next/link";

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
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="flex flex-col gap-8">
    <h3 className="text-lg font-semibold leading-[1.3] uppercase">{title}</h3>
    <div className="flex flex-col gap-[22px]">
      {links.map((link) => (
        <FooterLink key={link.label} href={link.href} className="text-[#333333] text-[15px] leading-[1.3] uppercase">
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
  return (
    <footer className="bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-[3.75rem]">
          <Image src="/images/LOGO.svg" alt="KT AI" width={54} height={21} />
          <button className="flex items-center gap-2 text-[15px] font-semibold leading-[1.3] tracking-[-0.02em]">
            패밀리 사이트
            <Image src="/images/icons/chevron_down.svg" alt="" width={24} height={24} />
          </button>
        </div>
        <div className="flex justify-between pb-[5.625rem]">
          {footerColumns.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
          <div className="flex items-center gap-0.5">
            <Link href="#" className="text-lg font-semibold leading-[1.3]">
              Experience
            </Link>
            <Image src="/images/icons/arrow_up_right.svg" alt="" width={24} height={24} />
          </div>
        </div>
        <div className="h-px bg-[#EAEAEA]" />
        <div className="flex items-center justify-between py-8">
          <div className="flex items-center gap-3">
            <FooterLink href="#" className="text-[#333333] font-semibold">
              개인정보처리방침
            </FooterLink>
            <div className="w-px h-3 bg-[#E6E6E6]" />
            <FooterLink href="#" className="text-[#666666]">
              이용약관
            </FooterLink>
            <div className="w-px h-3 bg-[#E6E6E6]" />
            <FooterLink href="#" className="text-[#666666]">
              제휴
            </FooterLink>
            <div className="w-px h-3 bg-[#E6E6E6]" />
            <FooterLink href="#" className="text-[#666666]">
              문의
            </FooterLink>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 transition-colors"
                aria-label={link.label}
              >
                <Image src={link.icon} alt="" width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
        <div className="pb-8">
          <p className="text-sm leading-[1.32] text-[#888888]">ⓒ KT Corp.</p>
        </div>
      </div>
    </footer>
  );
}
