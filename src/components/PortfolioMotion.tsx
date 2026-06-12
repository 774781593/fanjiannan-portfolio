"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type PortfolioMotionProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlight?: boolean;
};

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia(reduceMotionQuery).matches;
}

export function PortfolioMotion({ children, className, style, spotlight = true }: PortfolioMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(reduceMotionQuery);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const revealNodes = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-motion-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealNodes.forEach((node, index) => {
      node.style.setProperty("--motion-sequence-delay", `${Math.min(index * 70, 280)}ms`);

      Array.from(node.querySelectorAll<HTMLElement>("[data-motion-layer]")).forEach((layer, layerIndex) => {
        layer.style.setProperty("--motion-child-delay", `${Math.min(layerIndex * 42, 260)}ms`);
      });

      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [ready, reduced]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!spotlight || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
  }

  return (
    <div
      ref={rootRef}
      className={className ? `portfolio-motion ${className}` : "portfolio-motion"}
      style={style}
      data-motion-ready={ready ? "true" : "false"}
      data-reduced-motion={reduced ? "true" : "false"}
      onPointerMove={handlePointerMove}
    >
      {spotlight ? <div className="portfolio-spotlight" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
};

export function MotionReveal({ children, className, delay = 0, style }: MotionRevealProps) {
  return (
    <div
      className={className}
      data-motion-reveal
      style={{ ...style, "--motion-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
