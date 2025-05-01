import React from "react";
import Image from "next/image";

const images = [
  {
    id: 1,
    src: "/images/sub/sub_icon01.png",
    alt: "Slide 1",
  },
  {
    id: 2,
    src: "/images/sub/sub_icon02.png",
    alt: "Slide 2",
  },
  {
    id: 3,
    src: "/images/sub/sub_icon03.png",
    alt: "Slide 3",
  },
  {
    id: 4,
    src: "/images/sub/sub_icon04.png",
    alt: "Slide 4",
  },
  {
    id: 5,
    src: "/images/sub/sub_icon05.png",
    alt: "Slide 5",
  },
  {
    id: 6,
    src: "/images/sub/sub_icon06.png",
    alt: "Slide 6",
  },
  {
    id: 7,
    src: "/images/sub/sub_icon07.png",
    alt: "Slide 7",
  },
  {
    id: 8,
    src: "/images/sub/sub_icon08.png",
    alt: "Slide 8",
  },
  {
    id: 9,
    src: "/images/sub/sub_icon09.png",
    alt: "Slide 9",
  },
  {
    id: 10,
    src: "/images/sub/sub_icon10.png",
    alt: "Slide 10",
  },
];

const ImageSlider = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="z-10 absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(255,255,255,0.00)_51.43%,#000_92.71%),linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.25)_51.74%)] " />
      <div className="flex">
        <div className="flex animate-[loopScroll_20s_linear_infinite]">
          {images.map((image) => (
            <div key={image.id} className="flex-shrink-0 mx-10">
              <Image
                src={image.src}
                alt={image.alt}
                width={140}
                height={48}
                className="min-h-12 min-w-36 object-contain"
              />
            </div>
          ))}
          {images.map((image) => (
            <div key={`${image.id}-duplicate`} className="flex-shrink-0 mx-10">
              <Image
                src={image.src}
                alt={image.alt}
                width={140}
                height={48}
                className="min-h-12 min-w-36 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-[loopScroll_20s_linear_infinite]" style={{ animationDelay: "-10s" }}>
          {images.map((image) => (
            <div key={`${image.id}-second`} className="flex-shrink-0 mx-10">
              <Image
                src={image.src}
                alt={image.alt}
                width={140}
                height={48}
                className="min-h-12 min-w-36 object-contain"
              />
            </div>
          ))}
          {images.map((image) => (
            <div key={`${image.id}-second-duplicate`} className="flex-shrink-0 mx-10">
              <Image
                src={image.src}
                alt={image.alt}
                width={140}
                height={48}
                className="min-h-12 min-w-36 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
