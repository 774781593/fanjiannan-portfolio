"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ImageMarquee } from "./ImageMarquee";
import { PortfolioMotion } from "./PortfolioMotion";
import { assetUrl } from "@/lib/assets";
import type { Frame, ImageLayer, MotionContext, RectLayer, TextLayer, ViewportWindow } from "./project-detail/types";
import { appGalleryCards, appGalleryImageSources, bSpecRects, bSpecTexts, bSystemNeedAvatarSources, bSystemNeedRows, framesBySlug } from "./project-detail/data";

const px = (value: number) => `${value}px`;
const darkCanvasBackground = "rgba(7, 7, 9, 0.68)";

function frameCanvasBackground(background?: string) {
  const value = (background ?? "#070709").toLowerCase();
  if (value === "#070709" || value === "#090a0f" || value === "#030304" || value === "#000000") {
    return darkCanvasBackground;
  }

  return background ?? darkCanvasBackground;
}

function projectFrameBackground(slug: string, background?: string) {
  if (slug === "b-system") {
    const value = (background ?? "#070709").toLowerCase();
    if (value === "#070709" || value === "#090a0f" || value === "#030304" || value === "#000000") {
      return "transparent";
    }
  }

  return frameCanvasBackground(background);
}

function rectCanvasBackground(rect: RectLayer) {
  const value = rect.color?.toLowerCase();
  const isFullCanvasBand = rect.x === 0 && rect.w >= 1920;
  if (isFullCanvasBand && (value === "#070709" || value === "#090a0f" || value === "#030304")) {
    return darkCanvasBackground;
  }

  return rect.background ?? rect.color;
}

const staticAfterHeroSlugs = new Set(["dashboard", "c4d-practice", "graphic"]);

function shouldDisableLayerMotion(slug: string, index: number, y: number) {
  return index === 0 && staticAfterHeroSlugs.has(slug) && y >= 1080;
}

function shouldDisableFrameMotion(slug: string, index: number) {
  return slug === "app-design" && index === 1;
}

function layerInViewportWindow(window: ViewportWindow, y: number, height: number) {
  if (!window.enabled) return true;
  return y + height >= window.start && y <= window.end;
}

function textLayerHeight(text: TextLayer) {
  if (text.height) return text.height;
  const lineHeight = text.lineHeight ?? text.size * 1.2;
  return lineHeight * Math.max(1, text.text.split("\n").length);
}

function isBSystemNeedRect(rect: RectLayer) {
  return rect.y >= 2920 && rect.y <= 3222 && rect.h === 127 && rect.radius === 24;
}

function isBSystemNeedAvatar(image: ImageLayer) {
  return bSystemNeedAvatarSources.has(image.src);
}

function isBSystemNeedText(text: TextLayer) {
  return text.y === 2965 || text.y === 3116 || text.y === 3267;
}

