import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SmoothScrollProps {
  children: React.ReactNode;
  onSectionChange?: (index: number) => void;
}

const SmoothScroll = ({ children, onSectionChange }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const isLastSection = useRef(false);
  const normalScrollSection = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = gsap.utils.toArray<HTMLElement>(".scroll-container");
    const totalSections = sections.length;

    // 일반 스크롤 섹션 참조 저장
    // normalScrollSection.current = document.querySelector(".relative.z-\\[14\\]");
    normalScrollSection.current = document.documentElement;

    const scrollToSection = (index: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      gsap.to(sections, {
        duration: 1,
        y: `${-100 * index}%`,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
          currentIndex.current = index;
          isLastSection.current = index === totalSections - 1;
          onSectionChange?.(index);
        },
      });
    };

    const isNormalScrollAtTop = () => {
      if (!normalScrollSection.current) return false;

      // 스크롤 위치가 정확히 0이거나 매우 작은 값일 때 (브라우저 반올림 고려)
      const scrollTop = normalScrollSection.current.scrollTop;
      return scrollTop <= 1;
    };

    const handleWheel = (e: WheelEvent) => {
      // 마지막 섹션이고 아래로 스크롤하는 경우
      if (isLastSection.current && e.deltaY > 0) {
        return;
      }

      // 일반 스크롤 영역에서 위로 스크롤하는 경우
      if (currentIndex.current === totalSections - 1) {
        if (e.deltaY < 0 && isNormalScrollAtTop()) {
          e.preventDefault();
          scrollToSection(totalSections - 2);
        }
        return;
      }

      e.preventDefault();
      if (isAnimating.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      let nextIndex = currentIndex.current + direction;

      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= totalSections) nextIndex = totalSections - 1;

      if (nextIndex !== currentIndex.current) {
        scrollToSection(nextIndex);
      }
    };

    let touchStartY = 0;
    let lastTouchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const diff = touchStartY - touchCurrentY;
      const moveDiff = lastTouchY - touchCurrentY;
      lastTouchY = touchCurrentY;

      const threshold = 50;

      // 마지막 섹션이고 아래로 스와이프하는 경우
      if (isLastSection.current && diff > 0) {
        return;
      }

      // 일반 스크롤 영역에서 위로 스와이프하는 경우
      if (currentIndex.current === totalSections - 1) {
        if (diff < 0 && isNormalScrollAtTop() && Math.abs(moveDiff) > 1) {
          e.preventDefault();
          scrollToSection(totalSections - 2);
        }
        return;
      }

      e.preventDefault();
      if (isAnimating.current) return;

      if (Math.abs(diff) > threshold) {
        const direction = diff > 0 ? 1 : -1;
        let nextIndex = currentIndex.current + direction;

        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= totalSections) nextIndex = totalSections - 1;

        if (nextIndex !== currentIndex.current) {
          scrollToSection(nextIndex);
          touchStartY = touchCurrentY;
        }
      }
    };

    // 초기 스타일 설정
    gsap.set(sections, {
      y: (i) => (i === 0 ? "0%" : "100%"),
    });

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onSectionChange]);

  return (
    <div ref={containerRef} className="scroll-wrapper relative h-screen overflow-hidden">
      {children}
    </div>
  );
};

export default SmoothScroll;
