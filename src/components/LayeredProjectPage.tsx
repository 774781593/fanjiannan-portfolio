"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { CarouselSwiper } from "./CarouselSwiper";
import { PortfolioMotion } from "./PortfolioMotion";

type ImageLayer = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  eager?: boolean;
  z?: number;
  rotate?: number;
  opacity?: number;
  cover?: boolean;
  radius?: number;
  border?: string;
  borderWidth?: number;
  shadow?: string;
  imageX?: number;
  imageY?: number;
  imageW?: number;
  imageH?: number;
  crop?: {
    top: string;
    height: string;
  };
};

type TextLayer = {
  text: string;
  parts?: Array<{ text: string; color?: string; weight?: number }>;
  x: number;
  y: number;
  size: number;
  weight?: number;
  z?: number;
  color?: string;
  gradient?: string;
  opacity?: number;
  width?: number;
  height?: number;
  lineHeight?: number;
  letterSpacing?: number;
  family?: string;
  style?: string;
  align?: "left" | "center" | "right";
  wrap?: boolean;
};

type RectLayer = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind?: "rect" | "triangle" | "source-arrow" | "diagonal-arrow" | "selection-box" | "connector-right" | "connector-left" | "connector-cap-right" | "connector-cap-left";
  color?: string;
  background?: string;
  radius?: number;
  radiusCss?: string;
  z?: number;
  opacity?: number;
  border?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderTop?: string;
  borderTopWidth?: number;
};

type Frame = {
  height: number;
  background?: string;
  fullImageSrc?: string;
  images?: ImageLayer[];
  texts?: TextLayer[];
  rects?: RectLayer[];
  hero?: {
    title: string;
    titleX: number;
    titleY: number;
    titleW?: number;
    titleH?: number;
    titleAlign?: "left" | "center" | "right";
    descA: string;
    descAX: number;
    descAY: number;
    descB: string;
    descBX: number;
    descBY: number;
    descAWeight?: number;
    descBWeight?: number;
    subtitle?: TextLayer;
  };
};

const S = "/assets/slices";

const px = (value: number) => `${value}px`;

const bSpecRects = [
  { x: 0, y: 0, w: 330, h: 104, fill: "#2f51ff" },
  { x: 330, y: 0, w: 330, h: 104, fill: "#2f51ff" },
  { x: 660, y: 0, w: 330, h: 78, fill: "#ffffff" },
  { x: 660, y: 0, w: 330, h: 78, fill: "#000000", opacity: 0.88 },
  { x: 990, y: 0, w: 330, h: 78, fill: "#ffffff" },
  { x: 990, y: 0, w: 330, h: 78, fill: "#000000", opacity: 0.15 },
  { x: 1320, y: 0, w: 330, h: 156, fill: "#d9d9d9" },
  { x: 660, y: 78, w: 330, h: 78, fill: "#ffffff" },
  { x: 660, y: 78, w: 330, h: 78, fill: "#000000", opacity: 0.65 },
  { x: 990, y: 78, w: 330, h: 78, fill: "#ffffff" },
  { x: 990, y: 78, w: 330, h: 78, fill: "#000000", opacity: 0.06 },
  { x: 0, y: 104, w: 330, h: 104, fill: "#506dff" },
  { x: 330, y: 104, w: 330, h: 104, fill: "#e6e8eb" },
  { x: 660, y: 156, w: 330, h: 78, fill: "#ffffff" },
  { x: 660, y: 156, w: 330, h: 78, fill: "#000000", opacity: 0.45 },
  { x: 990, y: 156, w: 330, h: 78, fill: "#ffffff" },
  { x: 990, y: 156, w: 330, h: 78, fill: "#000000", opacity: 0.04 },
  { x: 1320, y: 156, w: 330, h: 156, fill: "rgba(240,240,240,0.9411764740943909)" },
  { x: 0, y: 208, w: 330, h: 104, fill: "#2744d6" },
  { x: 330, y: 208, w: 165, h: 104, fill: "#d4d6d9" },
  { x: 495, y: 208, w: 165, h: 104, fill: "#e8edff" },
  { x: 660, y: 234, w: 330, h: 78, fill: "#ffffff" },
  { x: 660, y: 234, w: 330, h: 78, fill: "#000000", opacity: 0.25 },
  { x: 990, y: 234, w: 330, h: 78, fill: "#ffffff" },
  { x: 990, y: 234, w: 330, h: 78, fill: "#000000", opacity: 0.02 },
  { x: 0, y: 312, w: 550, h: 104, fill: "#fa8c16" },
  { x: 550, y: 312, w: 550, h: 104, fill: "#15ba0c" },
  { x: 1100, y: 312, w: 550, h: 104, fill: "#f6222f" },
  { x: 0, y: 416, w: 330, h: 104, fill: "#ffa940" },
  { x: 330, y: 416, w: 220, h: 104, fill: "#fed591" },
  { x: 550, y: 416, w: 330, h: 104, fill: "#39c62c" },
  { x: 880, y: 416, w: 220, h: 104, fill: "#89e078" },
  { x: 1100, y: 416, w: 330, h: 104, fill: "#ff4d50" },
  { x: 1430, y: 416, w: 220, h: 104, fill: "#ffa39e" },
  { x: 0, y: 520, w: 330, h: 104, fill: "#d46b08" },
  { x: 330, y: 520, w: 110, h: 104, fill: "#ffe7ba" },
  { x: 440, y: 520, w: 110, h: 104, fill: "#fff7e6" },
  { x: 550, y: 520, w: 330, h: 104, fill: "#049402" },
  { x: 880, y: 520, w: 110, h: 104, fill: "#b4eda8" },
  { x: 990, y: 520, w: 110, h: 104, fill: "#e6fae1" },
  { x: 1100, y: 520, w: 330, h: 104, fill: "#ce1322" },
  { x: 1430, y: 520, w: 110, h: 104, fill: "#ffccc7" },
  { x: 1540, y: 520, w: 110, h: 104, fill: "#fff2f0" }
];

