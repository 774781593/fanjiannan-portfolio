"use client";

import { useEffect, useRef, useState } from "react";

type ImageLayer = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z?: number;
  rotate?: number;
  opacity?: number;
  cover?: boolean;
  radius?: number;
};

type TextLayer = {
  text: string;
  x: number;
  y: number;
  size: number;
  weight?: number;
  z?: number;
  color?: string;
  opacity?: number;
  width?: number;
  lineHeight?: number;
  letterSpacing?: number;
  family?: string;
};

type RectLayer = {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  background?: string;
  radius?: number;
  z?: number;
  opacity?: number;
  border?: string;
  borderWidth?: number;
  borderStyle?: string;
};

type Frame = {
  height: number;
  images?: ImageLayer[];
  texts?: TextLayer[];
  rects?: RectLayer[];
  hero?: {
    title: string;
    titleX: number;
    titleY: number;
    descA: string;
    descAX: number;
    descAY: number;
    descB: string;
    descBX: number;
    descBY: number;
  };
};

const S = "/assets/slices";

const px = (value: number) => `${value}px`;

const moveArrow: ImageLayer = {
  src: `${S}/4214_1.png`,
  x: 1670.17,
  y: 752.34,
  w: 58.832,
  h: 64.8
};

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
    images: [moveArrow]
  },
  {
    height: 11725,
    rects: [
      { x: 0, y: 2003, w: 1920, h: 9722, color: "#090a0f" },
      { x: 102.5, y: 2424, w: 1715, h: 919, radius: 84, background: "linear-gradient(180deg, #2e4fb8 0%, #090a0f 100%)" },
      { x: 102.25, y: 3653, w: 848, h: 1006, radius: 60, background: "linear-gradient(180deg, #0b1834 0%, #16274c 100%)" },
      { x: 969.25, y: 3653, w: 847, h: 1006, radius: 60, background: "linear-gradient(180deg, #13203e 0%, #354c79 100%)" },
      { x: 102.25, y: 4678, w: 848, h: 1006, radius: 60, background: "linear-gradient(180deg, #000000 0%, #274cc4 100%)" },
      { x: 969.25, y: 4678, w: 847, h: 201.2, radius: 60, color: "#ffffff" },
      { x: 969.25, y: 4879, w: 847, h: 201.2, color: "#d8d8d8" },
      { x: 969.25, y: 5080, w: 847, h: 201.2, color: "#000000" },
      { x: 969.25, y: 5281, w: 847, h: 201.2, color: "#7e3385" },
      { x: 969.25, y: 5482, w: 847, h: 201.2, radius: 60, color: "#264bc1" },
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
      { src: `${S}/注射.png`, x: 245, y: 6044, w: 1428, h: 893, radius: 24 },
      { src: `/assets/figma-dev/app/essence-open.png`, x: 316, y: 7287, w: 102, h: 102 },
      { src: `/assets/figma-dev/app/hyaluronic.png`, x: 603, y: 7275, w: 138, h: 138 },
      { src: `/assets/figma-dev/app/resource-management.png`, x: 335, y: 7594, w: 92, h: 92 },
      { src: `/assets/figma-dev/app/medicine-library.png`, x: 625, y: 7589, w: 102, h: 102 },
      { src: `${S}/wifi.png`, x: -86, y: 8619, w: 1120, h: 701, opacity: 0.2 },
      { src: `${S}/记忆.png`, x: 882, y: 8622, w: 1116, h: 698, opacity: 0.2 },
      { src: `${S}/首页.png`, x: 239, y: 8521, w: 1434, h: 897, radius: 24 },
      { src: `${S}/首页.png`, x: 892, y: 9639, w: 1106, h: 692, radius: 24, opacity: 0.2 },
      { src: `${S}/记忆.png`, x: 241, y: 9536, w: 1438, h: 900, radius: 26 },
      { src: `${S}/记忆.png`, x: -86, y: 10657, w: 1109, h: 694, radius: 26, opacity: 0.2 },
      { src: `${S}/wifi.png`, x: 239, y: 10554, w: 1434, h: 897, radius: 26 }
    ],
    texts: [
      { text: "2024", x: 77, y: 53, size: 24 },
      { text: "UX/UI", x: 1779, y: 53, size: 24 },
      { text: "颜层美容针界面设计", x: 528, y: 388, size: 96, weight: 600 },
      { text: "项目背调", x: 207, y: 2140, size: 64, weight: 500 },
      { text: "设计规范", x: 207, y: 3480, size: 64, weight: 500 },
      { text: "参数设置页面", x: 207, y: 5821, size: 64, weight: 500 },
      { text: "其他页面", x: 207, y: 8266, size: 64, weight: 500 },
      { text: "让肌肤重焕光彩", x: 207, y: 2740, size: 48, weight: 500 },
      {
        text: "颜层是一款现代美容仪器，它将美容针通过科学注射方式将营养成分输送到皮肤深层，能够有效实现补水保湿、减少皱纹、提亮肤色、紧致提升和改善肤质等多重美容效果。",
        x: 207,
        y: 2875,
        width: 637,
        size: 24,
        weight: 300,
        lineHeight: 36
      },
      { text: "主要字体", x: 239, y: 3753, size: 32 },
      { text: "辅助字体", x: 1112, y: 3753, size: 32 },
      { text: "PingFang\nSans SC", x: 207, y: 3833, size: 64 },
      { text: "Arial", x: 1080, y: 3833, size: 128 },
      { text: "#000000", x: 207, y: 4742, size: 48, weight: 300 },
      { text: "#274CC4", x: 207, y: 5559, size: 48, weight: 300 },
      { text: "#FFFFFF", x: 1080, y: 4744, size: 48, weight: 300, color: "#000000" },
      { text: "#D8D8D8", x: 1080, y: 4956, size: 48, weight: 300, color: "#000000" },
      { text: "#000000", x: 1080, y: 5157, size: 48, weight: 300 },
      { text: "#7E3385", x: 1080, y: 5358, size: 48, weight: 300 },
      { text: "#274CC4", x: 1080, y: 5557, size: 48, weight: 300 },
      { text: "精华液", x: 327, y: 7413, size: 36, weight: 500 },
      { text: "玻尿酸", x: 622, y: 7413, size: 36, weight: 500 },
      { text: "资源管理", x: 307, y: 7714, size: 36, weight: 500 },
      { text: "药品库", x: 622, y: 7714, size: 36, weight: 500 },
      { text: "THANKS", x: 831, y: 11615, size: 64, weight: 500 }
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
      { x: 137, y: 3944, w: 714, h: 480, radius: 28, color: "#252525", border: "rgba(255,255,255,0.35)", borderWidth: 2, borderStyle: "dashed" },
      { x: 880, y: 3896, w: 714, h: 450, radius: 28, color: "#252525", border: "rgba(255,255,255,0.35)", borderWidth: 2, borderStyle: "dashed" },
      { x: 1620, y: 3784, w: 714, h: 500, radius: 28, color: "#252525", border: "rgba(255,255,255,0.35)", borderWidth: 2, borderStyle: "dashed" },
      { x: 135, y: 2576, w: 1650, h: 252, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1 },
      { x: 135, y: 2920, w: 1213, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1369, y: 2920, w: 1213, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: -100, y: 3071, w: 917, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 838, y: 3071, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 29, y: 3222, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1024, y: 3222, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 133, y: 6720, w: 330, h: 104, color: "rgba(255,255,255,0.08)" },
      { x: 133, y: 6824, w: 330, h: 104, color: "rgba(47,81,255,0.95)" },
      { x: 133, y: 6928, w: 330, h: 104, color: "rgba(80,109,255,0.95)" },
      { x: 133, y: 7032, w: 550, h: 104, color: "rgba(255,255,255,0.08)" },
      { x: 683, y: 7032, w: 550, h: 104, color: "rgba(255,255,255,0.08)" },
      { x: 1233, y: 7032, w: 550, h: 104, color: "rgba(255,255,255,0.08)" },
      { x: 1833, y: 3071, w: 974, h: 127, radius: 24, color: "#202020", border: "#515151", borderWidth: 1 },
      { x: 1413, y: 2643, w: 115, h: 115, radius: 999, color: "transparent", border: "#81c478", borderWidth: 7, z: 8 },
      { x: 1465, y: 2643, w: 115, h: 115, radius: 999, color: "transparent", border: "#3bbca6", borderWidth: 7, z: 7 },
      { x: 1517, y: 2643, w: 115, h: 115, radius: 999, color: "transparent", border: "#7d78c4", borderWidth: 7, z: 6 },
      { x: 1569, y: 2643, w: 115, h: 115, radius: 999, color: "#2c2c2c", border: "#6a6879", borderWidth: 7, z: 5 },
      { x: 1632, y: 2766, w: 101, h: 35, color: "#81c478", z: 9 },
      { x: 463, y: 6720, w: 330, h: 104, color: "#2f51ff" },
      { x: 463, y: 6824, w: 330, h: 104, color: "#e6e8eb" },
      { x: 463, y: 6928, w: 165, h: 104, color: "#d4d6d9" },
      { x: 628, y: 6928, w: 165, h: 104, color: "#e8edff" },
      { x: 133, y: 7136, w: 330, h: 104, color: "#ffa940" },
      { x: 463, y: 7136, w: 220, h: 104, color: "#fed591" },
      { x: 683, y: 7136, w: 330, h: 104, color: "#39c62c" },
      { x: 1013, y: 7136, w: 220, h: 104, color: "#89e078" },
      { x: 1233, y: 7136, w: 330, h: 104, color: "#ff4d50" },
      { x: 1563, y: 7136, w: 220, h: 104, color: "#ffa39e" },
      { x: 133, y: 7240, w: 330, h: 104, color: "#d46b08" },
      { x: 463, y: 7240, w: 110, h: 104, color: "#ffe7ba" },
      { x: 573, y: 7240, w: 110, h: 104, color: "#fff7e6" },
      { x: 683, y: 7240, w: 330, h: 104, color: "#049402" },
      { x: 1013, y: 7240, w: 110, h: 104, color: "#b4eda8" },
      { x: 1123, y: 7240, w: 110, h: 104, color: "#e6fae1" },
      { x: 1233, y: 7240, w: 330, h: 104, color: "#ce1322" },
      { x: 1563, y: 7240, w: 110, h: 104, color: "#ffccc7" },
      { x: 1673, y: 7240, w: 110, h: 104, color: "#fff2f0" },
      { x: 793, y: 6720, w: 330, h: 78, color: "#ffffff" },
      { x: 793, y: 6720, w: 330, h: 78, color: "#000000", opacity: 0.88 },
      { x: 793, y: 6798, w: 330, h: 78, color: "#ffffff" },
      { x: 793, y: 6798, w: 330, h: 78, color: "#000000", opacity: 0.65 },
      { x: 793, y: 6876, w: 330, h: 78, color: "#ffffff" },
      { x: 793, y: 6876, w: 330, h: 78, color: "#000000", opacity: 0.45 },
      { x: 793, y: 6954, w: 330, h: 78, color: "#ffffff" },
      { x: 793, y: 6954, w: 330, h: 78, color: "#000000", opacity: 0.25 },
      { x: 1123, y: 6720, w: 330, h: 78, color: "#ffffff" },
      { x: 1123, y: 6720, w: 330, h: 78, color: "#000000", opacity: 0.15 },
      { x: 1123, y: 6798, w: 330, h: 78, color: "#ffffff" },
      { x: 1123, y: 6798, w: 330, h: 78, color: "#000000", opacity: 0.06 },
      { x: 1123, y: 6876, w: 330, h: 78, color: "#ffffff" },
      { x: 1123, y: 6876, w: 330, h: 78, color: "#000000", opacity: 0.04 },
      { x: 1123, y: 6954, w: 330, h: 78, color: "#ffffff" },
      { x: 1123, y: 6954, w: 330, h: 78, color: "#000000", opacity: 0.02 },
      { x: 1453, y: 6720, w: 330, h: 156, color: "#d9d9d9" },
      { x: 1453, y: 6876, w: 330, h: 156, color: "rgba(240,240,240,0.94)" },
      { x: 138, y: 7397, w: 497, h: 227, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1 },
      { x: 138, y: 7650, w: 497, h: 227, radius: 24, color: "#242424", border: "#8c8c8c", borderWidth: 1 },
      { x: 661, y: 7397, w: 1122, h: 49, color: "#242424", border: "#8c8c8c", borderWidth: 1 },
      { x: 661, y: 7518, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7590, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7662, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7734, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7806, w: 1122, h: 1, color: "#515151" },
      { x: 661, y: 7877, w: 1122, h: 1, color: "#515151" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670, y: 752, w: 59, h: 65 },
      { src: `${S}/5555_1.png`, x: 599, y: 1301, w: 198, h: 135, z: 3 },
      { src: `${S}/图片扩图_1.png`, x: -55, y: 1022, w: 2340, h: 1132 },
      { src: `${S}/Ellipse 1051.png`, x: 1413, y: 2643, w: 115, h: 115, z: 4 },
      { src: `${S}/Ellipse 1050.png`, x: 1465, y: 2643, w: 115, h: 115, z: 3 },
      { src: `${S}/Ellipse 1049.png`, x: 1517, y: 2643, w: 115, h: 115, z: 2 },
      { src: `${S}/Ellipse 1052.png`, x: 1569, y: 2643, w: 115, h: 115, z: 1 },
      { src: `${S}/Ellipse 1053.png`, x: 190, y: 2947, w: 74, h: 74 },
      { src: `${S}/Ellipse 1054.png`, x: 1425, y: 2947, w: 74, h: 74 },
      { src: `${S}/Ellipse 1055.png`, x: -45, y: 3098, w: 74, h: 74 },
      { src: `${S}/Ellipse 1056.png`, x: 896, y: 3098, w: 74, h: 74 },
      { src: `${S}/Ellipse 1057.png`, x: 84, y: 3249, w: 74, h: 74 },
      { src: `${S}/Ellipse 1058.png`, x: 1085, y: 3249, w: 74, h: 74 },
      { src: `${S}/Group 1940698317.png`, x: 1146, y: 4752, w: 569, h: 441 },
      { src: `${S}/4214_1.png`, x: 1783, y: 4267, w: 59, h: 65 },
      { src: `${S}/image_1.png`, x: 133, y: 5653, w: 1648, h: 674 },
      { src: `${S}/选框.png`, x: 125, y: 6710, w: 1710, h: 636, opacity: 0.55 }
    ],
    texts: [
      { text: "INDUSTRIAL DESIGN", x: 134, y: 1144, size: 18, color: "rgba(255,255,255,0.5)" },
      { text: "Publication date\nOctober 2023", x: 1644, y: 1144, size: 16, lineHeight: 24, color: "rgba(255,255,255,0.5)" },
      { text: "中微EMS能源管理系统", x: 133, y: 1325, size: 48, weight: 400 },
      { text: "Zhongwei EMS Energy Management System", x: 133, y: 1384, size: 18, color: "rgba(255,255,255,0.5)" },
      {
        text: "随着企业数字化与“双碳”战略的推进，传统能源管理方式逐渐暴露出数据分散、监控滞后、能耗分析困难以及人工统计效率低等问题。为了提升企业能源使用效率与设备运维能力，我参与开发了 EMS 能源管理平台。该平台围绕“能源数据统一接入、实时监控、智能分析”展开建设，通过整合电、水、气等多类型能源数据，实现企业能耗的可视化管理与精细化运营，为节能降耗和智慧运维提供数据支撑。",
        x: 134,
        y: 1468,
        width: 852,
        size: 20,
        lineHeight: 30
      },
      { text: "任务协同", x: 160, y: 1691, size: 20, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "系统监控", x: 310, y: 1691, size: 20, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "能源管理", x: 160, y: 1752, size: 20, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "数据可视化", x: 314, y: 1752, size: 20, color: "rgba(255,255,255,0.7)", z: 3 },
      { text: "目标人群", x: 180, y: 2019, size: 24, weight: 500, color: "#333333", lineHeight: 30, z: 3 },
      { text: "管理员", x: 211, y: 2103, size: 20, color: "#333333", lineHeight: 30, z: 4 },
      { text: "运维人员", x: 358, y: 2103, size: 20, color: "#333333", lineHeight: 30, z: 4 },
      { text: "数据监控人员", x: 209, y: 2164, size: 20, color: "#333333", lineHeight: 30, z: 4 },
      { text: "核心痛点", x: 579, y: 2019, size: 24, weight: 500, color: "#333333", lineHeight: 30, z: 3 },
      { text: "数据查看效率低不突出\n信息层级混乱\n告警不突出\n多系统切换复杂", x: 579, y: 2080, width: 281, size: 20, color: "#333333", lineHeight: 30, z: 3 },
      { text: "我的职责", x: 978, y: 2019, size: 24, weight: 500, lineHeight: 30, z: 3 },
      {
        text: "负责 EMS 能源管理平台整体 UI 视觉设计与界面风格制定\n参与前期需求分析与产品功能梳理，输出页面信息架构与交互逻辑\n负责后台管理系统、数据可视化页面设计\n根据业务场景设计图表、数据卡片、状态组件等可视化模块，提升数据展示效率\n制定统一的设计规范与组件库，保证产品视觉一致性与开发协作效率\n输出高保真设计稿、交互动效及开发标注，并与前端协同完成设计落地\n持续优化用户体验与界面细节，提升系统易用性与整体视觉品质",
        x: 978,
        y: 2064,
        width: 752,
        size: 20,
        lineHeight: 30,
        z: 3
      },
      { text: "需求调研", x: 133, y: 2438, size: 36, weight: 500 },
      { text: "Requirement Investigation", x: 133, y: 2485, size: 20, color: "rgba(255,255,255,0.5)" },
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
      { text: "目标人群", x: 1650, y: 2774, size: 16, weight: 400, lineHeight: 19.2, z: 10 },
      { text: "产品目标", x: 133, y: 3482, size: 36, weight: 500 },
      { text: "Product Objectives", x: 133, y: 3529, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "产品目标与价值主要是为企业达成降本、增效、提准三方面的问题。为企业的智能化管理护航。", x: 133, y: 3620, width: 840, size: 20 },
      { text: "降本", x: 135, y: 3864, size: 48, weight: 700, color: "#81d828" },
      { text: "增效", x: 882, y: 3780, size: 48, weight: 700, color: "#81d828" },
      { text: "提准", x: 1628, y: 3704, size: 48, weight: 700, color: "#81d828" },
      {
        text: "通过 EMS 能源管理平台对企业电、水、气等能源数据进行统一采集与集中管理，帮助企业实时掌握各区域、各设备的能耗情况，及时发现异常能耗与资源浪费问题。\n系统通过能耗趋势分析、峰谷用电分析及异常告警等功能，辅助企业优化能源使用策略，减少不必要的能源消耗，从而降低整体运营成本与人工巡检成本。",
        x: 248,
        y: 4020,
        width: 520,
        size: 30,
        lineHeight: 48,
        color: "rgba(255,255,255,0.86)"
      },
      {
        text: "传统能源管理依赖人工记录与线下巡检，存在数据更新不及时、处理效率低等问题。EMS 平台通过实时监控、自动告警、数据可视化及报表自动生成等功能，提高企业日常管理效率与运维响应速度。\n管理人员可通过平台快速查看关键数据与设备运行状态，减少重复操作与人工统计流程，提升整体协同效率。",
        x: 948,
        y: 3970,
        width: 570,
        size: 30,
        lineHeight: 48,
        color: "rgba(255,255,255,0.86)"
      },
      {
        text: "平台通过统一的数据标准与可视化分析能力，对能源数据进行实时采集、统计与分析，减少人工统计误差，提高数据准确性与可靠性。\n同时，通过多维度数据分析与历史趋势对比，帮助企业更精准地识别高能耗问题与设备异常情况，为节能优化与运营决策提供可靠的数据支撑。",
        x: 1692,
        y: 3864,
        width: 520,
        size: 30,
        lineHeight: 48,
        color: "rgba(255,255,255,0.86)"
      },
      { text: "设计目标与价值主要是从用户体验五要素中的表现层、框架层、结构层出发，最大化增强用户体验，辅助提升产品力。", x: 133, y: 4540, width: 1040, size: 20 },
      { text: "表现层", x: 135, y: 4661, size: 32, weight: 500, color: "#81d828" },
      {
        text: "视觉设计:统一视觉规范、提升视觉体验\n遵循简约高效设计原则，视觉及降噪，统一设计规范和组件，向用户清晰高效的传达信息",
        x: 135,
        y: 4725,
        width: 780,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 36
      },
      { text: "框架层", x: 135, y: 4849, size: 32, weight: 500, color: "#81d828" },
      {
        text: "框架、布局、界面设计:统一组件规范、交互友好高效\n梳理审核人员的审核操作流程，与任务操作习惯，合理布局页面信息与操作按钮，以提供高效的任务处理方案",
        x: 135,
        y: 4913,
        width: 780,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 36
      },
      { text: "结构层", x: 135, y: 5073, size: 32, weight: 500, color: "#81d828" }
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
      { text: "功能架构", x: 135, y: 5378, size: 36, weight: 500 },
      { text: "Functional Architecture", x: 135, y: 5425, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "支持能源数据监测、设备运行管理、能耗分析统计、异常告警、能源流向分析、报表管理、数据可视化及系统配置等功能。", x: 133, y: 5516, width: 1080, size: 20 },
      { text: "设计规范", x: 135, y: 6460, size: 36, weight: 500 },
      { text: "Design Specification", x: 135, y: 6507, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "通过避循设计规范、使用组件库，以确保项目的用户界面和用户体验在整个平台中是一致的，提高用户对产品的认知和使用便捷性", x: 133, y: 6598, width: 1140, size: 20 },
      { text: "主题色", x: 156, y: 6736, size: 24, weight: 500 },
      { text: "#2F51FF", x: 156, y: 6778, size: 20 },
      { text: "悬停", x: 156, y: 6843, size: 24, weight: 500 },
      { text: "#506DFF", x: 156, y: 6885, size: 20 },
      { text: "按压", x: 156, y: 6945, size: 24, weight: 500 },
      { text: "#2744D6", x: 156, y: 6987, size: 20 },
      { text: "警告色", x: 156, y: 7049, size: 24, weight: 500 },
      { text: "#FA8C16", x: 156, y: 7091, size: 20 },
      { text: "悬停", x: 156, y: 7153, size: 24, weight: 500 },
      { text: "#FFA940", x: 156, y: 7195, size: 20 },
      { text: "按压", x: 156, y: 7257, size: 24, weight: 500 },
      { text: "#D46B08", x: 156, y: 7299, size: 20 },
      { text: "禁用", x: 484, y: 6843, size: 24, weight: 500, color: "#3054ca" },
      { text: "#E6E8EB", x: 484, y: 6885, size: 20, color: "#3054ca" },
      { text: "边框", x: 484, y: 6945, size: 24, weight: 500, color: "#3054ca" },
      { text: "#D4D6D9", x: 484, y: 6987, size: 20, color: "#3054ca" },
      { text: "填充", x: 649, y: 6945, size: 24, weight: 500, color: "#3054ca" },
      { text: "#E8EDFF", x: 649, y: 6987, size: 20, color: "#3054ca" },
      { text: "禁用", x: 478, y: 7155, size: 24, weight: 500, color: "#d46b08" },
      { text: "#FED591", x: 478, y: 7197, size: 20, color: "#d46b08" },
      { text: "边框", x: 478, y: 7257, size: 24, weight: 500, color: "#d46b08" },
      { text: "#FFE7BA", x: 478, y: 7299, size: 20, color: "#d46b08" },
      { text: "填充", x: 587, y: 7257, size: 24, weight: 500, color: "#d46b08" },
      { text: "#FFF7E6", x: 587, y: 7299, size: 20, color: "#d46b08" },
      { text: "成功色", x: 706, y: 7049, size: 24, weight: 500 },
      { text: "#15BA0C", x: 706, y: 7091, size: 20 },
      { text: "悬停", x: 706, y: 7153, size: 24, weight: 500 },
      { text: "#39C62C", x: 706, y: 7195, size: 20 },
      { text: "按压", x: 706, y: 7257, size: 24, weight: 500 },
      { text: "#049402", x: 706, y: 7299, size: 20 },
      { text: "禁用", x: 1028, y: 7155, size: 24, weight: 500, color: "#049402" },
      { text: "#89E078", x: 1028, y: 7197, size: 20, color: "#049402" },
      { text: "边框", x: 1028, y: 7257, size: 24, weight: 500, color: "#049402" },
      { text: "#B4EDA8", x: 1028, y: 7299, size: 20, color: "#049402" },
      { text: "填充", x: 1137, y: 7257, size: 24, weight: 500, color: "#049402" },
      { text: "#E6FAE1", x: 1137, y: 7299, size: 20, color: "#049402" },
      { text: "错误色", x: 1256, y: 7049, size: 24, weight: 500 },
      { text: "#F6222F", x: 1256, y: 7091, size: 20 },
      { text: "悬停", x: 1256, y: 7153, size: 24, weight: 500 },
      { text: "#FF4D50", x: 1256, y: 7195, size: 20 },
      { text: "按压", x: 1256, y: 7257, size: 24, weight: 500 },
      { text: "#CE1322", x: 1256, y: 7299, size: 20 },
      { text: "禁用", x: 1578, y: 7155, size: 24, weight: 500, color: "#ce1322" },
      { text: "#FFA39E", x: 1578, y: 7197, size: 20, color: "#ce1322" },
      { text: "边框", x: 1578, y: 7257, size: 24, weight: 500, color: "#ce1322" },
      { text: "#FFCCC7", x: 1578, y: 7299, size: 20, color: "#ce1322" },
      { text: "填充", x: 1687, y: 7257, size: 24, weight: 500, color: "#ce1322" },
      { text: "#FFF2F0", x: 1687, y: 7299, size: 20, color: "#ce1322" },
      { text: "一级文本", x: 822, y: 6743, size: 24, weight: 500 },
      { text: "二级文本", x: 822, y: 6821, size: 24, weight: 500 },
      { text: "三级文本", x: 822, y: 6899, size: 24, weight: 500 },
      { text: "四级文本", x: 822, y: 6977, size: 24, weight: 500 },
      { text: "一级填充", x: 1152, y: 6743, size: 24, weight: 500, color: "#000000", opacity: 0.88 },
      { text: "二级填充", x: 1152, y: 6821, size: 24, weight: 500, color: "#000000", opacity: 0.88 },
      { text: "三级填充", x: 1152, y: 6899, size: 24, weight: 500, color: "#000000", opacity: 0.88 },
      { text: "四级填充", x: 1152, y: 6977, size: 24, weight: 500, color: "#000000", opacity: 0.88 },
      { text: "一级边框", x: 1482, y: 6743, size: 24, weight: 500, color: "#000000", opacity: 0.88 },
      { text: "#D9D9D9", x: 1482, y: 6780, size: 20, color: "#000000", opacity: 0.88 },
      { text: "二级边框", x: 1482, y: 6899, size: 24, weight: 500, color: "#000000", opacity: 0.88 },
      { text: "#F0F0F0", x: 1482, y: 6936, size: 20, color: "#000000", opacity: 0.88 },
      { text: "中文", x: 188, y: 7438, size: 24, weight: 500 },
      { text: "PingFangSC", x: 188, y: 7489, size: 64, weight: 500, family: "PingFang SC" },
      { text: "数字", x: 188, y: 7691, size: 24, weight: 500 },
      { text: "MiSans", x: 188, y: 7742, size: 64, weight: 500, family: "MiSans" },
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
      { text: "提示文本", x: 1562, y: 7826, size: 24 }
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
      { text: "登录页", x: 138, y: 48, size: 36, weight: 500 },
      { text: "Login Page", x: 138, y: 95, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "首页", x: 138, y: 1388, size: 36, weight: 500 },
      { text: "Home Page", x: 138, y: 1435, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "整体设计理念", x: 1036, y: 1550, size: 32, weight: 500, color: "#81d828" },
      {
        text: "页面以“能源数据集中监控”为核心，通过园区总览、能耗分析、趋势变化及功能导航等模块，帮助用户快速掌握整体能源运行状态。\n设计上采用后台管理系统常见的「左侧导航 + 中心内容 + 数据分析」布局结构，强化信息层级与数据可读性，提升企业能源管理效率。",
        x: 1036,
        y: 1606,
        width: 781,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 30
      },
      { text: "左侧导航区", x: 1036, y: 1788, size: 32, weight: 500, color: "#81d828" },
      {
        text: "建立清晰的信息层级\n采用树状菜单结构，将复杂功能分类归纳，降低后台系统的信息复杂度。\n\n提升高频操作效率\n高频功能常驻左侧，减少用户频繁跳转，提高运维人员日常使用效率。\n\n强化工业平台稳定感\n整体采用浅灰背景与线性图标设计，减少视觉干扰，突出数据内容本身。",
        x: 1036,
        y: 1844,
        width: 781,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 29
      },
      { text: "核心视觉区", x: 138, y: 2085, size: 32, weight: 500, color: "#81d828" },
      {
        text: "场景化能源监控\n通过园区实景图结合设备定位，将抽象数据转化为可视化场景，提高用户对园区整体运行状态的理解效率。\n\n强化空间感知\n用户能够快速定位不同区域与设备状态，提升异常问题排查效率。\n\n提升平台科技感\n采用大图展示与场景化设计，增强平台视觉冲击力与数字化体验。",
        x: 138,
        y: 2141,
        width: 811,
        size: 20,
        lineHeight: 29
      },
      { text: "数据分析可视化模块", x: 1036, y: 2136, size: 32, weight: 500, color: "#81d828" },
      {
        text: "通过图表化与数据可视化设计，将复杂的能源数据转化为更加直观的信息展示方式，帮助用户快速了解园区整体能耗情况、能源变化趋势以及设备运行状态。\n页面采用环形图、柱状图与折线图等多种图表形式，对不同区域、不同时间维度的数据进行分类展示，方便用户快速识别高能耗区域与异常波动情况，提升数据分析效率与管理决策能力。\n通过数据可视化与模块化布局设计，将复杂能源数据更直观地呈现给用户，提升数据分析效率、异常问题识别能力以及整体能源管理体验。",
        x: 1036,
        y: 2192,
        width: 775,
        size: 20,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 30
      },
      { text: "能耗分析页", x: 138, y: 2535, size: 36, weight: 500 },
      { text: "Energy Analysis Page", x: 138, y: 2582, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "工业能源管理系统的能耗分析功能可直观展示能源消耗数据，帮助企业发现节能潜力，优化能源使用效率，降低运营成本，支持科学决策和可持续发展目标的实现。", x: 138, y: 2673, width: 1645, size: 20 },
      { text: "光伏发电页", x: 138, y: 3699, size: 36, weight: 500 },
      { text: "Photovoltaic Power Page", x: 138, y: 3746, size: 20, color: "rgba(255,255,255,0.5)" },
      { text: "光伏发电模块使用柱状图可以直观展示不同类别数据的数值大小，便于快速比较差异；清晰呈现数据之间的关系和趋势", x: 138, y: 3837, width: 1645, size: 20 },
      { text: "页面展示", x: 138, y: 4848, size: 36, weight: 500 },
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
      { x: 321, y: 3086, w: 658, h: 792, radius: 24, color: "#086adb" },
      { x: 1027, y: 3398, w: 573, h: 160, radius: 24, color: "#333333" },
      { x: 1027, y: 3558, w: 573, h: 160, color: "#666666" },
      { x: 1027, y: 3718, w: 573, h: 160, radius: 24, color: "#ffffff" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670, y: 752, w: 59, h: 65 },
      { src: `${S}/Image0001_1.png`, x: 1, y: 1080, w: 1920, h: 1223 },
      { src: `${S}/5555_1.png`, x: 1379, y: 1252, w: 195, h: 133 },
      { src: `${S}/图层_3.png`, x: 192, y: 4216, w: 1538, h: 775, radius: 24 },
      { src: `${S}/Snipaste_2025-10-13_14-47-39.png`, x: 192, y: 5041, w: 1538, h: 859, radius: 24 },
      { src: `${S}/Snipaste_2025-10-13_14-49-01.png`, x: 190, y: 5950, w: 1541, h: 861, radius: 24 },
      { src: `${S}/Snipaste_2025-10-13_14-48-35.png`, x: 192, y: 6861, w: 1537, h: 860, radius: 24 },
      { src: `${S}/Snipaste_2025-10-13_14-48-50.png`, x: 191, y: 7771, w: 1540, h: 863, radius: 24 }
    ],
    texts: [
      { text: "信芯网页设计", x: 624, y: 828, size: 24, weight: 600 },
      { text: "根据用户需求采用商务风格进行设计", x: 912, y: 828, size: 24, color: "rgba(255,255,255,0.8)" },
      { text: "SOTHIS S20", x: 519, y: 1228, size: 96, weight: 700, family: "Druk Wide" },
      { text: "页面原型、UI设计制作", x: 801, y: 1364, size: 32, family: "MiSans" },
      { text: "苹方", x: 320, y: 2607, size: 128, weight: 700, family: "MiSans" },
      { text: "PingFang Sans", x: 320, y: 2761, size: 32, color: "#a69f9f", family: "MiSans" },
      { text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789?!@#$%^&*()", x: 320, y: 2829, size: 24, lineHeight: 32, letterSpacing: 5, family: "MiSans" },
      { text: "标题", x: 1137, y: 2607, size: 48, family: "MiSans" },
      { text: "副标题", x: 1137, y: 2716, size: 36, family: "MiSans" },
      { text: "小标题", x: 1137, y: 2809, size: 32, family: "MiSans" },
      { text: "正文", x: 1137, y: 2896, size: 20, family: "MiSans" },
      { text: "48px", x: 1526, y: 2630, size: 20 },
      { text: "36px", x: 1526, y: 2727, size: 20 },
      { text: "32px", x: 1526, y: 2821, size: 20 },
      { text: "20px", x: 1526, y: 2896, size: 20 },
      {
        text: "无衬线字体的应用可以让设计作品更加现代化和具有时代感。它给人一种简洁、现代、科技感强的印象，它的简洁明快的特点可以让用户更快速地获取信息。",
        x: 1139,
        y: 2959,
        width: 461,
        size: 18,
        lineHeight: 28,
        family: "MiSans"
      },
      { text: "主题色", x: 367, y: 3754, size: 36, weight: 700 },
      { text: "#086ADB", x: 367, y: 3802, size: 32, color: "rgba(255,255,255,0.8)" },
      { text: "#333333", x: 1082, y: 3457, size: 32, color: "rgba(255,255,255,0.8)" },
      { text: "#666666", x: 1082, y: 3617, size: 32, color: "rgba(255,255,255,0.8)" },
      { text: "#FFFFFF", x: 1082, y: 3781, size: 32, color: "rgba(0,0,0,0.8)" },
      { text: "页面展示", x: 864, y: 4057, size: 48, weight: 700, family: "MiSans" },
      { text: "THANKS", x: 840, y: 8821, size: 48, weight: 700 }
    ]
  },
  {
    height: 9605,
    rects: [
      { x: 148, y: 1525, w: 0, h: 147, border: "#ffffff", borderWidth: 2 },
      { x: 159, y: 6426, w: 0, h: 73, border: "#ffffff", borderWidth: 2 },
      { x: 1769, y: 8376, w: 0, h: 73, border: "#ffffff", borderWidth: 2 }
    ],
    images: [
      { src: `${S}/图层_8.png`, x: -620, y: -344, w: 2896, h: 1827 },
      { src: `${S}/图层_7.png`, x: 708, y: 534, w: 504, h: 85 },
      { src: `${S}/FireShot_Capture_011_-_青岛信芯微电子科技股份有限公司-信芯微官网_-_www.hi-image.cn.png`, x: 400, y: 2980, w: 1121, h: 3059 },
      { src: `${S}/FireShot_Capture_014_-_行业新闻_-_信芯微电子科技有限公司_-_www.hi-image.cn.png`, x: 657, y: 6283, w: 1111, h: 1500 },
      { src: `${S}/FireShot_Capture_012_-_关于信芯微_-_信芯微电子科技有限公司_-_www.hi-image.cn.png`, x: 120, y: 7217, w: 1225, h: 2026 },
      { src: `${S}/图层_9.png`, x: 1212, y: 8672, w: 884, h: 815 },
      { src: `${S}/图层_9_拷贝.png`, x: -213, y: 7680, w: 623, h: 575 }
    ],
    texts: [
      { text: "DESIGN", x: 82, y: 55, size: 18, family: "Druk Wide" },
      { text: "2021", x: 1783, y: 55, size: 18, family: "Druk Wide" },
      { text: "我们专注于技术创新，并用领先的\n产品推动智慧生活时代快步向前", x: 1064, y: 1012, size: 30, lineHeight: 54, family: "PingFang SC" },
      { text: "创'芯引领 智慧生活", x: 410, y: 1012, size: 76, weight: 700, family: "PingFang SC" },
      { text: "FONT", x: 894, y: 1481, size: 48, family: "Druk Wide" },
      { text: "中文字体—", x: 1309, y: 1637, size: 36, family: "PingFang SC" },
      { text: "苹方", x: 1310, y: 1703, size: 60, family: "PingFang SC" },
      { text: "公司专注于液晶面板控制芯片及超高清图\n像处理芯片的开发，并逐渐扩展到所有显示\n相关领域。", x: 1312, y: 1835, size: 24, lineHeight: 36, family: "PingFang SC" },
      { text: "英文字体—", x: 148, y: 2218, size: 36, family: "PingFang SC" },
      { text: "DIN", x: 145, y: 2284, size: 60, family: "Druk Wide" },
      { text: "THE COMPANY FOCUSES ON THE\nDEVELOPMENT OF LCD PANEL\nCONTROL CHIP AND ULTRA-HIGH\nDEFINITION IMAGE PROCESSING CHIP,\nAND GRADUALLY EXPANDS TO ALL\nDISPLAY RELATED FIELDS,", x: 150, y: 2389, size: 24, lineHeight: 29, family: "Druk Wide" },
      { text: "Aa", x: 775, y: 1803, size: 337, family: "Druk Wide" },
      { text: "DESGIN", x: 1516, y: 2485, size: 72, family: "Druk Wide" },
      { text: "首页展示", x: 864, y: 2782, size: 48, family: "PingFang SC" },
      { text: "HOME PAGE DISPLAY", x: 843, y: 2851, size: 24, family: "Druk Wide" },
      { text: "新闻中心", x: 148, y: 6278, size: 48, family: "PingFang SC" },
      { text: "NEWS CENTER", x: 152, y: 6347, size: 24, family: "Druk Wide" },
      { text: "关于信芯", x: 1579, y: 8247, size: 48, family: "PingFang SC" },
      { text: "ABOUT XINXIN", x: 1616, y: 8317, size: 24, family: "Druk Wide" }
    ]
  }
];

