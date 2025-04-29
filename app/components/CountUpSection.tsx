"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountUpSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("countup-section");
      if (!element) return;

      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="countup-section"
      className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {[
          { end: 1234, label: "Happy Clients" },
          { end: 567, label: "Projects Completed" },
          { end: 890, label: "Lines of Code" },
        ].map((item, index) => (
          <div key={index} className="text-white">
            <div className="text-6xl font-bold mb-4">
              {isVisible && <CountUp end={item.end} duration={2.5} separator="," />}
            </div>
            <div className="text-xl">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountUpSection;
