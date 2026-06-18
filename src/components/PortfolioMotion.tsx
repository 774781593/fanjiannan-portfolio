"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type PortfolioMotionProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlight?: boolean;
  revealMode?: "normal" | "late";
};

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";
const motionViewportAmount = 0.22;
const lateMotionViewportAmount = 0.16;

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia(reduceMotionQuery).matches;
}

function revealNode(node: HTMLElement, observer?: IntersectionObserver) {
  node.setAttribute("data-motion-visible", "true");
  node.removeAttribute("data-motion-fallback");
  observer?.unobserve(node);
}

export function PortfolioMotion({ children, className, style, spotlight = true, revealMode = "normal" }: PortfolioMotionProps) {
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
    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => revealNode(node));
      return;
    }

    const viewportAmount = revealMode === "late" ? lateMotionViewportAmount : motionViewportAmount;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNode(entry.target as HTMLElement, observer);
          }
        });
      },
      { rootMargin: revealMode === "late" ? "0px 0px -18% 0px" : "0px 0px -4% 0px", threshold: viewportAmount }
    );

    revealNodes.forEach((node, index) => {
      const sequenceDelay = revealMode === "late" ? Math.min(index * 28, 120) : Math.min(index * 70, 280);
      node.style.setProperty("--motion-sequence-delay", `${sequenceDelay}ms`);

      Array.from(node.querySelectorAll<HTMLElement>("[data-motion-layer]")).forEach((layer, layerIndex) => {
        layer.style.setProperty("--motion-child-delay", `${Math.min(layerIndex * 42, 260)}ms`);
      });

      observer.observe(node);
    });

    let fallbackFrame = 0;
    const revealNearViewport = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      revealNodes.forEach((node) => {
        if (node.dataset.motionVisible === "true") return;
        const rect = node.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visibleRatio = Math.max(0, visibleHeight) / Math.max(1, Math.min(rect.height, viewportHeight));
        const nearViewport =
          revealMode === "late"
            ? rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * -0.06
            : rect.top < viewportHeight * 1.12 && rect.bottom > viewportHeight * -0.12;
        if (visibleRatio >= viewportAmount || nearViewport) {
          node.setAttribute("data-motion-fallback", "true");
          revealNode(node, observer);
        }
      });
    };

    const scheduleFallback = () => {
      if (fallbackFrame) return;
      fallbackFrame = window.requestAnimationFrame(() => {
        fallbackFrame = 0;
        revealNearViewport();
      });
    };

    scheduleFallback();
    const fallback = window.setTimeout(revealNearViewport, 700);
    window.addEventListener("scroll", scheduleFallback, { passive: true });
    window.addEventListener("resize", scheduleFallback);

    return () => {
      window.clearTimeout(fallback);
      if (fallbackFrame) window.cancelAnimationFrame(fallbackFrame);
      window.removeEventListener("scroll", scheduleFallback);
      window.removeEventListener("resize", scheduleFallback);
      observer.disconnect();
    };
  }, [ready, reduced, revealMode]);

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
