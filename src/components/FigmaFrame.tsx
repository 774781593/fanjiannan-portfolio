import type { ReactNode } from "react";

type FigmaFrameProps = {
  children: ReactNode;
  className?: string;
  handles?: boolean;
};

export function FigmaFrame({ children, className = "", handles = true }: FigmaFrameProps) {
  return (
    <div className={`figma-dash relative ${className}`}>
      {handles ? (
        <>
          <span className="handle handle-tl" />
          <span className="handle handle-tm" />
          <span className="handle handle-tr" />
          <span className="handle handle-ml" />
          <span className="handle handle-mr" />
          <span className="handle handle-bl" />
          <span className="handle handle-bm" />
          <span className="handle handle-br" />
        </>
      ) : null}
      {children}
    </div>
  );
}
