"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Slide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  radius?: number;
};

type CarouselSwiperProps = {
  slides: readonly Slide[];
  width: number;
  height: number;
  className?: string;
};

const transitionMs = 240;
const dragThreshold = 90;
const dragVelocity = 500;
const sideOffset = 1160;
const slideTop = 0;

export function CarouselSwiper({ slides, width, height, className }: CarouselSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startTransition = (nextIndex: number) => {
    if (slides.length < 2 || isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex(nextIndex);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, transitionMs);
  };

  const goNext = () => startTransition((activeIndex + 1) % slides.length);
  const goPrev = () => startTransition((activeIndex - 1 + slides.length) % slides.length);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x <= -dragThreshold || info.velocity.x <= -dragVelocity) {
      goNext();
      return;
    }

    if (info.offset.x >= dragThreshold || info.velocity.x >= dragVelocity) {
      goPrev();
    }
  };

  const getRelativeSlot = (index: number) => {
    const raw = index - activeIndex;
    if (raw > slides.length / 2) return raw - slides.length;
    if (raw < -slides.length / 2) return raw + slides.length;
    return raw;
  };

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ width, height }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[34%] bg-gradient-to-r from-black/45 to-transparent"
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[34%] bg-gradient-to-l from-black/45 to-transparent"
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-0 z-20"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        {slides.map((slide, index) => {
          const slot = getRelativeSlot(index);
          const isActive = slot === 0;
          const slideWidth = slide.width;
          const slideHeight = slide.height;

          return (
            <motion.div
              key={slide.src}
              className="absolute left-1/2"
              animate={{
                x: slot * sideOffset - slideWidth / 2,
                scale: isActive ? 1 : 0.96,
                opacity: isActive ? 1 : 0.42,
                filter: isActive ? "brightness(1)" : "brightness(0.68)"
              }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{
                top: slideTop,
                zIndex: isActive ? 3 : 1,
                width: slideWidth,
                height: slideHeight,
                pointerEvents: isActive ? "auto" : "none"
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={isActive ? "eager" : "lazy"}
                fetchPriority={isActive ? "high" : "auto"}
                decoding="async"
                draggable={false}
                className="h-full w-full select-none object-cover"
                style={{
                  borderRadius: slide.radius ? `${slide.radius}px` : undefined,
                  boxShadow: isActive ? "0 28px 70px rgba(0,0,0,0.28)" : "none"
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute left-1/2 top-[874px] z-40 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={isTransitioning || slides.length < 2}
          className="h-[24px] rounded-full border border-white/35 bg-black/20 px-3 text-[12px] font-[305] leading-[24px] text-white/90 transition duration-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一项
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={isTransitioning || slides.length < 2}
          className="h-[24px] rounded-full border border-white/35 bg-black/20 px-3 text-[12px] font-[305] leading-[24px] text-white/90 transition duration-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一项
        </button>
      </div>
    </div>
  );
}
