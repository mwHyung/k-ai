import React from "react";
import ComparisonGraph from "./ComparisonGraph";

const ModelComparison: React.FC = () => {
  const midmData = [
    { size: "2B", percentage: 18.6 },
    { size: "9B", percentage: 66.4 },
    { size: "32B", percentage: 79.5 },
  ];

  const onnuriData = [
    { size: "1B", percentage: 22.8 },
    { size: "8B", percentage: 60.3 },
    { size: "16B", percentage: 80.2 },
    { size: "32B", percentage: 90.4 },
  ];

  return <ComparisonGraph midmData={midmData} onnuriData={onnuriData} />;
};

export default ModelComparison;
