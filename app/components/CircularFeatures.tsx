import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const containerVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.8,
    },
  },
};

const lineVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 0.3,
    transition: {
      duration: 1.2,
    },
  },
};

const imageVariants = {
  offscreen: {
    opacity: 0,
    rotate: -180,
  },
  onscreen: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 100,
      damping: 15,
      opacity: { duration: 1.2 },
    },
  },
};

const textVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 2,
    },
  },
};

const CircularFeatures: React.FC = () => {
  return (
    <div className="relative mx-auto">
      <motion.div
        className="w-[1273px] h-[543px]"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{
          amount: "all",
          once: true,
        }}
        variants={containerVariants}
      >
        <motion.div className="absolute top-0 right-0 w-full h-full z-10" variants={lineVariants}>
          <Image
            className="w-full h-full"
            src="/images/sub/sub_con08.png"
            width={1273}
            height={543}
            alt="Circular Features"
          />
        </motion.div>
        {/* Background image with rotation animation */}
        <motion.div
          className="absolute top-[55%] left-1/2 -translate-x-69 -translate-y-1/2 w-[550px] h-[550px]"
          variants={imageVariants}
        >
          <Image
            className="w-full h-full"
            src="/images/sub/sub_con07.png"
            width={550}
            height={550}
            alt="Circular Features"
          />
        </motion.div>
        <motion.div className="absolute top-0 left-0 w-full h-full z-10" variants={textVariants}>
          <div className="w-[600px] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-suit text-[22px] font-extrabold leading-[100%] uppercase">
            <p className="absolute top-2 -left-17">Advanced Technology</p>
            <p className="absolute top-2 -right-44">Performance Boost</p>
            <p className="absolute -bottom-12 -left-5">Processing</p>
            <p className="absolute -bottom-12 -right-16">Scalability</p>
          </div>
          <div className="w-[300px] h-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-suit text-[20px] font-semibold leading-[120%] tracking-[-0.6px]">
            <p className="absolute -top-8 left-1/2 -translate-x-1/2">Adaptability</p>
            <p className="absolute top-14 left-1/2 -translate-x-1/2">
              Optimized
              <br />
              Efficiency
            </p>
            <p className="absolute top-36 -left-25">
              Innovation <br />
              in AI
            </p>
            <p className="absolute top-36 -right-25">
              High
              <br />
              Scalability
            </p>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2">
              Accuracy
              <br />
              Enhancement
            </p>
            <p className="whitespace-nowrap absolute -bottom-14 left-1/2 -translate-x-1/2">Robust Performance</p>
          </div>
          <div className="w-[180px] h-[100px] absolute top-1/2 left-6 -translate-y-1/2 font-suit text-[20px] font-semibold leading-[120%] tracking-[-0.6px]">
            <p className="absolute top-2 left-0">AI Expertise</p>
            <p className="absolute top-30 left-0">Precision</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CircularFeatures;
