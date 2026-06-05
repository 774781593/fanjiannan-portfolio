"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type MouseParallaxProps = {
  children: ReactNode;
  className?: string;
};

export function MouseParallax({ children, className }: MouseParallaxProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 90, damping: 24 });
  const springY = useSpring(my, { stiffness: 90, damping: 24 });
  const x = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const y = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
