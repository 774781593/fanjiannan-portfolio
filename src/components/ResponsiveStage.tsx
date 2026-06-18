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
  const [scale, setScale] = useState(0);

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

  const stageHeight = scale > 0 ? designHeight * scale : 0;

  return (
    <div ref={shellRef} className={className} data-scale-ready={scale > 0 ? "true" : "false"} style={{ height: stageHeight }}>
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale > 0 ? "visible" : "hidden"
        }}
      >
        {children}
      </div>
    </div>
  );
}