function Hero({
  hero,
  images,
  motion,
  disableBodyMotion = false,
  viewportWindow
}: {
  hero: NonNullable<Frame["hero"]>;
  images?: ImageLayer[];
  motion?: MotionContext;
  disableBodyMotion?: boolean;
  viewportWindow?: ViewportWindow;
}) {
  const activeWindow = viewportWindow ?? { enabled: false, start: Number.NEGATIVE_INFINITY, end: Number.POSITIVE_INFINITY };
  const heroOverlayImages = images?.filter((image) => image.y < 1000);
  const heroBodyImages = images?.filter((image) => image.y >= 1000).filter((image) => layerInViewportWindow(activeWindow, image.y, image.h));

  return (
    <>
      {heroOverlayImages?.map((image) => <ImageLayerView key={`${image.src}-${image.x}-${image.y}`} image={{ ...image, eager: true }} motion={motion} />)}
      <p
        className="motion-title-shine absolute m-0 whitespace-nowrap font-['MiSans'] leading-none"
        data-motion-layer={motion?.disabled ? undefined : "text"}
        style={{
          left: px(hero.titleX),
          top: px(hero.titleY),
          width: hero.titleW ? px(hero.titleW) : undefined,
          height: hero.titleH ? px(hero.titleH) : undefined,
          fontSize: px(150),
          fontWeight: 520,
          fontSynthesis: "none",
          fontVariationSettings: `"wght" 520`,
          lineHeight: px(150.08),
          color: "#86df2a",
          textAlign: hero.titleAlign
        }}
      >
        {hero.title}
      </p>
      {hero.subtitle ? (
        <TextLayerView text={hero.subtitle} motion={motion} />
      ) : (
        <>
          <p
            className="absolute m-0 whitespace-nowrap font-['MiSans'] leading-none"
            data-motion-layer={motion?.disabled ? undefined : "text"}
            style={{ left: px(hero.descAX), top: px(hero.descAY), fontSize: px(24), fontWeight: hero.descAWeight ?? 520, lineHeight: px(24.01), color: "#ffffff" }}
          >
            {hero.descA}
          </p>
          <p
            className="absolute m-0 whitespace-nowrap font-['MiSans'] leading-none"
            data-motion-layer={motion?.disabled ? undefined : "text"}
            style={{ left: px(hero.descBX), top: px(hero.descBY), fontSize: px(24), fontWeight: hero.descBWeight ?? 330, lineHeight: px(24.01), color: "rgba(255,255,255,0.8)" }}
          >
            {hero.descB}
          </p>
        </>
      )}
      {heroBodyImages?.map((image) => (
        <ImageLayerView
          key={`${image.src}-${image.x}-${image.y}`}
          image={{ ...image, eager: image.y < 2400 }}
          motion={{ disabled: disableBodyMotion || motion?.disabled }}
        />
      ))}
    </>
  );
}

function ImageLayerView({ image, motion }: { image: ImageLayer; motion?: MotionContext }) {
  const loading = image.eager ? "eager" : "lazy";
  const fetchPriority = image.eager ? "high" : "auto";
  const motionLayer = motion?.disabled || image.motionDisabled ? undefined : "image";

  if (image.imageX !== undefined && image.imageY !== undefined && image.imageW !== undefined && image.imageH !== undefined) {
    return (
      <div
        className="absolute overflow-hidden"
        data-motion-layer={motionLayer}
        style={{
          left: px(image.x),
          top: px(image.y),
          width: px(image.w),
          height: px(image.h),
          zIndex: image.z,
          opacity: image.opacity,
          transform: image.rotate ? `rotate(${image.rotate}deg)` : undefined,
          borderRadius: image.radius ? px(image.radius) : undefined,
          border: image.border ? `${image.borderWidth ?? 1}px solid ${image.border}` : undefined,
          boxSizing: image.border ? "border-box" : undefined,
          boxShadow: image.shadow
        }}
      >
        <img
          src={assetUrl(image.src)}
          alt=""
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className="absolute max-w-none object-fill"
          style={{
            left: px(image.imageX - image.x),
            top: px(image.imageY - image.y),
            width: px(image.imageW),
            height: px(image.imageH)
          }}
        />
      </div>
    );
  }

  if (image.crop) {
    return (
      <div
        className="absolute overflow-hidden"
        data-motion-layer={motionLayer}
        style={{
          left: px(image.x),
          top: px(image.y),
          width: px(image.w),
          height: px(image.h),
          zIndex: image.z,
          opacity: image.opacity,
          transform: image.rotate ? `rotate(${image.rotate}deg)` : undefined,
          borderRadius: image.radius ? px(image.radius) : undefined,
          border: image.border ? `${image.borderWidth ?? 1}px solid ${image.border}` : undefined,
          boxSizing: image.border ? "border-box" : undefined,
          boxShadow: image.shadow
        }}
      >
        <img
          src={assetUrl(image.src)}
          alt=""
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className="absolute left-0 max-w-none object-fill"
          style={{ top: image.crop.top, width: "100%", height: image.crop.height }}
        />
      </div>
    );
  }

  return (
    <img
      src={assetUrl(image.src)}
      alt=""
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={image.cover ? "absolute h-full w-full object-cover" : "absolute max-w-none object-fill"}
      data-motion-layer={motionLayer}
      style={{
        left: px(image.x),
        top: px(image.y),
        width: px(image.w),
        height: px(image.h),
        zIndex: image.z,
        opacity: image.opacity,
        transform: image.rotate ? `rotate(${image.rotate}deg)` : undefined,
        borderRadius: image.radius ? px(image.radius) : undefined,
        border: image.border ? `${image.borderWidth ?? 1}px solid ${image.border}` : undefined,
        boxSizing: image.border ? "border-box" : undefined,
        boxShadow: image.shadow
      }}
    />
  );
}