const bSpecTexts = [
  { text: "主题色", x: 23, y: 16, size: 24, weight: 380 },
  { text: "#2F51FF", x: 23, y: 58, size: 20 },
  { text: "悬停", x: 23, y: 123, size: 24, weight: 380 },
  { text: "#506DFF", x: 23, y: 165, size: 20 },
  { text: "按压", x: 23, y: 225, size: 24, weight: 380 },
  { text: "#2744D6", x: 23, y: 267, size: 20 },
  { text: "警告色", x: 23, y: 329, size: 24, weight: 380 },
  { text: "#FA8C16", x: 23, y: 371, size: 20 },
  { text: "悬停", x: 23, y: 433, size: 24, weight: 380 },
  { text: "#FFA940", x: 23, y: 475, size: 20 },
  { text: "按压", x: 23, y: 537, size: 24, weight: 380 },
  { text: "#D46B08", x: 23, y: 579, size: 20 },
  { text: "禁用", x: 351, y: 123, size: 24, weight: 380, color: "#3054ca" },
  { text: "#E6E8EB", x: 351, y: 165, size: 20, color: "#3054ca" },
  { text: "边框", x: 351, y: 225, size: 24, weight: 380, color: "#3054ca" },
  { text: "#D4D6D9", x: 351, y: 267, size: 20, color: "#3054ca" },
  { text: "填充", x: 516, y: 225, size: 24, weight: 380, color: "#3054ca" },
  { text: "#E8EDFF", x: 516, y: 267, size: 20, color: "#3054ca" },
  { text: "禁用", x: 345, y: 435, size: 24, weight: 380, color: "#d46b08" },
  { text: "#FED591", x: 345, y: 477, size: 20, color: "#d46b08" },
  { text: "边框", x: 345, y: 537, size: 24, weight: 380, color: "#d46b08" },
  { text: "#FFE7BA", x: 345, y: 579, size: 20, color: "#d46b08" },
  { text: "填充", x: 454, y: 537, size: 24, weight: 380, color: "#d46b08" },
  { text: "#FFF7E6", x: 454, y: 579, size: 20, color: "#d46b08" },
  { text: "成功色", x: 573, y: 329, size: 24, weight: 380 },
  { text: "#15BA0C", x: 573, y: 371, size: 20 },
  { text: "悬停", x: 573, y: 433, size: 24, weight: 380 },
  { text: "#39C62C", x: 573, y: 475, size: 20 },
  { text: "按压", x: 573, y: 537, size: 24, weight: 380 },
  { text: "#049402", x: 573, y: 579, size: 20 },
  { text: "禁用", x: 895, y: 435, size: 24, weight: 380, color: "#049402" },
  { text: "#89E078", x: 895, y: 477, size: 20, color: "#049402" },
  { text: "边框", x: 895, y: 537, size: 24, weight: 380, color: "#049402" },
  { text: "#B4EDA8", x: 895, y: 579, size: 20, color: "#049402" },
  { text: "填充", x: 1004, y: 537, size: 24, weight: 380, color: "#049402" },
  { text: "#E6FAE1", x: 1004, y: 579, size: 20, color: "#049402" },
  { text: "错误色", x: 1123, y: 329, size: 24, weight: 380 },
  { text: "#F6222F", x: 1123, y: 371, size: 20 },
  { text: "悬停", x: 1123, y: 433, size: 24, weight: 380 },
  { text: "#FF4D50", x: 1123, y: 475, size: 20 },
  { text: "按压", x: 1123, y: 537, size: 24, weight: 380 },
  { text: "#CE1322", x: 1123, y: 579, size: 20 },
  { text: "禁用", x: 1445, y: 435, size: 24, weight: 380, color: "#ce1322" },
  { text: "#FFA39E", x: 1445, y: 477, size: 20, color: "#ce1322" },
  { text: "边框", x: 1445, y: 537, size: 24, weight: 380, color: "#ce1322" },
  { text: "#FFCCC7", x: 1445, y: 579, size: 20, color: "#ce1322" },
  { text: "填充", x: 1554, y: 537, size: 24, weight: 380, color: "#ce1322" },
  { text: "#FFF2F0", x: 1554, y: 579, size: 20, color: "#ce1322" },
  { text: "#000\n88%", x: 922, y: 18, size: 16 },
  { text: "#000\n65%", x: 922, y: 96, size: 16 },
  { text: "#000\n45%", x: 922, y: 174, size: 16 },
  { text: "#000\n25%", x: 922, y: 252, size: 16 },
  { text: "#000\n15%", x: 1252, y: 18, size: 16, color: "#000000", opacity: 0.88 },
  { text: "#000\n6%", x: 1252, y: 96, size: 16, color: "#000000", opacity: 0.88 },
  { text: "#000\n4%", x: 1252, y: 174, size: 16, color: "#000000", opacity: 0.88 },
  { text: "#000\n2%", x: 1252, y: 252, size: 16, color: "#000000", opacity: 0.88 },
  { text: "一级文本", x: 689, y: 23, size: 24, weight: 380 },
  { text: "二级文本", x: 689, y: 101, size: 24, weight: 380 },
  { text: "三级文本", x: 689, y: 179, size: 24, weight: 380 },
  { text: "四级文本", x: 689, y: 257, size: 24, weight: 380 },
  { text: "一级填充", x: 1019, y: 23, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
  { text: "二级填充", x: 1019, y: 101, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
  { text: "三级填充", x: 1019, y: 179, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
  { text: "四级填充", x: 1019, y: 257, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
  { text: "一级边框", x: 1349, y: 23, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
  { text: "#D9D9D9", x: 1349, y: 60, size: 20, color: "#000000", opacity: 0.88 },
  { text: "二级边框", x: 1349, y: 179, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
  { text: "#F0F0F0", x: 1349, y: 216, size: 20, color: "#000000", opacity: 0.88 }
];

const moveArrow: ImageLayer = {
  src: `${S}/4214_1.png`,
  x: 1670.17,
  y: 752.34,
  w: 58.832,
  h: 64.8
};

const appGalleryCards = [
  { src: `${S}/首页.png`, alt: "首页", width: 1434, height: 897, radius: 24 },
  { src: `${S}/记忆.png`, alt: "记忆", width: 1438, height: 900, radius: 26 },
  { src: `${S}/wifi.png`, alt: "wifi", width: 1434, height: 897, radius: 26 }
] as const;

const appGalleryImageSources = new Set<string>(appGalleryCards.map((card) => card.src));

const appFrames: Frame[] = [
  {
    height: 1080,
    hero: {
      title: "APP设计",
      titleX: 636,
      titleY: 399,
      descA: "颜层美容APP界面",
      descAX: 624,
      descAY: 785,
      descB: "根据用户需求对美容仪app进行交互及UI设计",
      descBX: 912,
      descBY: 785
    },
    rects: [
      { x: 281.232, y: 285.947, w: 1368.474, h: 439.958, kind: "selection-box", color: "#ffffff", z: 2 },
      { x: 271, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 271, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 }
    ],
    images: [moveArrow]
  },
  {
    height: 9825,
    rects: [
      { x: 0, y: 2003, w: 1920, h: 7822, color: "#090a0f" },
      { x: 102.5, y: 2424, w: 1715, h: 919, radius: 84, background: "linear-gradient(180deg, #2e4fb8 0%, #090a0f 100%)" },
      { x: 102.25, y: 3653, w: 848, h: 1006, radius: 60, background: "linear-gradient(180deg, #0b1834 0%, #16274c 100%)" },
      { x: 969.25, y: 3653, w: 847, h: 1006, radius: 60, background: "linear-gradient(180deg, #13203e 0%, #354c79 100%)" },
      { x: 102.25, y: 4678, w: 848, h: 1006, radius: 60, background: "linear-gradient(180deg, #000000 0%, #274cc4 100%)" },
      { x: 969.25, y: 4678, w: 847, h: 201.2, radiusCss: "60px 60px 0 0", color: "#ffffff" },
      { x: 969.25, y: 4879, w: 847, h: 201.2, color: "#d8d8d8" },
      { x: 969.25, y: 5080, w: 847, h: 201.2, color: "#000000" },
      { x: 969.25, y: 5281, w: 847, h: 201.2, color: "#7e3385" },
      { x: 969.25, y: 5482, w: 847, h: 201.2, radiusCss: "0 0 60px 60px", color: "#264bc1" },
      { x: 102, y: 7093, w: 848, h: 848, radius: 60, background: "linear-gradient(180deg, #000000 0%, #274cc4 100%)" },
      { x: 968, y: 7093, w: 848, h: 848, radius: 60, background: "linear-gradient(180deg, #000000 0%, #0f2671 100%)" }
      ,
      { x: 207, y: 3741, w: 193, h: 65, radius: 20, background: "linear-gradient(180deg, #1c2d52 0%, #425172 100%)" },
      { x: 1080, y: 3741, w: 193, h: 65, radius: 20, background: "linear-gradient(180deg, #1c2d52 0%, #425172 100%)" },
      { x: 252, y: 7243, w: 247, h: 247, radius: 24, color: "transparent", border: "rgba(255,255,255,0.2)", borderWidth: 2 },
      { x: 553, y: 7243, w: 247, h: 247, radius: 24, color: "transparent", border: "rgba(255,255,255,0.2)", borderWidth: 2 },
      { x: 252, y: 7544, w: 247, h: 247, radius: 24, color: "transparent", border: "rgba(255,255,255,0.2)", borderWidth: 2 },
      { x: 553, y: 7544, w: 247, h: 247, radius: 24, color: "transparent", border: "rgba(255,255,255,0.2)", borderWidth: 2 }
    ],
    images: [
      { src: `${S}/3213_4.png`, x: 0, y: 0, w: 1920, h: 2003 },
      { src: `${S}/资源_1_2.png`, x: 748, y: 249, w: 423, h: 93 },
      { src: `${S}/资源_1_2.png`, x: 1289, y: 2140, w: 423, h: 93 },
      { src: `${S}/1_310053792.png`, x: 1010, y: 2313, w: 665, h: 1030 },
      { src: `${S}/注射.png`, x: 245, y: 6044, w: 1428, h: 893, radius: 24, border: "#363636", borderWidth: 1 },
      { src: `/assets/figma-dev/app/essence-open.svg`, x: 316, y: 7287, w: 102, h: 102 },
      { src: `/assets/figma-dev/app/hyaluronic.svg`, x: 603, y: 7275, w: 138, h: 138 },
      { src: `/assets/figma-dev/app/resource-management.svg`, x: 335, y: 7594, w: 92, h: 92 },
      { src: `/assets/figma-dev/app/medicine-library.svg`, x: 625, y: 7589, w: 102, h: 102 },
      { src: `${S}/资源_1_2.png`, x: 1112, y: 7456, w: 561, h: 123 },
      { src: `${S}/wifi.png`, x: -86, y: 8619, w: 1120, h: 701, opacity: 0.2, z: 1 },
      { src: `${S}/记忆.png`, x: 882, y: 8622, w: 1116, h: 698, opacity: 0.2, z: 1 },
      { src: `${S}/首页.png`, x: 239, y: 8521, w: 1434, h: 897, radius: 24, z: 2 },
      { src: `${S}/首页.png`, x: 892, y: 9639, w: 1106, h: 692, radius: 24, opacity: 0.2, z: 1 },
      { src: `${S}/wifi.png`, x: -86, y: 9634, w: 1120, h: 701, opacity: 0.2, z: 1 },
      { src: `${S}/记忆.png`, x: 241, y: 9536, w: 1438, h: 900, radius: 26, z: 2 },
      { src: `${S}/记忆.png`, x: -86, y: 10657, w: 1109, h: 694, radius: 26, opacity: 0.2, z: 1 },
      { src: `${S}/首页.png`, x: 892, y: 10657, w: 1106, h: 692, radius: 24, opacity: 0.2, z: 1 },
      { src: `${S}/wifi.png`, x: 239, y: 10554, w: 1434, h: 897, radius: 26, z: 2 }
    ],
    texts: [
      { text: "2024", x: 77, y: 53, size: 24 },
      { text: "UX/UI", x: 1779, y: 53, size: 24 },
      { text: "颜层美容针界面设计", x: 528, y: 388, size: 96, weight: 450 },
      { text: "项目背调", x: 207, y: 2140, size: 64, weight: 380 },
      { text: "设计规范", x: 207, y: 3480, size: 64, weight: 380 },
      { text: "参数设置页面", x: 207, y: 5821, size: 64, weight: 380 },
      { text: "其他页面", x: 207, y: 8266, size: 64, weight: 380 },
      { text: "让肌肤重焕光彩", x: 207, y: 2740, size: 48, weight: 380 },
      {
        text: "颜层是一款现代美容仪器，它将美容针通过科学注射方式将营养成分输送到皮肤深层，能够有效实现补水保湿、减少皱纹、提亮肤色、紧致提升和改善肤质等多重美容效果。",
        x: 207,
        y: 2875,
        width: 637,
        size: 24,
        weight: 250,
        lineHeight: 36
      },
      { text: "主要字体", x: 239, y: 3753, size: 32, weight: 330 },
      { text: "辅助字体", x: 1112, y: 3753, size: 32, weight: 330 },
      { text: "PingFang\nSans SC", x: 207, y: 3833, width: 273, size: 64, weight: 330 },
      { text: "Arial", x: 1080, y: 3833, width: 266, size: 128, weight: 330 },
      { text: "abcdefghijklmnopqrstuvwxyz\n!@#$%^?", x: 207, y: 4504, width: 525, size: 24, weight: 250 },
      { text: "1234567890", x: 1080, y: 4504, width: 652, size: 64, weight: 250 },
      { text: "#000000", x: 207, y: 4742, size: 48, weight: 250 },
      { text: "#274CC4", x: 207, y: 5559, size: 48, weight: 250 },
      { text: "#FFFFFF", x: 1080, y: 4744, size: 48, weight: 250, color: "#000000" },
      { text: "#D8D8D8", x: 1080, y: 4956, size: 48, weight: 250, color: "#000000" },
      { text: "#000000", x: 1080, y: 5157, size: 48, weight: 250 },
      { text: "#7E3385", x: 1080, y: 5358, size: 48, weight: 250 },
      { text: "#274CC4", x: 1080, y: 5557, size: 48, weight: 250 },
      { text: "精华液", x: 327, y: 7413, size: 36, weight: 380 },
      { text: "玻尿酸", x: 622, y: 7413, size: 36, weight: 380 },
      { text: "资源管理", x: 307, y: 7714, size: 36, weight: 380 },
      { text: "药品库", x: 622, y: 7714, size: 36, weight: 380 },
      { text: "THANKS", x: 831, y: 9635, size: 64, weight: 380 }
    ]
  }
];

const bSystemFrames: Frame[] = [
  {
    height: 9211,
    hero: {
      title: "B端设计",
      titleX: 683,
      titleY: 399,
      descA: "中微能源管理系统",
      descAX: 501,
      descAY: 785,
      descB: "为了提升目标公司运营效率，实现设备、能耗统一管理",
      descBX: 802,
      descBY: 785
    },
    rects: [
      { x: 281.232, y: 285.947, w: 1368.474, h: 439.958, kind: "selection-box", color: "#ffffff", z: 2 },
      { x: 271, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 271, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 133, y: 1680, w: 135, h: 48, radius: 12, color: "rgba(217,217,217,0.3)", z: 2 },
      { x: 283, y: 1680, w: 135, h: 48, radius: 12, color: "rgba(217,217,217,0.3)", z: 2 },
      { x: 133, y: 1741, w: 135, h: 48, radius: 12, color: "rgba(217,217,217,0.3)", z: 2 },
      { x: 283, y: 1741, w: 163, h: 48, radius: 12, color: "rgba(217,217,217,0.3)", z: 2 },
      { x: 137, y: 1990, w: 370, h: 315, radius: 32, color: "rgba(255,255,255,0.95)", z: 2 },
      { x: 536, y: 1990, w: 370, h: 315, radius: 32, color: "rgba(255,255,255,0.95)", z: 2 },
      { x: 935, y: 1990, w: 848, h: 315, radius: 32, color: "#525252", z: 2 },
      { x: 180, y: 2095, w: 122, h: 45, radius: 67, color: "transparent", border: "#333333", borderWidth: 1, z: 3 },
      { x: 327, y: 2095, w: 143, h: 45, radius: 67, color: "transparent", border: "#333333", borderWidth: 1, z: 3 },
      { x: 180, y: 2156, w: 178, h: 45, radius: 67, color: "transparent", border: "#333333", borderWidth: 1, z: 3 },
      { x: 135, y: 3922, w: 536, h: 346, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1, borderStyle: "dashed" },
      { x: 693, y: 3850, w: 536, h: 417, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1, borderStyle: "dashed" },
      { x: 1251, y: 3762, w: 536, h: 505, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1, borderStyle: "dashed" },
      { x: 135, y: 2576, w: 1650, h: 252, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1 },
      { x: 135, y: 2920, w: 1213, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1369, y: 2920, w: 1213, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: -100, y: 3071, w: 917, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 838, y: 3071, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 29, y: 3222, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1024, y: 3222, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1833, y: 3071, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1632, y: 2766, w: 101, h: 35, color: "#81c478", radiusCss: "0 50px 50px 12px", z: 9 },
      { x: 133, y: 6720, w: 330, h: 104, color: "#2f51ff", radiusCss: "24px 0 0 0" },
      { x: 463, y: 6720, w: 330, h: 104, color: "#2f51ff" },
      { x: 793, y: 6720, w: 330, h: 78, color: "#1f1f1f" },
      { x: 1123, y: 6720, w: 330, h: 78, color: "#d9d9d9" },
      { x: 1453, y: 6720, w: 330, h: 156, color: "#d9d9d9", radiusCss: "0 24px 0 0" },
      { x: 793, y: 6798, w: 330, h: 78, color: "#595959" },
      { x: 1123, y: 6798, w: 330, h: 78, color: "#f0f0f0" },
      { x: 133, y: 6824, w: 330, h: 104, color: "#506dff" },
      { x: 463, y: 6824, w: 330, h: 104, color: "#e6e8eb" },
      { x: 793, y: 6876, w: 330, h: 78, color: "#8c8c8c" },
      { x: 1123, y: 6876, w: 330, h: 78, color: "#f5f5f5" },
      { x: 1453, y: 6876, w: 330, h: 156, color: "rgba(240,240,240,0.9411764740943909)" },
      { x: 133, y: 6928, w: 330, h: 104, color: "#2744d6" },
      { x: 463, y: 6928, w: 165, h: 104, color: "#d4d6d9" },
      { x: 628, y: 6928, w: 165, h: 104, color: "#e8edff" },
      { x: 793, y: 6954, w: 330, h: 78, color: "#bfbfbf" },
      { x: 1123, y: 6954, w: 330, h: 78, color: "#fafafa" },
      { x: 133, y: 7032, w: 550, h: 104, color: "#fa8c16" },
      { x: 683, y: 7032, w: 550, h: 104, color: "#15ba0c" },
      { x: 1233, y: 7032, w: 550, h: 104, color: "#f6222f" },
      { x: 133, y: 7136, w: 330, h: 104, color: "#ffa940" },
      { x: 463, y: 7136, w: 220, h: 104, color: "#fed591" },
      { x: 683, y: 7136, w: 330, h: 104, color: "#39c62c" },
      { x: 1013, y: 7136, w: 220, h: 104, color: "#89e078" },
      { x: 1233, y: 7136, w: 330, h: 104, color: "#ff4d50" },
      { x: 1563, y: 7136, w: 220, h: 104, color: "#ffa39e" },
      { x: 133, y: 7240, w: 330, h: 104, color: "#d46b08", radiusCss: "0 0 0 24px" },
      { x: 463, y: 7240, w: 110, h: 104, color: "#ffe7ba" },
      { x: 573, y: 7240, w: 110, h: 104, color: "#fff7e6" },
      { x: 683, y: 7240, w: 330, h: 104, color: "#049402" },
      { x: 1013, y: 7240, w: 110, h: 104, color: "#b4eda8" },
      { x: 1123, y: 7240, w: 110, h: 104, color: "#e6fae1" },
      { x: 1233, y: 7240, w: 330, h: 104, color: "#ce1322" },
      { x: 1563, y: 7240, w: 110, h: 104, color: "#ffccc7" },
      { x: 1673, y: 7240, w: 110, h: 104, color: "#fff2f0", radiusCss: "0 0 24px 0" },
      { x: 138, y: 7397, w: 497, h: 227, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1, borderStyle: "dashed" },
      { x: 138, y: 7650, w: 497, h: 227, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1, borderStyle: "dashed" },
      { x: 661, y: 7397, w: 1122, h: 49, color: "#242424", radiusCss: "12px 12px 0 0", borderTop: "#8c8c8c", borderTopWidth: 1 },
      { x: 661, y: 7518, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7590, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7662, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7734, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7806, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7877, w: 1122, h: 1, color: "#515151" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670.168, y: 752.337, w: 58.832, h: 64.8 },
      { src: `${S}/5555_1.png`, x: 599, y: 1301, w: 198, h: 135, z: 3 },
      { src: `${S}/图片扩图_1.png`, x: -55, y: 1022, w: 2340, h: 1132 },
      { src: `${S}/Ellipse 1051.png`, x: 1413, y: 2643, w: 115, h: 115, z: 13, radius: 999, border: "#81c478", borderWidth: 7 },
      { src: `${S}/Ellipse 1050.png`, x: 1465, y: 2643, w: 115, h: 115, z: 12, radius: 999, border: "#3bbca6", borderWidth: 7 },
      { src: `${S}/Ellipse 1049.png`, x: 1517, y: 2643, w: 115, h: 115, z: 11, radius: 999, border: "#7d78c4", borderWidth: 7 },
      { src: `${S}/Ellipse 1052.png`, x: 1569, y: 2643, w: 115, h: 115, z: 10, radius: 999, border: "#6a6879", borderWidth: 7 },
      { src: `${S}/Ellipse 1053.png`, x: 190, y: 2947, w: 74, h: 74 },
      { src: `${S}/Ellipse 1054.png`, x: 1425, y: 2947, w: 74, h: 74 },
      { src: `${S}/Ellipse 1055.png`, x: -45, y: 3098, w: 74, h: 74 },
      { src: `${S}/Ellipse 1056.png`, x: 896, y: 3098, w: 74, h: 74 },
      { src: `${S}/Ellipse 1057.png`, x: 84, y: 3249, w: 74, h: 74 },
      { src: `${S}/Ellipse 1058.png`, x: 1085, y: 3249, w: 74, h: 74 },
      { src: `/assets/b-system-objective.png`, x: 1146, y: 4752, w: 569, h: 441 },
      { src: `${S}/Arrow 2.png`, x: 1766, y: 4712, w: 35, h: 496 },
      { src: `${S}/4214_1.png`, x: 1783, y: 4267, w: 59, h: 65 },
      { src: `${S}/image_1.png`, x: 133, y: 5653, w: 1648, h: 674 },
      { src: `${S}/Group 1940698322.png`, x: 135, y: 8138, w: 1311, h: 940 }
    ],
    texts: [
      { text: "Industrial Design", x: 134, y: 1144, size: 18, weight: 330, lineHeight: 24, color: "rgba(255,255,255,0.5)" },
      { text: "Publication date\nOctober 2023", x: 1644, y: 1144, size: 18, weight: 330, lineHeight: 24, color: "rgba(255,255,255,0.5)" },
      { text: "中微EMS能源管理系统", x: 133, y: 1325, size: 48, weight: 330, lineHeight: 51.56 },
      { text: "Zhongwei EMS Energy Management System", x: 133, y: 1384, size: 18, weight: 330, lineHeight: 24, color: "rgba(255,255,255,0.5)" },
      {
        text: "随着企业数字化与“双碳”战略的推进，传统能源管理方式逐渐暴露出数据分散、监控滞后、能耗分析困难以及人工统计效率低等问题。为了提升企业能源使用效率与设备运维能力，我参与开发了 EMS 能源管理平台。该平台围绕“能源数据统一接入、实时监控、智能分析”展开建设，通过整合电、水、气等多类型能源数据，实现企业能耗的可视化管理与精细化运营，为节能降耗和智慧运维提供数据支撑。",
        x: 134,
        y: 1468,
        width: 852,
        size: 20,
        weight: 250,
        lineHeight: 30
      },
      { text: "任务协同", x: 160, y: 1691, size: 20, weight: 305, lineHeight: 27, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "系统监控", x: 310, y: 1691, size: 20, weight: 305, lineHeight: 27, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "能源管理", x: 160, y: 1752, size: 20, weight: 305, lineHeight: 27, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "数据可视化", x: 314, y: 1752, size: 20, weight: 305, lineHeight: 27, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "目标人群", x: 180, y: 2019, size: 24, weight: 380, color: "#333333", lineHeight: 30, z: 3 },
      { text: "管理员", x: 211, y: 2103, size: 20, color: "#333333", lineHeight: 30, z: 4 },
      { text: "运维人员", x: 358, y: 2103, size: 20, color: "#333333", lineHeight: 30, z: 4 },
      { text: "数据监控人员", x: 209, y: 2164, size: 20, color: "#333333", lineHeight: 30, z: 4 },
      { text: "核心痛点", x: 579, y: 2019, size: 24, weight: 380, color: "#333333", lineHeight: 30, z: 3 },
      { text: "数据查看效率低不突出\n信息层级混乱\n告警不突出\n多系统切换复杂", x: 579, y: 2080, width: 281, size: 20, color: "#333333", lineHeight: 30, z: 3 },
      { text: "我的职责", x: 978, y: 2019, size: 24, weight: 380, lineHeight: 30, z: 3 },
      {
        text: "负责 EMS 能源管理平台整体 UI 视觉设计与界面风格制定\n参与前期需求分析与产品功能梳理，输出页面信息架构与交互逻辑\n负责后台管理系统、数据可视化页面设计\n根据业务场景设计图表、数据卡片、状态组件等可视化模块，提升数据展示效率\n制定统一的设计规范与组件库，保证产品视觉一致性与开发协作效率\n输出高保真设计稿、交互动效及开发标注，并与前端协同完成设计落地\n持续优化用户体验与界面细节，提升系统易用性与整体视觉品质",
        x: 978,
        y: 2064,
        width: 752,
        size: 20,
        lineHeight: 30,
        z: 3
      },
      { text: "需求调研", x: 133, y: 2438, size: 36, weight: 380, lineHeight: 38.67 },
      { text: "Requirement Investigation", x: 133, y: 2485, size: 20, weight: 305, lineHeight: 21.48, color: "rgba(255,255,255,0.5)" },
      {
        text: "通过对企业能源管理流程、用户角色及实际业务场景进行调研，梳理能源数据统一管理、设备实时监控、能耗统计分析、异常告警、数据可视化展示、报表管理及权限管理等核心需求，为 EMS 能源管理平台的功能规划、信息架构与 UI 设计提供依据。",
        x: 190,
        y: 2620,
        width: 1121,
        size: 20,
        lineHeight: 30
      },
      {
        text: "Researching enterprise energy workflows, user roles and business scenarios, we define core needs for unified energy data management, real-time device monitoring, energy analysis, anomaly alerts, visualization, report and permission management, underpinning EMS platform function planning, information architecture and UI design.",
        x: 190,
        y: 2711,
        width: 1158,
        size: 20,
        color: "rgba(255,255,255,0.3)",
        lineHeight: 24
      },
      { text: "希望能够统一管理企业电、水、气等能源数据，避免数据分散难统计", x: 329, y: 2965, size: 32 },
      { text: "希望能够通过大屏驾驶舱统一查看整体运行情况", x: 1564, y: 2965, size: 32 },
      { text: "希望实时查看设备运行状态，及时发现异常问题", x: 94, y: 3116, size: 32 },
      { text: "希望系统能够自动进行异常告警，减少人工巡检压力", x: 1035, y: 3116, size: 32 },
      { text: "希望系统能够自动进行异常告警，减少人工巡检压力", x: 2030, y: 3116, size: 32 },
      { text: "希望系统操作更加高效流畅，提升日常运维体验", x: 223, y: 3267, size: 32 },
      { text: "希望数据展示更加直观，方便快速查看重点信息", x: 1224, y: 3267, size: 32 },
      { text: "目标人群", x: 1650, y: 2774, size: 16, weight: 305, lineHeight: 19.2, z: 10 },
      { text: "产品目标", x: 133, y: 3482, size: 36, weight: 380, lineHeight: 38.67 },
      { text: "Product Objectives", x: 133, y: 3529, size: 20, weight: 305, lineHeight: 21.48, color: "rgba(255,255,255,0.5)" },
      { text: "产品目标与价值主要是为企业达成降本、增效、提准三方面的问题。为企业的智能化管理护航。", x: 133, y: 3620, width: 840, size: 20 },
      { text: "降本", x: 135, y: 3864, size: 36, weight: 630, color: "#81d828", lineHeight: 38.7 },
      { text: "增效", x: 694, y: 3780, size: 36, weight: 630, color: "#81d828", lineHeight: 38.7 },
      { text: "提准", x: 1252, y: 3704, size: 36, weight: 630, color: "#81d828", lineHeight: 38.7 },
      {
        text: "通过 EMS 能源管理平台对企业电、水、气等能源数据进行统一采集与集中管理，帮助企业实时掌握各区域、各设备的能耗情况，及时发现异常能耗与资源浪费问题。\n系统通过能耗趋势分析、峰谷用电分析及异常告警等功能，辅助企业优化能源使用策略，减少不必要的能源消耗，从而降低整体运营成本与人工巡检成本。",
        x: 182,
        y: 3970,
        width: 443,
        size: 20,
        lineHeight: 30,
        color: "#ffffff"
      },
      {
        text: "传统能源管理依赖人工记录与线下巡检，存在数据更新不及时、处理效率低等问题。EMS 平台通过实时监控、自动告警、数据可视化及报表自动生成等功能，提高企业日常管理效率与运维响应速度。\n管理人员可通过平台快速查看关键数据与设备运行状态，减少重复操作与人工统计流程，提升整体协同效率。",
        x: 742,
        y: 3920,
        width: 443,
        size: 20,
        lineHeight: 30,
        color: "#ffffff"
      },
      {
        text: "平台通过统一的数据标准与可视化分析能力，对能源数据进行实时采集、统计与分析，减少人工统计误差，提高数据准确性与可靠性。\n同时，通过多维度数据分析与历史趋势对比，帮助企业更精准地识别高能耗问题与设备异常情况，为节能优化与运营决策提供可靠的数据支撑。",
        x: 1300,
        y: 3835,
        width: 443,
        size: 20,
        lineHeight: 30,
        color: "#ffffff"
      },
      { text: "设计目标", x: 135, y: 4431, size: 36, weight: 380, lineHeight: 38.67 },
      { text: "Design Objectives", x: 135, y: 4478, size: 20, weight: 305, lineHeight: 21.48, color: "rgba(255,255,255,0.5)" },
      { text: "设计目标与价值主要是从用户体验五要素中的表现层、框架层、结构层出发，最大化增强用户体验，辅助提升产品力。", x: 133, y: 4540, width: 1040, size: 20 },
      { text: "表现层", x: 135, y: 4661, size: 32, weight: 380, color: "#81d828" },
      {
        text: "视觉设计:统一视觉规范、提升视觉体验\n遵循简约高效设计原则，视觉及降噪，统一设计规范和组件，向用户清晰高效的传达信息",
        x: 135,
        y: 4725,
        width: 780,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 36
      },
      { text: "框架层", x: 135, y: 4849, size: 32, weight: 380, color: "#81d828" },
      {
        text: "框架、布局、界面设计:统一组件规范、交互友好高效\n梳理审核人员的审核操作流程，与任务操作习惯，合理布局页面信息与操作按钮，以提供高效的任务处理方案",
        x: 135,
        y: 4913,
        width: 780,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 36
      },
      { text: "结构层", x: 135, y: 5073, size: 32, weight: 380, color: "#81d828" }
      ,
      {
        text: "信息设计、产品功能设计:用户体验增强，制定交互规则\n从业务角度梳理核心用户需求，组织&规划产品设计，通过功能架构构建用户体验。建立层级关系制定交互规则。",
        x: 135,
        y: 5137,
        width: 780,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 36
      },
      { text: "功能架构", x: 135, y: 5378, size: 36, weight: 380, lineHeight: 38.67 },
      { text: "Functional Architecture", x: 135, y: 5425, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "支持能源数据监测、设备运行管理、能耗分析统计、异常告警、能源流向分析、报表管理、数据可视化及系统配置等功能。", x: 133, y: 5516, width: 1080, size: 20 },
      { text: "设计规范", x: 135, y: 6460, size: 36, weight: 380, lineHeight: 38.67 },
      { text: "Design Specification", x: 135, y: 6507, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "通过遵循设计规范、使用组件库，以确保项目的用户界面和用户体验在整个平台中是一致的，提高用户对产品的认知和使用便捷性", x: 133, y: 6598, width: 1140, size: 20 },
      { text: "主题色", x: 156, y: 6736, size: 24, weight: 380 },
      { text: "#2F51FF", x: 156, y: 6778, size: 20 },
      { text: "悬停", x: 156, y: 6843, size: 24, weight: 380 },
      { text: "#506DFF", x: 156, y: 6885, size: 20 },
      { text: "按压", x: 156, y: 6945, size: 24, weight: 380 },
      { text: "#2744D6", x: 156, y: 6987, size: 20 },
      { text: "警告色", x: 156, y: 7049, size: 24, weight: 380 },
      { text: "#FA8C16", x: 156, y: 7091, size: 20 },
      { text: "悬停", x: 156, y: 7153, size: 24, weight: 380 },
      { text: "#FFA940", x: 156, y: 7195, size: 20 },
      { text: "按压", x: 156, y: 7257, size: 24, weight: 380 },
      { text: "#D46B08", x: 156, y: 7299, size: 20 },
      { text: "禁用", x: 484, y: 6843, size: 24, weight: 380, color: "#3054ca" },
      { text: "#E6E8EB", x: 484, y: 6885, size: 20, color: "#3054ca" },
      { text: "边框", x: 484, y: 6945, size: 24, weight: 380, color: "#3054ca" },
      { text: "#D4D6D9", x: 484, y: 6987, size: 20, color: "#3054ca" },
      { text: "填充", x: 649, y: 6945, size: 24, weight: 380, color: "#3054ca" },
      { text: "#E8EDFF", x: 649, y: 6987, size: 20, color: "#3054ca" },
      { text: "禁用", x: 478, y: 7155, size: 24, weight: 380, color: "#d46b08" },
      { text: "#FED591", x: 478, y: 7197, size: 20, color: "#d46b08" },
      { text: "边框", x: 478, y: 7257, size: 24, weight: 380, color: "#d46b08" },
      { text: "#FFE7BA", x: 478, y: 7299, size: 20, color: "#d46b08" },
      { text: "填充", x: 587, y: 7257, size: 24, weight: 380, color: "#d46b08" },
      { text: "#FFF7E6", x: 587, y: 7299, size: 20, color: "#d46b08" },
      { text: "成功色", x: 706, y: 7049, size: 24, weight: 380 },
      { text: "#15BA0C", x: 706, y: 7091, size: 20 },
      { text: "悬停", x: 706, y: 7153, size: 24, weight: 380 },
      { text: "#39C62C", x: 706, y: 7195, size: 20 },
      { text: "按压", x: 706, y: 7257, size: 24, weight: 380 },
      { text: "#049402", x: 706, y: 7299, size: 20 },
      { text: "禁用", x: 1028, y: 7155, size: 24, weight: 380, color: "#049402" },
      { text: "#89E078", x: 1028, y: 7197, size: 20, color: "#049402" },
      { text: "边框", x: 1028, y: 7257, size: 24, weight: 380, color: "#049402" },
      { text: "#B4EDA8", x: 1028, y: 7299, size: 20, color: "#049402" },
      { text: "填充", x: 1137, y: 7257, size: 24, weight: 380, color: "#049402" },
      { text: "#E6FAE1", x: 1137, y: 7299, size: 20, color: "#049402" },
      { text: "错误色", x: 1256, y: 7049, size: 24, weight: 380 },
      { text: "#F6222F", x: 1256, y: 7091, size: 20 },
      { text: "悬停", x: 1256, y: 7153, size: 24, weight: 380 },
      { text: "#FF4D50", x: 1256, y: 7195, size: 20 },
      { text: "按压", x: 1256, y: 7257, size: 24, weight: 380 },
      { text: "#CE1322", x: 1256, y: 7299, size: 20 },
      { text: "禁用", x: 1578, y: 7155, size: 24, weight: 380, color: "#ce1322" },
      { text: "#FFA39E", x: 1578, y: 7197, size: 20, color: "#ce1322" },
      { text: "边框", x: 1578, y: 7257, size: 24, weight: 380, color: "#ce1322" },
      { text: "#FFCCC7", x: 1578, y: 7299, size: 20, color: "#ce1322" },
      { text: "填充", x: 1687, y: 7257, size: 24, weight: 380, color: "#ce1322" },
      { text: "#FFF2F0", x: 1687, y: 7299, size: 20, color: "#ce1322" },
      { text: "#000\n88%", x: 1055, y: 6738, size: 16, weight: 305 },
      { text: "#000\n65%", x: 1055, y: 6816, size: 16, weight: 305 },
      { text: "#000\n45%", x: 1055, y: 6894, size: 16, weight: 305 },
      { text: "#000\n25%", x: 1055, y: 6972, size: 16, weight: 305 },
      { text: "#000\n15%", x: 1385, y: 6738, size: 16, weight: 305, color: "#000000", opacity: 0.88 },
      { text: "#000\n6%", x: 1385, y: 6816, size: 16, weight: 305, color: "#000000", opacity: 0.88 },
      { text: "#000\n4%", x: 1385, y: 6894, size: 16, weight: 305, color: "#000000", opacity: 0.88 },
      { text: "#000\n2%", x: 1385, y: 6972, size: 16, weight: 305, color: "#000000", opacity: 0.88 },
      { text: "一级文本", x: 822, y: 6743, size: 24, weight: 380 },
      { text: "二级文本", x: 822, y: 6821, size: 24, weight: 380 },
      { text: "三级文本", x: 822, y: 6899, size: 24, weight: 380 },
      { text: "四级文本", x: 822, y: 6977, size: 24, weight: 380 },
      { text: "一级填充", x: 1152, y: 6743, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
      { text: "二级填充", x: 1152, y: 6821, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
      { text: "三级填充", x: 1152, y: 6899, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
      { text: "四级填充", x: 1152, y: 6977, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
      { text: "一级边框", x: 1482, y: 6743, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
      { text: "#D9D9D9", x: 1482, y: 6780, size: 20, color: "#000000", opacity: 0.88 },
      { text: "二级边框", x: 1482, y: 6899, size: 24, weight: 380, color: "#000000", opacity: 0.88 },
      { text: "#F0F0F0", x: 1482, y: 6936, size: 20, color: "#000000", opacity: 0.88 },
      { text: "中文", x: 188, y: 7438, size: 24, weight: 380, opacity: 0.65 },
      { text: "PingFangSC", x: 188, y: 7489, size: 64, weight: 380, family: "PingFang SC", opacity: 0.88 },
      { text: "数字", x: 188, y: 7691, size: 24, weight: 380, opacity: 0.65 },
      { text: "MiSans", x: 188, y: 7742, size: 64, weight: 380, family: "MiSans", opacity: 0.88 },
      { text: "名称", x: 682, y: 7406, size: 24 },
      { text: "字号", x: 902, y: 7406, size: 24 },
      { text: "行高", x: 1122, y: 7406, size: 24 },
      { text: "字重", x: 1342, y: 7406, size: 24 },
      { text: "使用场景", x: 1562, y: 7406, size: 24 },
      { text: "H1", x: 682, y: 7466, size: 24 },
      { text: "20px", x: 902, y: 7466, size: 24 },
      { text: "28px", x: 1119, y: 7466, size: 24 },
      { text: "Meduim", x: 1342, y: 7466, size: 24 },
      { text: "页面标题", x: 1562, y: 7466, size: 24 },
      { text: "H2", x: 682, y: 7538, size: 24 },
      { text: "16px", x: 902, y: 7538, size: 24 },
      { text: "24px", x: 1119, y: 7538, size: 24 },
      { text: "Meduim", x: 1342, y: 7538, size: 24 },
      { text: "模块标题", x: 1562, y: 7538, size: 24 },
      { text: "H3", x: 682, y: 7610, size: 24 },
      { text: "14px", x: 902, y: 7610, size: 24 },
      { text: "22px", x: 1119, y: 7610, size: 24 },
      { text: "Meduim", x: 1342, y: 7610, size: 24 },
      { text: "文本标题", x: 1562, y: 7610, size: 24 },
      { text: "T1", x: 682, y: 7682, size: 24 },
      { text: "16px", x: 902, y: 7682, size: 24 },
      { text: "24px", x: 1119, y: 7682, size: 24 },
      { text: "Regular", x: 1342, y: 7682, size: 24 },
      { text: "段落文本", x: 1562, y: 7682, size: 24 },
      { text: "T2", x: 682, y: 7754, size: 24 },
      { text: "14px", x: 902, y: 7754, size: 24 },
      { text: "22px", x: 1119, y: 7754, size: 24 },
      { text: "Regular", x: 1342, y: 7754, size: 24 },
      { text: "默认文本", x: 1562, y: 7754, size: 24 },
      { text: "T3", x: 682, y: 7826, size: 24 },
      { text: "12px", x: 902, y: 7826, size: 24 },
      { text: "20px", x: 1119, y: 7826, size: 24 },
      { text: "Regular", x: 1342, y: 7826, size: 24 },
      { text: "提示文本", x: 1562, y: 7826, size: 24 },
      { text: "组件库", x: 135, y: 8010, size: 36, weight: 380, lineHeight: 38.7 },
      { text: "Component Library", x: 135, y: 8057, size: 20, color: "rgba(255,255,255,0.5)", lineHeight: 21.5 }
    ]
  },
  {
    height: 6479,
    images: [
      { src: `${S}/Macbook_1.png`, x: 0, y: 0, w: 1922, h: 1255 },
      { src: `${S}/Frame_1940698324.png`, x: -20, y: 1550, w: 969, h: 476 },
      { src: `${S}/图片5_1.png`, x: 136, y: 2747, w: 1648, h: 819 },
      { src: `${S}/图片4_1.png`, x: 136, y: 3911, w: 1648, h: 805 },
      { src: `${S}/Mask group.png`, x: 137, y: 5017, w: 1646, h: 1306 }
    ],
    texts: [
      { text: "登录页", x: 138, y: 48, size: 36, weight: 380 },
      { text: "Login Page", x: 138, y: 95, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "首页", x: 138, y: 1388, size: 36, weight: 380 },
      { text: "Home Page", x: 138, y: 1435, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "整体设计理念", x: 1036, y: 1550, size: 32, weight: 380, color: "#81d828" },
      {
        text: "页面以“能源数据集中监控”为核心，通过园区总览、能耗分析、趋势变化及功能导航等模块，帮助用户快速掌握整体能源运行状态。\n设计上采用后台管理系统常见的「左侧导航 + 中心内容 + 数据分析」布局结构，强化信息层级与数据可读性，提升企业能源管理效率。",
        x: 1036,
        y: 1606,
        width: 781,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 30
      },
      { text: "左侧导航区", x: 1036, y: 1788, size: 32, weight: 380, color: "#81d828" },
      {
        text: "建立清晰的信息层级\n采用树状菜单结构，将复杂功能分类归纳，降低后台系统的信息复杂度。\n\n提升高频操作效率\n高频功能常驻左侧，减少用户频繁跳转，提高运维人员日常使用效率。\n\n强化工业平台稳定感\n整体采用浅灰背景与线性图标设计，减少视觉干扰，突出数据内容本身。",
        x: 1036,
        y: 1844,
        width: 781,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 29
      },
      { text: "核心视觉区", x: 138, y: 2085, size: 32, weight: 380, color: "#81d828" },
      {
        text: "场景化能源监控\n通过园区实景图结合设备定位，将抽象数据转化为可视化场景，提高用户对园区整体运行状态的理解效率。\n\n强化空间感知\n用户能够快速定位不同区域与设备状态，提升异常问题排查效率。\n\n提升平台科技感\n采用大图展示与场景化设计，增强平台视觉冲击力与数字化体验。",
        x: 138,
        y: 2141,
        width: 811,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 29
      },
      { text: "数据分析可视化模块", x: 1036, y: 2136, size: 32, weight: 380, color: "#81d828" },
      {
        text: "通过图表化与数据可视化设计，将复杂的能源数据转化为更加直观的信息展示方式，帮助用户快速了解园区整体能耗情况、能源变化趋势以及设备运行状态。\n页面采用环形图、柱状图与折线图等多种图表形式，对不同区域、不同时间维度的数据进行分类展示，方便用户快速识别高能耗区域与异常波动情况，提升数据分析效率与管理决策能力。\n通过数据可视化与模块化布局设计，将复杂能源数据更直观地呈现给用户，提升数据分析效率、异常问题识别能力以及整体能源管理体验。",
        x: 1036,
        y: 2192,
        width: 775,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 30
      },
      { text: "能耗分析页", x: 138, y: 2535, size: 36, weight: 380 },
      { text: "Energy Analysis Page", x: 138, y: 2582, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "工业能源管理系统的能耗分析功能可直观展示能源消耗数据，帮助企业发现节能潜力，优化能源使用效率，降低运营成本，支持科学决策和可持续发展目标的实现。", x: 138, y: 2673, width: 1645, size: 20 },
      { text: "光伏发电页", x: 138, y: 3699, size: 36, weight: 380 },
      { text: "Photovoltaic Power Page", x: 138, y: 3746, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "光伏发电模块使用柱状图可以直观展示不同类别数据的数值大小，便于快速比较差异；清晰呈现数据之间的关系和趋势", x: 138, y: 3837, width: 1645, size: 20 },
      { text: "页面展示", x: 138, y: 4848, size: 36, weight: 380 },
      { text: "Page Display", x: 138, y: 4895, size: 20, color: "rgba(255,255,255,0.5)" }
    ]
  }
];

const webFrames: Frame[] = [
  {
    height: 8932,
    hero: {
      title: "网页设计",
      titleX: 660,
      titleY: 399,
      descA: "公司S20网页设计",
      descAX: 624,
      descAY: 785,
      descB: "为公司产品S20提供后台支持",
      descBX: 912,
      descBY: 785
    },
    rects: [
      { x: 281.232, y: 285.947, w: 1368.474, h: 439.958, kind: "selection-box", color: "#ffffff", z: 2 },
      { x: 271, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 271, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 321, y: 3086, w: 658, h: 792, radius: 24, color: "#086adb" },
      { x: 1027, y: 3398, w: 573, h: 160, radiusCss: "24px 24px 0 0", color: "#333333" },
      { x: 1027, y: 3558, w: 573, h: 160, color: "#666666" },
      { x: 1027, y: 3718, w: 573, h: 160, radiusCss: "0 0 24px 24px", color: "#ffffff" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670, y: 752, w: 59, h: 65 },
      { src: `${S}/Image0001_1.png`, x: 1, y: 1080, w: 1920, h: 1223, crop: { top: "-6.87%", height: "117.74%" } },
      { src: `${S}/5555_1.png`, x: 1379, y: 1252, w: 195, h: 133, z: 30 },
      { src: `${S}/图层_3.png`, x: 192, y: 4216, w: 1538, h: 775, radius: 24, border: "#ffffff", borderWidth: 5 },
      { src: `${S}/Snipaste_2025-10-13_14-47-39.png`, x: 192, y: 5041, w: 1538, h: 859, radius: 24, border: "#ffffff", borderWidth: 5 },
      { src: `${S}/Snipaste_2025-10-13_14-49-01.png`, x: 190, y: 5950, w: 1541, h: 861, radius: 24, border: "#ffffff", borderWidth: 5 },
      { src: `${S}/Snipaste_2025-10-13_14-48-35.png`, x: 192, y: 6861, w: 1537, h: 860, radius: 24, border: "#ffffff", borderWidth: 5 },
      { src: `${S}/Snipaste_2025-10-13_14-48-50.png`, x: 191, y: 7771, w: 1540, h: 863, radius: 24, border: "#ffffff", borderWidth: 5 }
    ],
    texts: [
      { text: "信芯网页设计", x: 624, y: 828, size: 24, weight: 520 },
      { text: "根据用户需求采用商务风格进行设计", x: 912, y: 828, size: 24, weight: 330, color: "rgba(255,255,255,0.8)" },
      { text: "SOTHIS S20", parts: [{ text: "SOTHIS", color: "#068fff" }, { text: " S20" }], x: 519, y: 1228, size: 96, weight: 700, lineHeight: 96.053, family: "Druk Wide" },
      { text: "页面原型、UI设计制作", x: 801, y: 1364, size: 32, weight: 330, lineHeight: 32.018, family: "MiSans" },
      { text: "苹方", x: 320, y: 2607, size: 128, weight: 630, family: "MiSans" },
      { text: "PingFang Sans", x: 320, y: 2761, size: 32, weight: 330, color: "#a69f9f", family: "MiSans" },
      { text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", x: 320, y: 2829, size: 24, weight: 330, lineHeight: 24.013, letterSpacing: 7.44, family: "MiSans" },
      { text: "abcdefghijklmnopqrstuvwxyz", x: 320, y: 2861, size: 24, weight: 330, lineHeight: 24.013, letterSpacing: 4.96, family: "MiSans" },
      { text: "0123456789?!@#$%^&*()", x: 320, y: 2893, size: 24, weight: 330, lineHeight: 24.013, letterSpacing: 4.96, family: "MiSans" },
      { text: "标题", x: 1137, y: 2607, size: 48, weight: 330, family: "MiSans" },
      { text: "副标题", x: 1137, y: 2716, size: 36, weight: 330, family: "MiSans" },
      { text: "小标题", x: 1137, y: 2809, size: 32, weight: 330, family: "MiSans" },
      { text: "正文", x: 1137, y: 2896, size: 20, weight: 330, family: "MiSans" },
      { text: "48px", x: 1526, y: 2630, size: 20, weight: 330 },
      { text: "36px", x: 1526, y: 2727, size: 20, weight: 330 },
      { text: "32px", x: 1526, y: 2821, size: 20, weight: 330 },
      { text: "20px", x: 1526, y: 2896, size: 20, weight: 330 },
      {
        text: "无衬线字体的应用可以让设计作品更加现代化和具有时代感。它给人一种简洁、现代、科技感强的印象，它的简洁明快的特点可以让用户更快速地获取信息。",
        x: 1139,
        y: 2959,
        width: 461,
        size: 18,
        weight: 330,
        lineHeight: 28,
        family: "MiSans"
      },
      { text: "主题色", x: 367, y: 3754, size: 36, weight: 630 },
      { text: "#086ADB", x: 367, y: 3802, size: 32, weight: 330, color: "rgba(255,255,255,0.8)" },
      { text: "#333333", x: 1082, y: 3457, size: 32, weight: 330, color: "rgba(255,255,255,0.8)" },
      { text: "#666666", x: 1082, y: 3617, size: 32, weight: 330, color: "rgba(255,255,255,0.8)" },
      { text: "#FFFFFF", x: 1082, y: 3781, size: 32, weight: 330, color: "rgba(0,0,0,0.8)" },
      { text: "页面展示", x: 864, y: 4057, size: 48, weight: 630, family: "MiSans" },
      { text: "THANKS", x: 840, y: 8821, size: 48, weight: 380 }
    ]
  },
  {
    height: 9605,
    rects: [
      { x: 148, y: 1525, w: 2, h: 147, color: "#ffffff", z: 20 },
      { x: 159, y: 6426, w: 2, h: 73, color: "#ffffff", z: 20 },
      { x: 1769, y: 8376, w: 2, h: 73, color: "#ffffff", z: 20 }
    ],
    images: [
      { src: `/assets/figma-dev/web-xinxin-bg-bottom.png`, x: -2020, y: 8087, w: 3968, h: 9803 },
      { src: `/assets/figma-dev/web-xinxin-bg-main.png`, x: -2020, y: 0, w: 3968, h: 9803 },
      { src: `${S}/图层_9.png`, x: 1212, y: 8672, w: 884, h: 815 },
      { src: `${S}/图层_9_拷贝.png`, x: -213, y: 7680, w: 623, h: 575 },
      { src: `${S}/图层_8.png`, x: -620, y: -344, w: 2896, h: 1827 },
      { src: `${S}/图层_7.png`, x: 708, y: 533.943, w: 504.338, h: 85.115 },
      { src: `${S}/创_芯引领 智慧生活.png`, x: 410, y: 1012, w: 209, h: 116 },
      { src: `${S}/FireShot_Capture_011_-_青岛信芯微电子科技股份有限公司-信芯微官网_-_www.hi-image.cn.png`, x: 399.913, y: 2980.415, w: 1121.233, h: 3059.323 },
      { src: `${S}/FireShot_Capture_014_-_行业新闻_-_信芯微电子科技有限公司_-_www.hi-image.cn.png`, x: 657, y: 6283, w: 1111, h: 1500 },
      { src: `${S}/FireShot_Capture_012_-_关于信芯微_-_信芯微电子科技有限公司_-_www.hi-image.cn.png`, x: 120, y: 7217, w: 1225, h: 2026 }
    ],
    texts: [
      { text: "DESIGN", x: 81.81, y: 55.024, size: 18, weight: 400, family: "Helvetica" },
      { text: "2021", x: 1782.81, y: 55.024, size: 18, weight: 400, family: "Helvetica" },
      { text: "我们专注于技术创新，并用领先的\n产品推动智慧生活时代快步向前", x: 1063.568, y: 1012.049, size: 30, weight: 400, lineHeight: 54, family: "PingFang SC" },
      { text: "FONT", x: 894.094, y: 1481.247, size: 48, weight: 400, family: "Helvetica" },
      { text: "中文字体—", x: 1309.094, y: 1637.247, size: 36, weight: 400, family: "PingFang SC" },
      { text: "苹方", x: 1310.094, y: 1703.247, size: 60, weight: 400, family: "PingFang SC" },
      { text: "公司专注于液晶面板控制芯片及超高清图\n像处理芯片的开发，并逐渐扩展到所有显示\n相关领域。", x: 1311.88, y: 1834.779, size: 24, weight: 400, lineHeight: 36, family: "PingFang SC" },
      { text: "英文字体—", x: 148.094, y: 2218.247, size: 36, weight: 400, family: "PingFang SC" },
      { text: "DIN", x: 145.094, y: 2284.247, size: 60, weight: 500, family: "PingFang SC" },
      { text: "THE COMPANY FOCUSES ON THE\nDEVELOPMENT OF LCD PANEL\nCONTROL CHIP AND ULTRA-HIGH\nDEFINITION IMAGE PROCESSING CHIP,\nAND GRADUALLY EXPANDS TO ALL\nDISPLAY RELATED FIELDS,", x: 150.188, y: 2389.466, size: 24, weight: 400, lineHeight: 29, family: "PingFang SC" },
      { text: "Aa", x: 774.805, y: 1802.712, size: 337.082, weight: 400, family: "Helvetica" },
      { text: "DESGIN", x: 1515.732, y: 2485.354, size: 72, weight: 500, family: "PingFang SC" },
      { text: "首页展示", x: 864.422, y: 2782.478, size: 48, weight: 400, family: "PingFang SC" },
      { text: "HOME PAGE DISPLAY", x: 843.422, y: 2851.478, size: 24, weight: 500, family: "PingFang SC" },
      { text: "新闻中心", x: 148.422, y: 6278.478, size: 48, weight: 400, family: "PingFang SC" },
      { text: "NEWS CENTER", x: 152.422, y: 6347.478, size: 24, weight: 400, family: "PingFang SC" },
      { text: "关于信芯", x: 1579.422, y: 8247.478, size: 48, weight: 400, family: "PingFang SC" },
      { text: "ABOUT XINXIN", x: 1616.422, y: 8317.478, size: 24, weight: 400, family: "PingFang SC" }
    ]
  }
];

const dashboardFrames: Frame[] = [
  {
    height: 8916,
    hero: {
      title: "大屏设计",
      titleX: 665,
      titleY: 406,
      titleW: 600,
      titleH: 199,
      titleAlign: "center",
      descA: "公司数字孪生",
      descAX: 604,
      descAY: 785,
      descB: "实现降本增效和创新发展",
      descBX: 1062,
      descBY: 785
    },
    rects: [
      { x: 281, y: 286, w: 1368.474, h: 439.958, kind: "selection-box", color: "#ffffff", z: 2 },
      { x: 271, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 271, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 0, y: 2379, w: 1920, h: 1105, background: "linear-gradient(0deg, #a5b5ca 0%, #202932 100%)" },
      { x: 0, y: 3446, w: 1920, h: 180, color: "#c4d2e6" },
      { x: 0, y: 3446, w: 425, h: 182, color: "#687582" },
      { x: 0, y: 3626, w: 1920, h: 1128, color: "#ffffff" },
      { x: 188, y: 3769, w: 21, h: 21, kind: "diagonal-arrow", color: "#ffffff", opacity: 0.75, z: 4 },
      { x: 158, y: 3739, w: 81, h: 81, radius: 999, color: "#333333", z: 3 },
      { x: 0, y: 4754, w: 1920, h: 2932, color: "#000000" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670.168, y: 752.337, w: 58.832, h: 64.8 },
      { src: `${S}/Dim_Light_MacBook_Mockup_1.png`, x: 1, y: 1067, w: 1919, h: 1312 },
      { src: `${S}/Snipaste_2025-10-13_17-11-06.png`, x: 158, y: 2796, w: 1604, h: 650 },
      { src: `${S}/图层_1_5.png`, x: 594, y: 3875, w: 732, h: 594 },
      { src: `${S}/Snipaste_2025-10-13_17-11-41.png`, x: 158, y: 4918, w: 1603, h: 834 },
      { src: `${S}/Snipaste_2025-10-13_17-11-54.png`, x: 158, y: 5809, w: 1603, h: 833 },
      { src: `${S}/Snipaste_2025-10-13_17-12-11.png`, x: 158, y: 6698, w: 1603, h: 839 },
      { src: `${S}/2_26.png`, x: 1, y: 7686, w: 1920, h: 1230 }
    ],
    texts: [
      { text: "成都易得利数据大屏", x: 532, y: 834, size: 24, weight: 520 },
      { text: "根据用户需求进行设计", x: 1062, y: 834, size: 24, weight: 330, color: "rgba(255,255,255,0.8)" },
      { text: "制作背景", x: 864, y: 2517, size: 48, weight: 630 },
      {
        text: "在当前数字化转型浪潮中，传统制造业面临着生产效率提升、成本控制、质量优化等多重挑战。数字孪生技术通过构建物理实体的数字化镜像，实现虚实融合的智能管理，为企业提供了全新的解决方案。面对日益激烈的市场竞争和数字化转型的迫切需求，企业亟需通过数字孪生技术\n实现从传统制造向智能制造的转型升级。本项目旨在构建完整的数字孪生解决方案，帮助企业建立物理世界与数字世界的桥梁，实现生产制造的智能化、精细化管理，提升核心竞争力，在工业 4.0 时代占据有利地位。",
        x: 310,
        y: 2625,
        width: 1301,
        height: 80,
        size: 20,
        weight: 305,
        align: "center"
      },
      { text: "用户体验\n设计", x: 158, y: 3495, size: 32, weight: 305 },
      { text: "2024", x: 1688, y: 3495, size: 32, weight: 305, color: "#333333" },
      { text: "数字孪生系统", x: 1570, y: 3536, size: 32, weight: 305, color: "#333333" },
      { text: "AI", x: 886, y: 3495, size: 32, weight: 305, color: "#333333" },
      { text: "智能制造", x: 886, y: 3536, size: 32, weight: 305, color: "#333333" },
      { text: "产品目标", x: 158, y: 3842, size: 32, weight: 305, color: "#000000" },
      {
        text: "构建楼宇数字孪生智慧生态，实现物理与虚拟空间实时映射。通过 AI 驱动的智能分析和优化决策，推动楼宇管理从经验模式向数据智能转型。打造安全、高效、绿色、智能的现代化楼宇管理新范式，成为行业数字化转型标杆，引领智慧楼宇未来发展方向。\n",
        x: 348,
        y: 4077,
        width: 1224,
        height: 375,
        size: 36,
        color: "#333333",
        lineHeight: 54,
        align: "center"
      }
    ]
  },
  {
    height: 12492,
    fullImageSrc: "/assets/figma/7.png",
    background: "#ffffff",
    rects: [
      { x: 1385, y: 173, w: 206, h: 207, color: "#f3f5f7" },
      { x: 1178, y: 380, w: 207, h: 206, color: "#f3f5f7" },
      { x: 1591, y: 380, w: 207, h: 206, color: "#f3f5f7" },
      { x: 1385, y: 586, w: 206, h: 207, color: "#f3f5f7" },
      { x: 1798, y: 586, w: 207, h: 207, color: "#f3f5f7" },
      { x: 1643, y: 153, w: 103, h: 103, radius: 999, color: "#8cccf5", z: 2 },
      { x: 1666, y: 175, w: 60, h: 60, kind: "source-arrow", color: "#ffffff", z: 3 },
      { x: -129, y: 840, w: 1307, h: 987, radius: 24, color: "#e5e9ec" },
      { x: 1350, y: 1279, w: 20, h: 20, radius: 999, color: "#282828", z: 3 },
      { x: 1367, y: 1289, w: 181, h: 359, kind: "connector-right", color: "#333333", z: 3 },
      { x: 1548, y: 1627, w: 18.5, h: 20.5, kind: "connector-cap-right", color: "#333333", z: 3 },
      { x: 738, y: 1965, w: 1307, h: 987, radius: 24, color: "#e5e9ec" },
      { x: 524.5, y: 2337, w: 20, h: 20, radius: 999, color: "#282828", z: 3 },
      { x: 507.5, y: 2347, w: 181, h: 359, kind: "connector-left", color: "#333333", z: 3 },
      { x: 326.5, y: 2685, w: 18.5, h: 20.5, kind: "connector-cap-left", color: "#333333", z: 3 },
      { x: -129, y: 3113, w: 1307, h: 987, radius: 24, color: "#e5e9ec" },
      { x: 0, y: 4216, w: 1920, h: 180, color: "#f3f5f7" },
      { x: 0, y: 4387, w: 1920, h: 2932, color: "#000000" },
      { x: 1625, y: 4264, w: 86, h: 86, radius: 14, color: "#c3cfda", z: 2 },
      { x: 1694, y: 4333, w: 52, h: 52, kind: "triangle", color: "#ffffff", z: 3 },
      { x: 136, y: 9107, w: 60, h: 8, color: "#3271e6", z: 3 },
      { x: 136, y: 10514, w: 60, h: 8, color: "#3271e6", z: 3 },
      { x: 0, y: 7319, w: 1920, h: 180, color: "#f3f5f7" },
      { x: 133, y: 9197, w: 1656, h: 932, color: "#545f6f", opacity: 0.329, z: 2 },
      { x: 133.5, y: 9196.5, w: 1654, h: 931, color: "transparent", border: "#ffffff", borderWidth: 1, opacity: 0.329, z: 3 },
      { x: 162, y: 9256, w: 324, h: 191, color: "#4d658a", opacity: 0.6, z: 2 },
      { x: 162, y: 9465, w: 324, h: 300, color: "#4d658a", opacity: 0.588, z: 2 },
      { x: 162, y: 9783, w: 324, h: 329, color: "#4d658a", opacity: 0.588, z: 2 },
      { x: 504, y: 9256, w: 860, h: 473, color: "#4d658a", opacity: 0.588, z: 2 },
      { x: 504, y: 9747, w: 861, h: 365, color: "#4d658a", opacity: 0.588, z: 2 },
      { x: 1382, y: 9256, w: 377, h: 395, color: "#4d658a", opacity: 0.588, z: 2 },
      { x: 1383, y: 9669, w: 377, h: 442, color: "#4d658a", opacity: 0.588, z: 2 }
    ],
    images: [
      { src: `${S}/Snipaste_2025-10-13_17-12-27.png`, x: -455, y: 867, w: 1601, h: 834 },
      { src: `${S}/Snipaste_2025-10-13_17-12-43.png`, x: 770, y: 1995, w: 1601, h: 836 },
      { src: `${S}/Snipaste_2025-10-13_17-13-03.png`, x: -455, y: 3145, w: 1601, h: 834 },
      { src: `${S}/Snipaste_2025-10-13_17-13-51.png`, x: 184, y: 4590, w: 1553, h: 809 },
      { src: `${S}/Snipaste_2025-10-13_17-14-29.png`, x: 184, y: 5449, w: 1552, h: 807 },
      { src: `${S}/Snipaste_2025-10-13_17-15-10.png`, x: 184, y: 6306, w: 1553, h: 809 },
      { src: `/assets/figma-dev/dashboard-vector-bg.png`, x: 0, y: 7499, w: 1920, h: 4993, z: 0 },
      { src: `/assets/figma-dev/dashboard-clip-left.png`, x: -67, y: 8671, w: 862, h: 1155, z: 1 },
      { src: `/assets/figma-dev/dashboard-clip-right.png`, x: 2000, y: 10494, w: 849, h: 1155, z: 1 },
      { src: `/assets/figma-dev/dashboard-layer-1.png`, x: 0, y: 7499, w: 1920, h: 3195, z: 1 },
      { src: `${S}/组_1.png`, x: -207, y: 10659, w: 1992, h: 141, z: 9 },
      { src: `${S}/3213.png`, x: 131, y: 8024, w: 1658, h: 933, z: 10 },
      { src: `${S}/Group_210.png`, x: 127, y: 10794, w: 906, h: 471, z: 20 },
      { src: `${S}/Group_208.png`, x: 1095, y: 10794, w: 665, h: 629, z: 20 },
      { src: `${S}/Group_211_1.png`, x: 136, y: 11493, w: 1625.556, h: 836, z: 20 }
    ],
    texts: [
      { text: "数字孪生", x: 158, y: 99, size: 40, weight: 305, lineHeight: 54, color: "#333333" },
      { text: "数字孪生产线详览", x: 158, y: 173, size: 64, weight: 630, lineHeight: 54, color: "#000000" },
      {
        text: "通过点击特定的按钮，你可以看到相应的生产数据。我们使用不同的灯光颜色来指示每个机器当前的状态。",
        x: 906,
        y: 544,
        width: 866,
        size: 32,
        weight: 305,
        lineHeight: 48,
        color: "#000000"
      },
      { text: "按钮点击之前页面", x: 92, y: 1738, size: 40, weight: 305, lineHeight: 48, color: "#000000" },
      { text: "产线视角", x: 905, y: 2868, size: 40, weight: 305, lineHeight: 48, color: "#000000" },
      { text: "产线细节展示效果", x: 92, y: 4016, size: 40, weight: 305, lineHeight: 48, color: "#000000" },
      { text: "数字孪生其他页面", x: 158, y: 4284, size: 48, weight: 380, lineHeight: 48, color: "#000000" },
      { text: "profect", x: 131, y: 7579.672, size: 18, weight: 400, family: "Arial" },
      { text: "2025", x: 1750.141, y: 7579.672, size: 18, weight: 400, family: "Arial" },
      { text: "成都易得利大屏数据可视化", x: 528, y: 7741.848, size: 72, weight: 630 },
      { text: "LARGE SCREEN DATA VISUALIZATION", x: 713.242, y: 7853.848, size: 30, weight: 400, family: "Segoe UI", color: "#3becf7" },
      { text: "主界面", x: 136.445, y: 9037.551, size: 36, weight: 400, family: "Yu Gothic UI", z: 4 },
      { text: "组件", x: 132.445, y: 10444.551, size: 36, weight: 400, family: "Microsoft JhengHei UI", z: 4 },
      { text: "1085*588", x: 844, y: 9465, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "1085*474", x: 845, y: 9902, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "377*384", x: 234, y: 9920, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "377*354", x: 234, y: 9588, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "377*288", x: 234, y: 9324, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "381*556", x: 1482, y: 9863, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "381*506", x: 1481, y: 9426, size: 48, weight: 400, family: "Arial", z: 4 },
      { text: "多种尺寸的布局,保证界面规整的同时也兼顾了排版的灵活性", x: 514.68, y: 10210.133, size: 30, weight: 400, family: "Yu Gothic UI", z: 4 },
      { text: "Thanks", x: 882, y: 7377, size: 48, weight: 380, color: "#000000" }
    ]
  }
];

const c4dFrames: Frame[] = [
  {
    height: 6775,
    hero: {
      title: "C4D练习",
      titleX: 650,
      titleY: 399,
      titleW: 620,
      titleH: 199,
      descA: "游玩小场景",
      descAX: 757,
      descAY: 785,
      descB: "C4D作品练习",
      descBX: 1019,
      descBY: 785,
      subtitle: {
        text: "游玩小场景                    C4D作品练习",
        parts: [
          { text: "游玩小场景                    ", weight: 520, color: "#ffffff" },
          { text: "C4D作品练习", weight: 330, color: "rgba(255,255,255,0.8)" }
        ],
        x: 757,
        y: 785,
        size: 24,
        weight: 520,
        lineHeight: 24.013,
        family: "MiSans",
        wrap: false
      }
    },
    rects: [
      { x: 281.232, y: 285.947, w: 1368.474, h: 439.958, kind: "selection-box", color: "#ffffff", z: 2 },
      { x: 271, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 271, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 0, y: 1080, w: 1920, h: 5695, color: "#ffffff" },
      { x: 1758, y: 1261, w: 195, h: 1, color: "#000000" },
      { x: 160, y: 1264, w: 30, h: 30, radius: 999, color: "#609997" },
      { x: 165, y: 1229, w: 50, h: 50, radius: 999, color: "#ffba00" },
      { x: 165, y: 1791, w: 83, h: 83, radius: 999, color: "#ffba00" },
      { x: 197.5, y: 1741.5, w: 19, h: 19, radius: 999, color: "transparent", border: "#ac7d00", borderWidth: 1 },
      { x: 197.5, y: 1904.5, w: 19, h: 19, radius: 999, color: "transparent", border: "#ac7d00", borderWidth: 1 },
      { x: 145, y: 2445, w: 62, h: 62, radius: 999, color: "#609997" },
      { x: 255, y: 2636, w: 1392, h: 20, radius: 999, color: "#609997" },
      { x: 255, y: 2706, w: 977, h: 20, radius: 999, color: "#98d89b" },
      { x: 255, y: 2780, w: 817, h: 20, radius: 999, color: "#f0aa6a" },
      { x: 165, y: 3469, w: 83, h: 83, radius: 999, color: "#ffba00" },
      { x: 197.5, y: 3419.5, w: 19, h: 19, radius: 999, color: "transparent", border: "#ac7d00", borderWidth: 1 },
      { x: 197.5, y: 3582.5, w: 19, h: 19, radius: 999, color: "transparent", border: "#ac7d00", borderWidth: 1 }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670.168, y: 752.337, w: 58.832, h: 64.8 },
      { src: `${S}/5555_1.png`, x: 473, y: 1182, w: 195, h: 133 },
      { src: `${S}/123_拷贝.png`, x: 527, y: 1389, w: 936, h: 936, radius: 468, shadow: "0 0 84px rgba(87,87,87,0.161)", imageX: 175, imageY: 1290, imageW: 1750.183, imageH: 1166.789 },
      { src: `${S}/圆角矩形_2.png`, x: 457, y: 3114, w: 1303, h: 863 },
      { src: `${S}/椭圆_5.png`, x: 951, y: 3086, w: 387, h: 387, radius: 194, shadow: "0 0 84px rgba(87,87,87,0.161)" },
      { src: `${S}/椭圆_5_拷贝_4.png`, x: 1439, y: 3148, w: 313, h: 313, radius: 157, shadow: "0 0 84px rgba(87,87,87,0.161)" },
      { src: `${S}/椭圆_5_拷贝.png`, x: 1194, y: 3601, w: 453, h: 453, radius: 227, shadow: "0 0 84px rgba(87,87,87,0.161)" },
      { src: `${S}/椭圆_5_拷贝_2.png`, x: 664, y: 3646, w: 363, h: 363, radius: 182, shadow: "0 0 84px rgba(87,87,87,0.161)" },
      { src: `${S}/椭圆_5_拷贝_3.png`, x: 494, y: 3270, w: 290, h: 290, radius: 145, shadow: "0 0 84px rgba(87,87,87,0.161)" },
      { src: `${S}/地图.png`, x: 164, y: 4343, w: 1596, h: 898 },
      { src: `${S}/123_拷贝_1.png`, x: 0, y: 5494, w: 1920, h: 1281 },
      { src: `${S}/地图_拷贝.png`, x: 597, y: 5593, w: 1328, h: 1083 }
    ],
    texts: [
      { text: "游玩小场景作品展示", x: 272.539, y: 1236.504, size: 24, weight: 400, color: "#000000", family: "PingFang SC" },
      { text: "CINEMA 4D", x: 1555.539, y: 1237.504, size: 36, weight: 380, color: "#000000", family: "MiSans" },
      { text: "C4D", x: 170, y: 1243, size: 20, weight: 400, family: "Helvetica" },
      { text: "设计展示", x: 159.539, y: 1381.504, size: 36, weight: 400, color: "#000000", family: "PingFang SC" },
      { text: "DESIGN CONCEPT", x: 159.539, y: 1435.504, size: 36, weight: 380, color: "#000000", family: "MiSans" },
      { text: "01", x: 187.984, y: 1809.484, size: 36, weight: 400, family: "Helvetica" },
      { text: "COLOR DOSPLAY", x: 164.977, y: 2454.547, size: 36, weight: 380, color: "#292929", family: "MiSans" },
      { text: "颜色展示", x: 164.977, y: 2512.547, size: 36, weight: 400, color: "#292929", family: "PingFang SC" },
      { text: "#609997", x: 255.094, y: 2601.172, size: 24, weight: 380, color: "#292929", family: "MiSans" },
      { text: "#98d89b", x: 255.094, y: 2674.172, size: 24, weight: 380, color: "#292929", family: "MiSans" },
      { text: "#f0aa6a", x: 255.094, y: 2745.172, size: 24, weight: 380, color: "#292929", family: "MiSans" },
      { text: "细节展示", x: 159.539, y: 2911.508, size: 36, weight: 400, color: "#000000", family: "PingFang SC" },
      { text: "DETAIL DISPLAY", x: 159.539, y: 2965.508, size: 36, weight: 380, color: "#000000", family: "MiSans" },
      { text: "02", x: 187.984, y: 3487.484, size: 36, weight: 400, family: "Helvetica" },
      { text: "白模展示", x: 159.539, y: 4171.5, size: 36, weight: 400, color: "#000000", family: "PingFang SC" },
      { text: "WHITE FILM DISPLAY", x: 159.539, y: 4225.5, size: 36, weight: 380, color: "#000000", family: "MiSans" },
      { text: "场景展示", x: 159.539, y: 5373.5, size: 36, weight: 400, color: "#000000", family: "PingFang SC" },
      { text: "SCENE DISPLAY", x: 159.539, y: 5427.5, size: 36, weight: 380, color: "#000000", family: "MiSans" }
    ]
  }
];

const graphicFrames: Frame[] = [
  {
    height: 9833,
    background: "#ffffff",
    rects: [
      { x: 0, y: 1080, w: 1920, h: 1193, color: "#e7f2ff" },
      { x: 0, y: 2273, w: 1920, h: 1080, color: "#575757" },
      { x: 0, y: 3353, w: 1920, h: 1080, color: "#fbfbfb" },
      { x: 1, y: 0, w: 1920, h: 1080, color: "#070709" },
      { x: 281.232, y: 285.947, w: 1368.474, h: 439.958, kind: "selection-box", color: "#ffffff", z: 2 },
      { x: 271, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 274.863, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 271, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 938.611, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 1638.621, y: 714.821, w: 21.316, h: 21.316, color: "#ffffff", z: 2 },
      { x: 0, y: 4433, w: 1920, h: 1080, color: "#ffffff" },
      { x: 0, y: 5513, w: 1920, h: 1080, color: "#fffbf2" },
      { x: 0, y: 6593, w: 1920, h: 1080, color: "#efefef" },
      { x: 985, y: 4869, w: 107, h: 107, radius: 999, color: "#214182" },
      { x: 1171, y: 4869, w: 107, h: 107, radius: 999, color: "#911e41" },
      { x: 1357, y: 4869, w: 107, h: 107, radius: 999, color: "#e2cb8f" },
      { x: 985, y: 5905, w: 107, h: 107, radius: 999, color: "#fff6e2" },
      { x: 1171, y: 5905, w: 107, h: 107, radius: 999, color: "#8b985b" },
      { x: 1357, y: 5905, w: 107, h: 107, radius: 999, color: "#ec925f" },
      { x: 985, y: 6984, w: 107, h: 107, radius: 999, color: "#ff894c" },
      { x: 1171, y: 6984, w: 107, h: 107, radius: 999, color: "#efefef" },
      { x: 1357, y: 6984, w: 107, h: 107, radius: 999, color: "#9e2e23" },
      { x: 0, y: 7673, w: 1920, h: 1080, color: "#c5c5c5" },
      { x: 0, y: 8753, w: 1920, h: 1080, color: "#ebebeb" },
      { x: 985, y: 8041, w: 107, h: 107, radius: 999, color: "#333942" },
      { x: 1171, y: 8041, w: 107, h: 107, radius: 999, color: "#e0e4ea" },
      { x: 1357, y: 8041, w: 107, h: 107, radius: 999, color: "#7ca7cd" },
      { x: 985, y: 9135, w: 107, h: 107, radius: 999, color: "#2f3236" },
      { x: 1171, y: 9135, w: 107, h: 107, radius: 999, color: "#e0e4ea" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670.168, y: 752.337, w: 58.832, h: 64.8 },
      { src: `${S}/5555_1.png`, x: 1095, y: 1114, w: 195, h: 133 },
      { src: `${S}/Desktop_-_5_1.png`, x: 210, y: 1369, w: 1500, h: 844 },
      { src: `${S}/Desktop_-_3_1.png`, x: 210, y: 2450, w: 1500, h: 843 },
      { src: `${S}/中文版_1.png`, x: 210, y: 3519, w: 1500, h: 844 },
      { src: `${S}/图层_10_1.png`, x: 235, y: 4516, w: 617, h: 864 },
      { src: `${S}/fanbaba_A_picture_of_a_traditional_Chinese_festival_a_little_bo_c_upscayl_4x_realesrgan-x4plus_1_1.png`, x: 227, y: 5575, w: 617, h: 957 },
      { src: `${S}/32133_2.png`, x: 1171, y: 5702, w: 125, h: 77 },
      { src: `${S}/画板_1_3.png`, x: 266, y: 6654, w: 539, h: 957 },
      { src: `${S}/logo5_1.png`, x: 248, y: 7806, w: 575, h: 767 },
      { src: `${S}/image_2.png`, x: 168, y: 8877, w: 735, h: 813 }
    ],
    texts: [
      { text: "平面设计", x: 660, y: 399, width: 600, height: 199, size: 150, weight: 520, color: "#86df2a", family: "MiSans" },
      { text: "2.5d流程图", x: 621, y: 785, size: 24, weight: 520, family: "MiSans" },
      { text: "海报设计", x: 652, y: 834, size: 24, weight: 520, family: "MiSans" },
      { text: "使流程清晰化", x: 1062, y: 785, size: 24, weight: 330, color: "rgba(255,255,255,0.8)", family: "MiSans" },
      { text: "通过AIGC生成节日海报", x: 1062, y: 834, size: 24, weight: 330, color: "rgba(255,255,255,0.8)", family: "MiSans" },
      { text: "2.5D流程图展示", x: 788, y: 1131, size: 48, weight: 380, color: "#000000", family: "MiSans" },
      { text: "大米加工工厂2.5D图", x: 740, y: 1246, size: 48, weight: 380, color: "#0078b8", family: "MiSans" },
      { text: "工业生产2.5D流程图", x: 740, y: 2330, size: 48, weight: 380, color: "#ffce1a", family: "MiSans" },
      { text: "公司系统间交互图", x: 768, y: 3410, size: 48, weight: 380, color: "#333333", family: "MiSans" },
      { text: "复旦大学EMBA\n亚马逊云科技创新文化\n交流会设计", parts: [{ text: "复旦大学EMBA\n", color: "#666666", weight: 305 }, { text: "亚马逊云科技创新文化\n交流会设计", color: "#333333", weight: 630 }], x: 985, y: 4617, width: 480, size: 48, weight: 305, color: "#333333", family: "MiSans" },
      { text: "主题色", x: 1003, y: 4995, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "辅助色", x: 1189, y: 4995, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "点缀色", x: 1375, y: 4995, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "设计理念", x: 985, y: 5110, size: 32, weight: 630, color: "#333333", family: "MiSans" },
      { text: "采用蓝色和白色为主色调，现代简约风格，带有网格背景和几何图形装饰，\n本次设计以\"科技创新与文化融合\" 为核心主题，旨在打造一个专业、现代且富有\n科技感的交流平台视觉形象。设计目标是通过视觉语言传达亚马逊云科技\n的创新精神与复旦大学的学术底蕴，为企业数字化转型提供思想碰撞的舞台。", x: 985, y: 5171, width: 700, size: 20, weight: 305, color: "#333333", family: "MiSans" },
      { text: "SOTHIS\n中秋节节日海报设计", parts: [{ text: "SOTHIS\n", color: "#666666", weight: 305 }, { text: "中秋节节日海报设计", color: "#333333", weight: 630 }], x: 985, y: 5715, width: 432, size: 48, weight: 305, color: "#333333", family: "MiSans" },
      { text: "主题色", x: 1003, y: 6031, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "辅助色", x: 1189, y: 6031, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "点缀色", x: 1375, y: 6031, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "设计理念", x: 985, y: 6125, size: 32, weight: 630, color: "#333333", family: "MiSans" },
      { text: "这张端午节主题的海报是由AI生成，以 \"端午安康\" 为核心设计理念，巧妙融合了传统文化符号与现代审美表达。画面采用温暖的橙绿配色方案，既体现了端午节的热烈氛围，又传递出自然和谐的意境。构图上，通过环绕的祥龙与竞渡的龙舟形成动静对比，小男孩的天真笑容为传统节日注入了青春活力。背景的山水祥云元素展现了中国传统绘画的意境美，而船上的粽子等传统食品则强化了节日的文化内涵。整体设计既尊重了端午节的历史传统。", x: 987, y: 6186, width: 698, height: 206, size: 20, weight: 305, color: "#333333", family: "MiSans" },
      { text: "SOTHIS\n父亲节节日海报设计", parts: [{ text: "SOTHIS\n", color: "#666666", weight: 305 }, { text: "父亲节节日海报设计", color: "#333333", weight: 630 }], x: 985, y: 6798, width: 432, size: 48, weight: 305, color: "#333333", family: "MiSans" },
      { text: "主题色", x: 1003, y: 7110, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "辅助色", x: 1189, y: 7110, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "点缀色", x: 1375, y: 7110, size: 24, weight: 305, color: "#000000", family: "MiSans" },
      { text: "设计理念", x: 985, y: 7200, size: 32, weight: 630, color: "#333333", family: "MiSans" },
      { text: "本设计的核心创意将卡通超人形象的头部巧妙替换为 SOTHIS 的产品，形成 \"产品即头部\" 的独特视觉符号。这一创新设计不仅打破了传统父亲节广告的刻板印象，更在深层次上传达了深刻的情感内涵 —— 父亲就像家庭的 \"核心处理器\"，用他们的 \"核心\" 力量默默守护着家人的幸福。普通的产品（代表平凡）与超人的英雄形象（代表伟大）形成强烈对比，完美诠释了 \"爸爸只是一个普通人但他永远是我的超人\" 的深刻主题。", x: 987, y: 7261, width: 698, height: 206, size: 20, weight: 305, color: "#333333", family: "MiSans" },
      { text: "SOTHIS\nS20产品海报AI设计", parts: [{ text: "SOTHIS\n", color: "#ffffff", weight: 305 }, { text: "S20产品海报AI设计", color: "#ffffff", weight: 630 }], x: 985, y: 7855, width: 433, size: 48, weight: 305, color: "#ffffff", family: "MiSans" },
      { text: "主题色", x: 1003, y: 8167, size: 24, weight: 305, color: "#ffffff", family: "MiSans" },
      { text: "辅助色", x: 1189, y: 8167, size: 24, weight: 305, color: "#ffffff", family: "MiSans" },
      { text: "点缀色", x: 1375, y: 8167, size: 24, weight: 305, color: "#ffffff", family: "MiSans" },
      { text: "设计理念", x: 985, y: 8257, size: 32, weight: 630, color: "#ffffff", family: "MiSans" },
      { text: "本项目为索提斯 S20 智能边缘网关打造的官方宣传海报，全程以chatgpt-image2 为核心生产力工具，通过分层式提示词工程、\"文生图打底 + 图生图校准 + 局部重绘\" 的三级控图流程，系统性解决了 AI 生成工业产品时比例失调、细节失真的通病，彻底颠覆了传统 \"棚拍 + 3D 建模\" 的高成本长周期模式，将项目周期从 7 天压缩至 2 天、制作成本降低 85%，实现了媲美影视级 3D 渲染的沉浸式科技视觉效果。", x: 987, y: 8318, width: 698, height: 206, size: 20, weight: 305, color: "#ffffff", family: "MiSans" },
      { text: "SOTHIS\nS20产品网页首页AI设计", parts: [{ text: "SOTHIS\n", color: "#252525", weight: 305 }, { text: "S20产品网页首页AI设计", color: "#252525", weight: 630 }], x: 985, y: 8949, width: 529, size: 48, weight: 305, color: "#252525", family: "MiSans" },
      { text: "主题色", x: 1003, y: 9261, size: 24, weight: 305, color: "#252525", family: "MiSans" },
      { text: "辅助色", x: 1189, y: 9261, size: 24, weight: 305, color: "#252525", family: "MiSans" },
      { text: "设计理念", x: 985, y: 9351, size: 32, weight: 630, color: "#252525", family: "MiSans" },
      { text: "索提斯 S20 智能边缘网关官网产品页，全流程 AI 赋能设计。用chatgpt-image2 生成视觉并通过参考图控图实现跨物料统一，AI 辅助撰写全部产品文案与功能描述，解决传统 3D 建模 + 文案撰写成本高、周期长痛点，项目周期从 5 天压缩至 1.5 天、成本降 70%，已上线并沉淀可复用 B 端 AI 设计工作流。", x: 987, y: 9412, width: 698, height: 206, size: 20, weight: 305, color: "#252525", family: "MiSans" }
    ]
  }
];

const framesBySlug: Record<string, Frame[]> = {
  "b-system": bSystemFrames,
  "web-design": webFrames,
  "app-design": appFrames,
  dashboard: dashboardFrames,
  "c4d-practice": c4dFrames,
  graphic: graphicFrames
};

function Hero({ hero, images }: { hero: NonNullable<Frame["hero"]>; images?: ImageLayer[] }) {
  const heroOverlayImages = images?.filter((image) => image.y < 1000);
  const heroBodyImages = images?.filter((image) => image.y >= 1000);

  return (
    <>
      {heroOverlayImages?.map((image) => <ImageLayerView key={`${image.src}-${image.x}-${image.y}`} image={{ ...image, eager: true }} />)}
      <p
        className="motion-title-shine absolute m-0 whitespace-nowrap font-['MiSans'] leading-none"
        data-motion-layer="text"
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
        <TextLayerView text={hero.subtitle} />
      ) : (
        <>
          <p
            className="absolute m-0 whitespace-nowrap font-['MiSans'] leading-none"
            data-motion-layer="text"
            style={{ left: px(hero.descAX), top: px(hero.descAY), fontSize: px(24), fontWeight: hero.descAWeight ?? 520, lineHeight: px(24.01), color: "#ffffff" }}
          >
            {hero.descA}
          </p>
          <p
            className="absolute m-0 whitespace-nowrap font-['MiSans'] leading-none"
            data-motion-layer="text"
            style={{ left: px(hero.descBX), top: px(hero.descBY), fontSize: px(24), fontWeight: hero.descBWeight ?? 330, lineHeight: px(24.01), color: "rgba(255,255,255,0.8)" }}
          >
            {hero.descB}
          </p>
        </>
      )}
      {heroBodyImages?.map((image) => <ImageLayerView key={`${image.src}-${image.x}-${image.y}`} image={{ ...image, eager: image.y < 2400 }} />)}
    </>
  );
}

function ImageLayerView({ image }: { image: ImageLayer }) {
  const loading = image.eager ? "eager" : "lazy";
  const fetchPriority = image.eager ? "high" : "auto";

  if (image.imageX !== undefined && image.imageY !== undefined && image.imageW !== undefined && image.imageH !== undefined) {
    return (
      <div
        className="absolute overflow-hidden"
        data-motion-layer="image"
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
          src={image.src}
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
        data-motion-layer="image"
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
          src={image.src}
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
      src={image.src}
      alt=""
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={image.cover ? "absolute h-full w-full object-cover" : "absolute max-w-none object-fill"}
      data-motion-layer="image"
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

function RectLayerView({ rect }: { rect: RectLayer }) {
  const seamBleed = 0;

  if (rect.kind === "source-arrow") {
    return (
      <svg
        className="absolute overflow-visible"
        data-motion-layer="selection"
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
        data-motion-layer="selection"
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
        data-motion-layer="shape"
        style={{
          left: px(rect.x),
          top: px(rect.y),
          width: px(rect.w),
          height: px(rect.h),
          background: rect.background ?? rect.color,
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
      data-motion-layer="shape"
      style={{
        left: px(rect.x),
        top: px(rect.y),
        width: px(rect.w + seamBleed),
        height: px(rect.h + seamBleed),
        background: rect.background ?? rect.color,
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

function TextLayerView({ text }: { text: TextLayer }) {
  const preserveLineBreaks = text.width || text.text.includes("\n");
  const whitespaceClass = text.wrap === false ? "whitespace-pre" : preserveLineBreaks ? "whitespace-pre-wrap" : "whitespace-nowrap";
  const fontFamily = text.family === "Helvetica" ? "Helvetica, Arial, sans-serif" : text.family ?? "MiSans";
  const fontWeight = text.weight ?? 305;

  return (
    <p
      className={`absolute m-0 font-['MiSans'] ${whitespaceClass}`}
      data-motion-layer="text"
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

function AppPageCarousel() {
  return (
    <div className="absolute" style={{ left: px(4), top: px(8512), width: px(1912), height: px(940) }}>
      <CarouselSwiper slides={appGalleryCards} width={1912} height={940} />
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
  const [scale, setScale] = useState(1);

  useEffect(() => {
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

  if (!frames) {
    return null;
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-black">
      <PortfolioMotion className="min-h-screen">
      {frames.map((frame, index) => (
        <section
          key={`${slug}-${index}`}
          className="mx-auto w-full max-w-[1920px] overflow-hidden"
          data-motion-reveal
          data-motion-start={index === 0 ? "true" : undefined}
          style={{ background: frame.background ?? "#070709", "--motion-delay": index === 0 ? "0ms" : `${Math.min(index * 90, 240)}ms` } as CSSProperties}
        >
          <div
            className="relative w-full"
            style={{
              height: px(frame.height * scale),
              background: frame.background ?? "#070709"
            }}
          >
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: px(1920),
                height: px(frame.height),
                background: frame.background ?? "#070709",
                transform: `scale(${scale})`
              }}
            >
              {frame.fullImageSrc ? (
                <ImageLayerView image={{ src: frame.fullImageSrc, x: 0, y: 0, w: 1920, h: frame.height, eager: index === 0 }} />
              ) : (
                <>
                  {frame.rects?.map((rect) => <RectLayerView key={`${rect.x}-${rect.y}-${rect.w}-${rect.h}`} rect={rect} />)}
                  {frame.hero ? (
                    <Hero hero={frame.hero} images={frame.images} />
                  ) : (
                    frame.images
                      ?.filter((image) => !(slug === "app-design" && index === 1 && appGalleryImageSources.has(image.src)))
                      .map((image) => <ImageLayerView key={`${image.src}-${image.x}-${image.y}`} image={{ ...image, eager: index === 0 && image.y < 2400 }} />)
                  )}
                  {frame.texts?.map((text) => <TextLayerView key={`${text.text}-${text.x}-${text.y}`} text={text} />)}
                  {slug === "b-system" && index === 0 ? <BSystemSpecTable /> : null}
                  {slug === "app-design" && index === 1 ? <AppPageCarousel /> : null}
                </>
              )}
            </div>
          </div>
        </section>
      ))}
      </PortfolioMotion>
    </main>
  );
}




