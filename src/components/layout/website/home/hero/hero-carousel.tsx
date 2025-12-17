"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";

interface HeroCarouselProps {
  images: string[];
  children: React.ReactNode;
}

export default function HeroCarousel({ images, children }: HeroCarouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div ref={sliderRef} className="keen-slider h-[93vh] relative duration-1000">
      {images.map((src, i) => (
        <div
          key={i}
          className="keen-slider__slide bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        >
          <div className="absolute inset-0 bg-foreground/50 dark:bg-background/70 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      ))}
    </div>
  );
}
