"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GsapAnimation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.from(text, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-black flex items-center justify-center">
      <div ref={textRef} className="text-white text-center">
        <h2 className="text-6xl font-bold mb-4">GSAP Animation</h2>
        <p className="text-xl">Scroll to see the animation</p>
      </div>
    </section>
  );
};

export default GsapAnimation;
