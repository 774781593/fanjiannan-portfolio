"use client";

import { motion } from "framer-motion";

export function DrawMark() {
  return (
    <svg viewBox="0 0 220 34" className="h-8 w-52 text-ink" fill="none">
      <motion.path
        d="M2 24 C42 2, 76 2, 112 18 S178 34, 218 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
    </svg>
  );
}
