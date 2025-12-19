"use client";

import { useState, useEffect } from "react";
import Wave from "../svgs/wave";

interface HeroCarouselProps {
  images: string[];
  children: React.ReactNode;
  intervalMs?: number;
}

export default function HeroCarousel({
  images,
  children,
  intervalMs = 5000,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className="relative h-[93vh] overflow-hidden">
      {/* Slides */}
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            {children}
          </div>
        </div>
      ))}

      {/* Ball indicators */}
      <Wave className="absolute z-30 bottom-0"/>
      <div className="absolute z-30 bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center justify-center">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              current === idx
                ? "w-5 h-5 bg-background scale-110 "
                : "w-3 h-3 bg-gray-400 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
