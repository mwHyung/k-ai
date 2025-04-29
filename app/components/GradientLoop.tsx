"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const GradientLoop = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(containerRef.current, {
      backgroundImage: "linear-gradient(45deg, rgb(148, 187, 233), rgb(180, 174, 238))",
      duration: 2,
      ease: "none",
    })
      .to(containerRef.current, {
        backgroundImage: "linear-gradient(45deg, rgb(180, 174, 238), rgb(238, 174, 202))",
        duration: 2,
        ease: "none",
      })
      .to(containerRef.current, {
        backgroundImage: "linear-gradient(45deg, rgb(238, 174, 202), rgb(148, 187, 233))",
        duration: 2,
        ease: "none",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: "linear-gradient(45deg, rgb(238, 174, 202), rgb(148, 187, 233))",
      }}
    >
      <div className="text-center">
        <h2 className="text-6xl font-bold text-white mb-4">Gradient Animation</h2>
        <p className="text-xl text-white opacity-80">Watch the background colors smoothly transition</p>
      </div>
    </section>
  );
};

export default GradientLoop;
