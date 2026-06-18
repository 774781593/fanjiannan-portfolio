"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ResponsiveStageProps = {
  children: ReactNode;
  designWidth: number;
  designHeight: number;
  className?: string;
};

export function ResponsiveStage({ children, designWidth, designHeight, className }: ResponsiveStageProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    const updateScale = () => {
      setScale(Math.min(1, node.clientWidth / designWidth));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, [designWidth]);

  const stageScale = scale ?? 1;
  const stageHeight = scale === null ? 0 : designHeight * stageScale;

  return (
    <div ref={shellRef} className={className} data-scale-ready={scale === null ? "false" : "true"} style={{ height: stageHeight }}>
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${stageScale})`,
          transformOrigin: "top left",
          visibility: scale === null ? "hidden" : "visible"
        }}
      >
        {children}
      </div>
    </div>
  );
}
