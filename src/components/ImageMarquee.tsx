"use client";

import type { CSSProperties } from "react";
import { assetUrl } from "@/lib/assets";

type MarqueeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  radius?: number;
};

type ImageMarqueeProps = {
  images: readonly MarqueeImage[];
  width: number;
  height: number;
  speed?: string;
  className?: string;
};

export function ImageMarquee({ images, width, height, speed = "18s", className }: ImageMarqueeProps) {
  const loopImages = [...images, ...images];

  return (
    <div
      className={`image-marquee ${className ?? ""}`}
      style={{ width, height, "--marquee-speed": speed } as CSSProperties}
    >
      <div className="image-marquee__track">
        {loopImages.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="image-marquee__card"
            style={{
              width: image.width,
              height: image.height,
              borderRadius: image.radius ? `${image.radius}px` : "24px"
            }}
          >
            <img
              src={assetUrl(image.src)}
              alt={image.alt}
              loading={index < images.length ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              draggable={false}
              className="image-marquee__image"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
