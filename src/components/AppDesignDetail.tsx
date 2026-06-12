"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type CropSection = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const sections: CropSection[] = [
  {
    src: "/assets/figma/5.png",
    alt: "APP设计标题",
    width: 1920,
    height: 1080
  },
  {
    src: "/assets/figma/5.5.png",
    alt: "颜层美容针界面设计完整页面",
    width: 1920,
    height: 11725
  }
];

export function AppDesignDetail() {
  return (
    <main className="min-h-screen bg-black">
      {sections.map((section, index) => (
        <motion.section
          key={section.src}
          className="mx-auto w-full max-w-[1920px] overflow-hidden bg-black"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index === 0 ? 0 : 0.04 }}
        >
          <Image
            src={section.src}
            alt={section.alt}
            width={section.width}
            height={section.height}
            {...(index === 0 ? { priority: true } : { loading: "lazy" as const })}
            quality={100}
            sizes="100vw"
            className="h-auto w-full select-none"
          />
        </motion.section>
      ))}
    </main>
  );
}
