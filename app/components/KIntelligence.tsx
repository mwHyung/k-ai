"use client";

import Image from "next/image";
import KAITitle from "./kAITitle";

const KIntelligence = () => {
  const items = [
    { number: "01", title: "DNA" },
    { number: "02", title: "빅데이터" },
    { number: "03", title: "팔만대장경" },
    { number: "04", title: "끝판왕" },
    { number: "05", title: "K라는 이름" },
    { number: "06", title: "가장 빛나게" },
  ];

  return (
    <section className="relative flex w-full min-h-screen bg-white pt-[8.438rem] pb-[8.313rem]">
      {/* Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <div className="relative">
          {/* Circular Images */}
          <div className="absolute -top-3 left-1/2 -translate-x-5/7 w-[14.125rem] h-[7rem] rounded-[9999px] overflow-hidden">
            <video src="/video/intelligence_1.mp4" autoPlay muted loop />
          </div>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pr-[10rem]">
            <Image
              src="/images/k-intelligence/image-2.png"
              alt="Circular Image 2"
              width={112}
              height={112}
              className="rounded-full"
            />
          </div>
          <div className="absolute top-1/2 right-[calc(50%-19rem)] -translate-y-1/2">
            <Image
              src="/images/k-intelligence/image-3.png"
              alt="Circular Image 3"
              width={226}
              height={112}
              className="rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-[calc(50%-3.5rem)] translate-y-1">
            <Image
              src="/images/k-intelligence/image-4.png"
              alt="Circular Image 4"
              width={226}
              height={112}
              className="rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 translate-x-68 translate-y-2">
            <Image
              src="/images/k-intelligence/image-5.svg"
              alt="Circular Image 5"
              width={112}
              height={112}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col gap-[3.125rem] min-w-[50.875rem]">
            <div className="flex items-center justify-between">
              {items.slice(0, 2).map((item, index) => (
                <div
                  key={item.number}
                  className={`flex flex-col items-center text-center relative
                  ${index === 0 ? "ml-4" : index === 1 ? "-mr-12" : ""}`}
                >
                  <span className="text-[0.9375rem] font-medium leading-5 absolute -top-1 -left-8">
                    ({item.number})
                  </span>
                  <h3 className="text-[5.5rem] font-bold tracking-tight leading-24">{item.title}</h3>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              {items.slice(2, 4).map((item, index) => (
                <div
                  key={item.number}
                  className={`flex flex-col items-center text-center relative
                ${index === 0 ? "ml-12" : index === 1 ? "-mr-50" : ""}`}
                >
                  <span className="text-15 font-medium leading-5 absolute -top-1 -left-10">({item.number})</span>
                  <h3 className="text-[5.5rem] font-bold tracking-tight leading-24">{item.title}</h3>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              {items.slice(4, 6).map((item, index) => (
                <div
                  key={item.number}
                  className={`flex flex-col items-center text-center relative
              ${index === 0 ? "-ml-48" : index === 1 ? "-mr-30" : ""}`}
                >
                  <span className="text-15 font-medium leading-5 absolute -top-1 -left-10">({item.number})</span>
                  <h3 className="text-[5.5rem] font-bold tracking-tight leading-24">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-between">
        <KAITitle
          title="Hello K"
          subtitle="AI"
          description="K-AI는 KT가 만든 한국형 인공지능 브랜드입니다. 한국인의 언어와 정서를 깊이 이해하고, 일상 속에서 따뜻한 연결을 만들어가는 AI, K-AI는 기술을 넘어 사람과 사람을 이어주는 다리가 되고자 합니다."
        />

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-900 transition-colors">
            K intelligence 더 알아보기
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="ml-1"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M10 8l6 4-6 4V8z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default KIntelligence;
