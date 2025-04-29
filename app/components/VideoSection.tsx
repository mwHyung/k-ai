"use client";

import { useRef, useState } from "react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" loop muted playsInline>
        <source src="/video/main_visual.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Video Background</h2>
          <button
            onClick={handlePlayPause}
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-opacity-90 transition-all"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