function isSelectionHandle(rect: RectLayer) {
  return (
    rect.kind === undefined &&
    rect.color === "#ffffff" &&
    rect.w > 18 &&
    rect.w < 24 &&
    rect.h > 18 &&
    rect.h < 24 &&
    rect.x >= 260 &&
    rect.x <= 1660 &&
    rect.y >= 260 &&
    rect.y <= 740
  );
}

function RectLayerView({ rect, selectionHandle = false, motion }: { rect: RectLayer; selectionHandle?: boolean; motion?: MotionContext }) {
  const seamBleed = 0;
  const motionLayer = (layer: "image" | "text" | "shape" | "selection") => (motion?.disabled ? undefined : layer);

  if (rect.kind === "source-arrow") {
    return (
      <svg
        className="absolute overflow-visible"
        data-motion-layer={motionLayer("selection")}
        width={rect.w}
        height={rect.h}
        viewBox={`0 0 ${rect.w} ${rect.h}`}
        style={{ left: px(rect.x), top: px(rect.y), zIndex: rect.z, opacity: rect.opacity }}
      >
        <path d={`M ${rect.w / 2} ${rect.h} L ${rect.w / 2} 6`} stroke={rect.color ?? "#ffffff"} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={`M ${rect.w / 2} 0 L ${rect.w / 2 - 10} 14 M ${rect.w / 2} 0 L ${rect.w / 2 + 10} 14`} stroke={rect.color ?? "#ffffff"} strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  if (rect.kind === "diagonal-arrow") {
    return (
      <svg
        className="absolute overflow-visible"
        width={rect.w}
        height={rect.h}
        viewBox="0 0 21 21"
        style={{ left: px(rect.x), top: px(rect.y), zIndex: rect.z, opacity: rect.opacity }}
        aria-hidden="true"
      >
        <path
          d="M 21 18.704835217705078 C 21 19.9719726180755 20.054324003837095 21 18.888692188537284 21 L 0.5715866342111087 21 L 0.5715866342111087 16.81044022131345 L 13.95507855720292 16.81044022131345 L 0 2.914842434447919 L 2.916795751272405 0 L 16.946227041380837 13.968005773394275 L 16.946227041380837 0.4445513591532355 L 21 0.4445513591532355 L 21 18.704835217705078 Z"
          fill={rect.color ?? "#ffffff"}
        />
      </svg>
    );
  }

  if (rect.kind === "selection-box") {
    return (
      <svg
        className="absolute overflow-visible"
        data-motion-layer={motionLayer("selection")}
        width={rect.w}
        height={rect.h}
        viewBox={`0 0 ${rect.w} ${rect.h}`}
        style={{ left: px(rect.x), top: px(rect.y), zIndex: rect.z, opacity: rect.opacity }}
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width={rect.w - 2}
          height={rect.h - 2}
          fill="none"
          stroke={rect.color ?? "#ffffff"}
          strokeWidth="2"
          strokeDasharray="15 15"
        />
      </svg>
    );
  }

  if (rect.kind === "connector-right" || rect.kind === "connector-left") {
    const left = rect.kind === "connector-left";
    return (
      <svg
        className="absolute overflow-visible"
        width={rect.w}
        height={rect.h}
        viewBox={`0 0 ${rect.w} ${rect.h}`}
        style={{ left: px(rect.x), top: px(rect.y), zIndex: rect.z, opacity: rect.opacity }}
      >
        <path
          d={left ? `M ${rect.w} 0 C ${rect.w * 0.62} ${rect.h * 0.35}, ${rect.w * 0.3} ${rect.h * 0.7}, 0 ${rect.h}` : `M 0 0 C ${rect.w * 0.38} ${rect.h * 0.35}, ${rect.w * 0.7} ${rect.h * 0.7}, ${rect.w} ${rect.h}`}
          stroke={rect.color ?? "#333333"}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (rect.kind === "connector-cap-right" || rect.kind === "connector-cap-left") {
    const left = rect.kind === "connector-cap-left";
    return (
      <svg
        className="absolute overflow-visible"
        width={rect.w}
        height={rect.h}
        viewBox={`0 0 ${rect.w} ${rect.h}`}
        style={{ left: px(rect.x), top: px(rect.y), zIndex: rect.z, opacity: rect.opacity }}
      >
        <path
          d={left ? `M ${rect.w} 0 L 0 ${rect.h / 2} L ${rect.w} ${rect.h}` : `M 0 0 L ${rect.w} ${rect.h / 2} L 0 ${rect.h}`}
          stroke={rect.color ?? "#333333"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (rect.kind === "triangle") {
    return (
      <div
        className="absolute"
        data-motion-layer={motionLayer("shape")}
        style={{
          left: px(rect.x),
          top: px(rect.y),
          width: px(rect.w),
          height: px(rect.h),
          background: rectCanvasBackground(rect),
          zIndex: rect.z,
          opacity: rect.opacity,
          clipPath: "polygon(0 0, 100% 0, 50% 100%)"
        }}
      />
    );
  }

  return (
    <div
      className="absolute"
      data-motion-layer={motionLayer(selectionHandle ? "selection" : "shape")}
      style={{
        left: px(rect.x),
        top: px(rect.y),
        width: px(rect.w + seamBleed),
        height: px(rect.h + seamBleed),
        background: rectCanvasBackground(rect),
        borderRadius: rect.radiusCss ?? (rect.radius ? px(rect.radius) : undefined),
        zIndex: rect.z,
        opacity: rect.opacity,
        border: rect.border ? `${rect.borderWidth ?? 1}px ${rect.borderStyle ?? "solid"} ${rect.border}` : undefined,
        borderTop: rect.borderTop ? `${rect.borderTopWidth ?? 1}px solid ${rect.borderTop}` : undefined,
        boxSizing: rect.border || rect.borderTop ? "border-box" : undefined
      }}
    />
  );
}

function TextLayerView({ text, motion }: { text: TextLayer; motion?: MotionContext }) {
  const preserveLineBreaks = text.width || text.text.includes("\n");
  const whitespaceClass = text.wrap === false ? "whitespace-pre" : preserveLineBreaks ? "whitespace-pre-wrap" : "whitespace-nowrap";
  const fontFamily = text.family === "Helvetica" ? "Helvetica, Arial, sans-serif" : text.family ?? "MiSans";
  const fontWeight = text.weight ?? 305;

  return (
    <p
      className={`absolute m-0 font-['MiSans'] ${whitespaceClass}`}
      data-motion-layer={motion?.disabled ? undefined : "text"}
      style={{
        left: px(text.x),
        top: px(text.y),
        width: text.width ? px(text.width) : undefined,
        height: text.height ? px(text.height) : undefined,
        fontFamily,
        fontSize: px(text.size),
        fontStyle: text.style ?? "normal",
        fontWeight,
        fontSynthesis: "none",
        fontVariationSettings: fontFamily.includes("MiSans") ? `"wght" ${fontWeight}` : undefined,
        color: text.color ?? "#ffffff",
        backgroundImage: text.gradient,
        WebkitBackgroundClip: text.gradient ? "text" : undefined,
        backgroundClip: text.gradient ? "text" : undefined,
        WebkitTextFillColor: text.gradient ? "transparent" : undefined,
        opacity: text.opacity,
        zIndex: text.z,
        lineHeight: text.lineHeight ? px(text.lineHeight) : "normal",
        letterSpacing: text.letterSpacing ? px(text.letterSpacing) : undefined,
        textAlign: text.align
      }}
    >
      {text.parts ? (
        text.parts.map((part, index) => (
          <span
            key={`${part.text}-${index}`}
            style={{
              color: part.color,
              fontWeight: part.weight,
              fontVariationSettings: part.weight && fontFamily.includes("MiSans") ? `"wght" ${part.weight}` : undefined
            }}
          >
            {part.text}
          </span>
        ))
      ) : (
        text.text
      )}
    </p>
  );
}

function BSystemNeedsMarquee() {
  return (
    <div className="b-needs-marquee" aria-label="目标人群需求滚动展示">
      {bSystemNeedRows.map((row, rowIndex) => {
        const loopCards = [...row, ...row];

        return (
          <div
            key={`b-need-row-${rowIndex}`}
            className="b-needs-marquee__row"
            style={
              {
                "--needs-speed": rowIndex === 1 ? "30s" : "34s",
                "--needs-offset": rowIndex === 0 ? "312px" : rowIndex === 1 ? "-128px" : "138px"
              } as CSSProperties
            }
          >
            <div className="b-needs-marquee__track">
              {loopCards.map((card, index) => (
                <div className="b-needs-marquee__card" style={{ width: px(card.width) }} key={`${card.text}-${rowIndex}-${index}`}>
                  <span className="b-needs-marquee__avatar">
                    <img src={assetUrl(card.avatar)} alt="" loading={index < row.length ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" draggable={false} />
                  </span>
                  <span className="b-needs-marquee__text">{card.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AppPageCarousel({ scale }: { scale: number }) {
  const marqueeScale = scale * 0.7;
  const scaledImages = appGalleryCards.map((image) => ({
    ...image,
    width: image.width * marqueeScale,
    height: image.height * marqueeScale,
    radius: image.radius ? image.radius * marqueeScale : undefined
  }));

  return (
    <div
      className="absolute"
      style={{ left: 0, top: px(8559 * scale), width: "100%", height: px(846 * scale), zIndex: 90 }}
    >
      <ImageMarquee images={scaledImages} width="100%" height={846 * scale} speed="34s" className="app-image-marquee" />
    </div>
  );
}

function BSystemSpecTable() {
  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{ left: px(133), top: px(6720), width: px(1650), height: px(624), borderRadius: px(24), zIndex: 80 }}
    >
      <svg
        className="absolute inset-0"
        width="1650"
        height="624"
        viewBox="0 0 1650 624"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="b-spec-table-clip">
            <rect x="0" y="0" width="1650" height="624" rx="24" ry="24" />
          </clipPath>
        </defs>
        <g clipPath="url(#b-spec-table-clip)">
          {bSpecRects.map((rect) => (
            <rect
              key={`${rect.x}-${rect.y}-${rect.w}-${rect.h}-${rect.fill}-${rect.opacity ?? 1}`}
              x={rect.x}
              y={rect.y}
              width={rect.w}
              height={rect.h}
              fill={rect.fill}
              opacity={rect.opacity}
            />
          ))}
        </g>
      </svg>
      {bSpecTexts.map((text) => (
        <p
          key={`${text.text}-${text.x}-${text.y}`}
          className="absolute m-0 whitespace-pre-line"
          style={{
            left: px(text.x),
            top: px(text.y),
            fontFamily: "MiSans",
            fontSize: px(text.size),
            fontStyle: "normal",
            fontWeight: text.weight ?? 305,
            fontSynthesis: "none",
            fontVariationSettings: `"wght" ${text.weight ?? 305}`,
            lineHeight: "normal",
            color: text.color ?? "#ffffff",
            opacity: text.opacity
          }}
        >
          {text.text}
        </p>
      ))}
    </div>
  );
}

export function LayeredProjectPage({ slug }: { slug: string }) {
  const frames = framesBySlug[slug];
  const containerRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [viewportWindow, setViewportWindow] = useState<ViewportWindow>({
    enabled: slug === "b-system",
    start: slug === "b-system" ? -640 : Number.NEGATIVE_INFINITY,
    end: slug === "b-system" ? 2400 : Number.POSITIVE_INFINITY
  });

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateScale = () => {
      setScale(Math.min(1, node.clientWidth / 1920));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node || scale === null || slug !== "b-system") return;

    let frame = 0;
    let zoomSettleTimer = 0;
    let viewportZooming = false;

    const updateWindow = (force = false) => {
      frame = 0;
      const mobile = window.matchMedia("(max-width: 720px)").matches;
      if (!mobile) {
        setViewportWindow({
          enabled: false,
          start: Number.NEGATIVE_INFINITY,
          end: Number.POSITIVE_INFINITY
        });
        return;
      }

      const rect = node.getBoundingClientRect();
      const visualViewport = window.visualViewport;
      const viewportHeight = visualViewport?.height ?? window.innerHeight ?? document.documentElement.clientHeight;
      const stageTop = window.scrollY + rect.top;
      const viewportTop = visualViewport?.pageTop ?? window.scrollY;
      const viewportScale = visualViewport?.scale ?? 1;
      if (!force && viewportZooming && viewportScale > 1.03) return;

      const overscan = viewportScale > 1.03 ? 520 : 840;
      const start = (viewportTop - stageTop) / scale - overscan;
      const end = (viewportTop + viewportHeight - stageTop) / scale + overscan;

      setViewportWindow((current) => {
        if (current.enabled && Math.abs(current.start - start) < 96 && Math.abs(current.end - end) < 96) {
          return current;
        }

        return { enabled: true, start, end };
      });
    };

    const scheduleWindow = (force = false) => {
      if (frame) {
        if (!force) return;
        window.cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(() => updateWindow(force));
    };

    const scheduleViewportWindow = () => {
      const viewportScale = window.visualViewport?.scale ?? 1;
      if (viewportScale > 1.03) {
        viewportZooming = true;
        if (zoomSettleTimer) window.clearTimeout(zoomSettleTimer);
        zoomSettleTimer = window.setTimeout(() => {
          viewportZooming = false;
          scheduleWindow(true);
        }, 260);
        return;
      }

      viewportZooming = false;
      if (zoomSettleTimer) {
        window.clearTimeout(zoomSettleTimer);
        zoomSettleTimer = 0;
      }
      scheduleWindow();
    };
    const scheduleDocumentWindow = () => scheduleWindow();

    updateWindow();
    window.addEventListener("scroll", scheduleDocumentWindow, { passive: true });
    window.addEventListener("resize", scheduleDocumentWindow);
    window.addEventListener("orientationchange", scheduleDocumentWindow);
    window.visualViewport?.addEventListener("resize", scheduleViewportWindow);
    window.visualViewport?.addEventListener("scroll", scheduleViewportWindow, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (zoomSettleTimer) window.clearTimeout(zoomSettleTimer);
      window.removeEventListener("scroll", scheduleDocumentWindow);
      window.removeEventListener("resize", scheduleDocumentWindow);
      window.removeEventListener("orientationchange", scheduleDocumentWindow);
      window.visualViewport?.removeEventListener("resize", scheduleViewportWindow);
      window.visualViewport?.removeEventListener("scroll", scheduleViewportWindow);
    };
  }, [scale, slug]);

  if (!frames) {
    return null;
  }

  const scaleReady = scale !== null;
  const stageScale = scale ?? 1;

  return (
    <main ref={containerRef} className="project-page min-h-screen" data-scale-ready={scaleReady ? "true" : "false"}>
      <PortfolioMotion className="min-h-screen">
      {frames.map((frame, index) => {
        const frameMotionDisabled = shouldDisableFrameMotion(slug, index);
        const activeViewportWindow = slug === "b-system" && index === 0 ? viewportWindow : { enabled: false, start: Number.NEGATIVE_INFINITY, end: Number.POSITIVE_INFINITY };

        return (
        <section
          key={`${slug}-${index}`}
          className={`mx-auto w-full max-w-[1920px] ${slug === "app-design" && index === 1 ? "overflow-visible" : "overflow-hidden"}`}
          data-project-hero={index === 0 ? "true" : undefined}
          data-motion-reveal={frameMotionDisabled ? undefined : true}
          data-motion-start={!frameMotionDisabled && index === 0 ? "true" : undefined}
          style={{ background: projectFrameBackground(slug, frame.background), "--motion-delay": index === 0 ? "0ms" : `${Math.min(index * 90, 240)}ms` } as CSSProperties}
        >
          <div
            className="relative w-full"
            style={{
              height: scaleReady ? px(frame.height * stageScale) : 0,
              background: projectFrameBackground(slug, frame.background)
            }}
          >
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: px(1920),
                height: px(frame.height),
                background: projectFrameBackground(slug, frame.background),
                transform: `scale(${stageScale})`,
                visibility: scaleReady ? "visible" : "hidden"
              }}
            >
              {frame.fullImageSrc ? (
                <ImageLayerView image={{ src: frame.fullImageSrc, x: 0, y: 0, w: 1920, h: frame.height, eager: index === 0 }} />
              ) : (
                <>
                  {frame.rects
                    ?.filter((rect) => !(slug === "b-system" && index === 0 && isBSystemNeedRect(rect)))
                    .filter((rect) => layerInViewportWindow(activeViewportWindow, rect.y, rect.h))
                    .map((rect) => (
                      <RectLayerView
                        key={`${rect.x}-${rect.y}-${rect.w}-${rect.h}`}
                        rect={rect}
                        selectionHandle={index === 0 && isSelectionHandle(rect)}
                        motion={{ disabled: frameMotionDisabled || shouldDisableLayerMotion(slug, index, rect.y) }}
                      />
                    ))}
                  {frame.hero ? (
                    <Hero hero={frame.hero} images={frame.images} disableBodyMotion={staticAfterHeroSlugs.has(slug) && index === 0} viewportWindow={activeViewportWindow} />
                  ) : (
                    frame.images
                      ?.filter((image) => !(slug === "app-design" && index === 1 && appGalleryImageSources.has(image.src)))
                      .filter((image) => !(slug === "b-system" && index === 0 && isBSystemNeedAvatar(image)))
                      .filter((image) => layerInViewportWindow(activeViewportWindow, image.y, image.h))
                      .map((image) => (
                        <ImageLayerView
                          key={`${image.src}-${image.x}-${image.y}`}
                          image={{ ...image, eager: index === 0 && image.y < (slug === "b-system" ? 1200 : 2400) }}
                          motion={{ disabled: frameMotionDisabled || shouldDisableLayerMotion(slug, index, image.y) }}
                        />
                      ))
                  )}
                  {frame.texts
                    ?.filter((text) => !(slug === "b-system" && index === 0 && isBSystemNeedText(text)))
                    .filter((text) => layerInViewportWindow(activeViewportWindow, text.y, textLayerHeight(text)))
                    .map((text) => (
                      <TextLayerView key={`${text.text}-${text.x}-${text.y}`} text={text} motion={{ disabled: frameMotionDisabled || shouldDisableLayerMotion(slug, index, text.y) }} />
                    ))}
                  {slug === "b-system" && index === 0 && layerInViewportWindow(activeViewportWindow, 6720, 624) ? <BSystemSpecTable /> : null}
                  {slug === "b-system" && index === 0 && layerInViewportWindow(activeViewportWindow, 2920, 430) ? <BSystemNeedsMarquee /> : null}
                </>
              )}
            </div>
            {slug === "app-design" && index === 1 && scaleReady ? <AppPageCarousel scale={stageScale} /> : null}
          </div>
        </section>
        );
      })}
      </PortfolioMotion>
    </main>
  );
}



