import { motion, Variants } from "framer-motion";
import React from "react";

interface DataPoint {
  size: string;
  percentage: number;
}

interface ComparisonGraphProps {
  midmData: DataPoint[];
  onnuriData: DataPoint[];
}

const ComparisonGraph: React.FC<ComparisonGraphProps> = ({ midmData, onnuriData }) => {
  const maxPercentage = 100;

  const animation1: Variants = {
    offscreen: { opacity: 0, y: 100 },
    onscreen: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div className="w-full h-full min-h-[480px] flex flex-col">
      <div className="relative h-[90%] flex flex-col flex-1">
        {/* Y-axis labels */}
        <div className="absolute left-0 h-full flex flex-col justify-between text-xl leading-0 font-black text-white">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Grid lines */}
        <div className="ml-20 w-full h-full flex flex-col justify-between absolute left-0 top-0 flex-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t-2 border-dashed border-white/30" />
          ))}
        </div>

        {/* Graph content */}
        <div className="ml-12 flex justify-between items-end flex-1 z-10 gap-36">
          {/* MI:DM Section */}
          <motion.div
            className="flex-1 flex items-end justify-end h-full relative"
            initial="offscreen"
            animate="onscreen"
            viewport={{
              amount: 0.8,
              once: true,
            }}
            variants={animation1}
          >
            {midmData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 -mb-9 ml-14"
                role="group"
                aria-label={`MI:DM ${item.size} model performance`}
              >
                <span className="text-lg font-semibold text-[#DFDFDF]">{item.percentage}%</span>
                <motion.div
                  className="w-16 bg-gradient-to-t from-[#474747] to-[#808080]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.percentage / maxPercentage) * 480}px` }}
                  transition={{ duration: 1, delay: index * 0.2, ease: "easeInOut" }}
                />
                <span className="text-sm mt-2">{item.size}</span>
              </div>
            ))}
            <div className="text-xl font-semibold absolute -bottom-22 left-1/2 translate-x-13">MI:DM</div>
          </motion.div>

          {/* Vertical divider */}
          <div className="w-px h-[90%] bg-gray-700 mx-8" style={{ opacity: 0.2 }} />

          {/* ONNURI Section */}
          <motion.div
            className="flex-1 flex items-end justify-start relative"
            initial="offscreen"
            animate="onscreen"
            viewport={{
              amount: 0.8,
              once: true,
            }}
            variants={animation1}
            transition={{ delay: midmData.length * 0.2 + 1 }}
          >
            {onnuriData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 -mb-9 mr-14"
                role="group"
                aria-label={`ONNURI ${item.size} model performance`}
              >
                <span className="text-lg font-semibold text-[#A3C3FF]">{item.percentage}%</span>
                <motion.div
                  className="w-16 bg-gradient-to-t from-[#00308B] to-[#B4CEFF]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.percentage / maxPercentage) * 480}px` }}
                  transition={{ duration: 1, delay: index * 0.2 + 1, ease: "easeInOut" }}
                />
                <span className="text-sm mt-2">{item.size}</span>
              </div>
            ))}
            <div className="text-xl font-semibold absolute -bottom-22 left-1/2 -translate-x-16">ONNURI</div>
          </motion.div>
        </div>
        <div className="h-[36.25rem] w-[1px] border border-dashed border-white/50 absolute left-[52%] top-0 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default ComparisonGraph;