const dashboardFrames: Frame[] = [
  {
    height: 8916,
    hero: {
      title: "大屏设计",
      titleX: 660,
      titleY: 399,
      descA: "公司数字孪生",
      descAX: 604,
      descAY: 785,
      descB: "实现降本增效和创新发展",
      descBX: 1062,
      descBY: 785
    },
    rects: [
      { x: 0, y: 2379, w: 1920, h: 1105, background: "linear-gradient(0deg, #a5b5ca 0%, #202932 100%)" },
      { x: 0, y: 3446, w: 1920, h: 180, color: "#c4d2e6" },
      { x: 0, y: 3446, w: 425, h: 182, color: "#687582" },
      { x: 0, y: 4754, w: 1920, h: 2932, color: "#000000" }
    ],
    images: [
      { src: `${S}/4214_1.png`, x: 1670, y: 752, w: 59, h: 65 },
      { src: `${S}/Dim_Light_MacBook_Mockup_1.png`, x: 1, y: 1067, w: 1919, h: 1312 },
      { src: `${S}/Snipaste_2025-10-13_17-11-06.png`, x: 158, y: 2796, w: 1604, h: 650 },
      { src: `${S}/图层_1_5.png`, x: 594, y: 3875, w: 732, h: 594 },
      { src: `${S}/Snipaste_2025-10-13_17-11-41.png`, x: 158, y: 4918, w: 1603, h: 834 },
      { src: `${S}/Snipaste_2025-10-13_17-11-54.png`, x: 158, y: 5809, w: 1603, h: 833 },
      { src: `${S}/Snipaste_2025-10-13_17-12-11.png`, x: 158, y: 6698, w: 1603, h: 839 },
      { src: `${S}/2_26.png`, x: 1, y: 7686, w: 1920, h: 1230 }
    ],
    texts: [
      { text: "成都易得利数据大屏", x: 532, y: 834, size: 24, weight: 600 },
      { text: "根据用户需求进行设计", x: 1062, y: 834, size: 24, weight: 400, color: "rgba(255,255,255,0.8)" },
      { text: "制作背景", x: 864, y: 2517, size: 48, weight: 700 },
      {
        text: "在当前数字化转型浪潮中，传统制造业面临着生产效率提升、成本控制、质量优化等多重挑战。数字孪生技术通过构建物理实体的数字化镜像，实现虚实融合的智能管理，为企业提供了全新的解决方案。面对日益激烈的市场竞争和数字化转型的迫切需求，企业亟需通过数字孪生技术\n实现从传统制造向智能制造的转型升级。本项目旨在构建完整的数字孪生解决方案，帮助企业建立物理世界与数字世界的桥梁，实现生产制造的智能化、精细化管理，提升核心竞争力，在工业 4.0 时代占据有利地位。",
        x: 309,
        y: 2625,
        width: 1301,
        size: 20,
        weight: 400,
        lineHeight: 40
      },
      { text: "用户体验\n设计", x: 158, y: 3495, size: 32, weight: 400 },
      { text: "2024", x: 1686, y: 3495, size: 32, color: "#333333" },
      { text: "数字孪生系统", x: 1586, y: 3536, size: 32, color: "#333333" },
      { text: "AI", x: 883, y: 3495, size: 32, color: "#333333" },
      { text: "智能制造", x: 886, y: 3536, size: 32, color: "#333333" },
      { text: "产品目标", x: 158, y: 3842, size: 32, color: "#000000" },
      {
        text: "构建楼宇数字孪生智慧生态，实现物理与虚拟空间实时映射。通过 AI 驱动的智能分析和优化决策，推动楼宇管理从经验模式向数据智能转型。打造安全、高效、绿色、智能的现代化楼宇管理新范式，成为行业数字化转型标杆，引领智慧楼宇未来发展方向。",
        x: 348,
        y: 4077,
        width: 1224,
        size: 36,
        color: "#333333",
        lineHeight: 54
      }
    ]
  },
  {
    height: 12492,
    images: [
      { src: `${S}/Snipaste_2025-10-13_17-12-27.png`, x: -455, y: 867, w: 1601, h: 834 },
      { src: `${S}/Snipaste_2025-10-13_17-12-43.png`, x: 770, y: 1995, w: 1601, h: 836 },
      { src: `${S}/Snipaste_2025-10-13_17-13-03.png`, x: -455, y: 3145, w: 1601, h: 834 },
      { src: `${S}/Snipaste_2025-10-13_17-13-51.png`, x: 184, y: 4590, w: 1553, h: 809 },
      { src: `${S}/Snipaste_2025-10-13_17-14-29.png`, x: 184, y: 5449, w: 1552, h: 807 },
      { src: `${S}/Snipaste_2025-10-13_17-15-10.png`, x: 184, y: 6306, w: 1553, h: 809 },
      { src: `${S}/3213.png`, x: 131, y: 8024, w: 1658, h: 933 },
      { src: `${S}/Group_210.png`, x: 127, y: 10794, w: 906, h: 471 },
      { src: `${S}/Group_208.png`, x: 1095, y: 10794, w: 665, h: 629 },
      { src: `${S}/Group_211_1.png`, x: 136, y: 11493, w: 1626, h: 836 }
    ]
  }
];

