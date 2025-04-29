"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-blue-500 to-purple-500">
          <h1 className="text-6xl font-bold text-white text-center pt-32">Parallax Effect</h1>
        </div>
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
