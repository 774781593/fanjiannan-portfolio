"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { imageReveal } from "@/lib/motion";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  priority = false
}: ImageRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={imageReveal}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        {...(priority ? { priority: true } : { loading: "lazy" as const })}
        className={imageClassName}
      />
    </motion.div>
  );
}