const c4dFrames: Frame[] = [
  {
    height: 6775,
    hero: {
      title: "C4D练习",
      titleX: 598,
      titleY: 399,
      descA: "三维视觉练习",
      descAX: 680,
      descAY: 785,
      descB: "产品质感、空间场景与视觉氛围探索",
      descBX: 912,
      descBY: 785
    },
    images: [
      { src: `${S}/4214_1.png`, x: 1670, y: 752, w: 59, h: 65 },
      { src: `${S}/123_拷贝.png`, x: 175, y: 1290, w: 1750, h: 1167 },
      { src: `${S}/圆角矩形_2.png`, x: 457, y: 3114, w: 1303, h: 863 },
      { src: `${S}/地图.png`, x: 164, y: 4343, w: 1596, h: 898 },
      { src: `${S}/123_拷贝_1.png`, x: 0, y: 5494, w: 1920, h: 1281 }
    ]
  }
];

const graphicFrames: Frame[] = [
  {
    height: 9833,
    hero: {
      title: "平面设计",
      titleX: 636,
      titleY: 399,
      descA: "Graphic Design",
      descAX: 700,
      descAY: 785,
      descB: "品牌物料、节日海报与视觉实验",
      descBX: 912,
      descBY: 785
    },
    images: [
      { src: `${S}/4214_1.png`, x: 1670, y: 752, w: 59, h: 65 },
      { src: `${S}/Desktop_-_5_1.png`, x: 210, y: 1369, w: 1500, h: 844 },
      { src: `${S}/Desktop_-_3_1.png`, x: 210, y: 2450, w: 1500, h: 843 },
      { src: `${S}/中文版_1.png`, x: 210, y: 3519, w: 1500, h: 844 },
      { src: `${S}/图层_10_1.png`, x: 235, y: 4516, w: 617, h: 864 },
      { src: `${S}/fanbaba_A_picture_of_a_traditional_Chinese_festival_a_little_bo_c_upscayl_4x_realesrgan-x4plus_1_1.png`, x: 227, y: 5575, w: 617, h: 957 },
      { src: `${S}/画板_1_3.png`, x: 266, y: 6654, w: 539, h: 957 },
      { src: `${S}/logo5_1.png`, x: 248, y: 7806, w: 575, h: 767 },
      { src: `${S}/image_2.png`, x: 168, y: 8877, w: 735, h: 813 }
    ]
  },
  {
    height: 1080,
    images: [
      { src: `${S}/Group 1940698330.png`, x: -184, y: -87, w: 2288, h: 1288 }
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

function SelectionFrame() {
  return (
    <div className="absolute contents">
      <div className="absolute border-2 border-dashed border-white/70" style={{ left: px(281.23), top: px(285.95), width: px(1368.474), height: px(439.958) }} />
      {[
        [271, 274.86],
        [1638.62, 274.86],
        [938.61, 274.86],
        [271, 714.82],
        [1638.62, 714.82],
        [938.61, 714.82]
      ].map(([x, y]) => (
        <span key={`${x}-${y}`} className="absolute block bg-white" style={{ left: px(x), top: px(y), width: px(21.316), height: px(21.316) }} />
      ))}
    </div>
  );
}

function Hero({ hero, images }: { hero: NonNullable<Frame["hero"]>; images?: ImageLayer[] }) {
  return (
    <>
      <SelectionFrame />
      <p className="absolute whitespace-nowrap font-['MiSans'] text-[150px] font-semibold uppercase leading-none text-[#86df2a]" style={{ left: px(hero.titleX), top: px(hero.titleY) }}>
        {hero.title}
      </p>
      <p className="absolute whitespace-nowrap font-['MiSans'] text-[24px] font-semibold uppercase leading-none text-white" style={{ left: px(hero.descAX), top: px(hero.descAY) }}>
        {hero.descA}
      </p>
      <p className="absolute whitespace-nowrap font-['MiSans'] text-[24px] font-normal uppercase leading-none text-white/80" style={{ left: px(hero.descBX), top: px(hero.descBY) }}>
        {hero.descB}
      </p>
      {images?.map((image) => <ImageLayerView key={`${image.src}-${image.x}-${image.y}`} image={image} />)}
    </>
  );
}

function ImageLayerView({ image }: { image: ImageLayer }) {
  return (
    <img
      src={image.src}
      alt=""
      loading="eager"
      decoding="async"
      className={image.cover ? "absolute h-full w-full object-cover" : "absolute max-w-none object-fill"}
      style={{
        left: px(image.x),
        top: px(image.y),
        width: px(image.w),
        height: px(image.h),
        zIndex: image.z,
        opacity: image.opacity,
        transform: image.rotate ? `rotate(${image.rotate}deg)` : undefined,
        borderRadius: image.radius ? px(image.radius) : undefined
      }}
    />
  );
}

function RectLayerView({ rect }: { rect: RectLayer }) {
  return (
    <div
      className="absolute"
      style={{
        left: px(rect.x),
        top: px(rect.y),
        width: px(rect.w),
        height: px(rect.h),
        background: rect.background ?? rect.color,
        borderRadius: rect.radius ? px(rect.radius) : undefined,
        zIndex: rect.z,
        opacity: rect.opacity,
        border: rect.border ? `${rect.borderWidth ?? 1}px ${rect.borderStyle ?? "solid"} ${rect.border}` : undefined
      }}
    />
  );
}

function TextLayerView({ text }: { text: TextLayer }) {
  return (
    <p
      className="absolute m-0 whitespace-pre-wrap font-['MiSans']"
      style={{
        left: px(text.x),
        top: px(text.y),
        width: text.width ? px(text.width) : undefined,
        fontFamily: text.family ?? "MiSans",
        fontSize: px(text.size),
        fontWeight: text.weight ?? 400,
        color: text.color ?? "#ffffff",
        opacity: text.opacity,
        zIndex: text.z,
        lineHeight: text.lineHeight ? px(text.lineHeight) : "normal",
        letterSpacing: text.letterSpacing ? px(text.letterSpacing) : undefined
      }}
    >
      {text.text}
    </p>
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
      {frames.map((frame, index) => (
        <section key={`${slug}-${index}`} className="mx-auto w-full max-w-[1920px] overflow-hidden bg-[#070709]">
          <div
            className="relative w-full"
            style={{
              height: px(frame.height * scale)
            }}
          >
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: px(1920),
                height: px(frame.height),
                transform: `scale(${scale})`
              }}
            >
              {frame.rects?.map((rect) => <RectLayerView key={`${rect.x}-${rect.y}-${rect.w}-${rect.h}`} rect={rect} />)}
              {frame.hero ? <Hero hero={frame.hero} images={frame.images} /> : frame.images?.map((image) => <ImageLayerView key={`${image.src}-${image.x}-${image.y}`} image={image} />)}
              {frame.texts?.map((text) => <TextLayerView key={`${text.text}-${text.x}-${text.y}`} text={text} />)}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
