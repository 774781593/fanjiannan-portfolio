export type Project = {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  year: string;
  summary: string;
  cover: string;
  gallery: string[];
  figma: string;
};

export const projects: Project[] = [
  {
    slug: "b-system",
    title: "中微 EMS 能源管理系统",
    category: "B端设计",
    eyebrow: "BUSINESS DESIGN",
    year: "2026",
    summary: "为了提升目标公司运营效率，实现设备、能耗统一管理。",
    cover: "/assets/slices/图片扩图_1.png",
    gallery: [
      "/assets/slices/Frame_1940698324.png",
      "/assets/slices/image_1.png",
      "/assets/slices/Snipaste_2025-10-13_17-11-06.png",
      "/assets/slices/Snipaste_2025-10-13_17-11-41.png"
    ],
    figma: "/assets/figma/2.png"
  },
  {
    slug: "web-design",
    title: "信芯微官网",
    category: "网页设计",
    eyebrow: "WEB DESIGN",
    year: "2026",
    summary: "围绕芯片科技企业的产品表达、新闻体系与品牌可信度建立官网体验。",
    cover: "/assets/slices/FireShot_Capture_011_-_青岛信芯微电子科技股份有限公司-信芯微官网_-_www.hi-image.cn.png",
    gallery: [
      "/assets/slices/FireShot_Capture_012_-_关于信芯微_-_信芯微电子科技有限公司_-_www.hi-image.cn.png",
      "/assets/slices/FireShot_Capture_014_-_行业新闻_-_信芯微电子科技有限公司_-_www.hi-image.cn.png",
      "/assets/slices/Image0001_1.png"
    ],
    figma: "/assets/figma/3.png"
  },
  {
    slug: "app-design",
    title: "颜层美容 APP 界面",
    category: "APP设计",
    eyebrow: "APP DESIGN",
    year: "2026",
    summary: "根据用户需求对美容仪 APP 进行交互及 UI 设计。",
    cover: "/assets/slices/3213_4.png",
    gallery: [
      "/assets/slices/资源_1_2.png",
      "/assets/slices/注射.png",
      "/assets/slices/首页.png"
    ],
    figma: "/assets/figma/5.5.png"
  },
  {
    slug: "dashboard",
    title: "智慧园区大屏",
    category: "大屏设计",
    eyebrow: "DASHBOARD",
    year: "2026",
    summary: "以楼宇、能耗、告警和运营指标为核心的可视化大屏体验。",
    cover: "/assets/slices/Snipaste_2025-10-13_17-13-03.png",
    gallery: [
      "/assets/slices/Snipaste_2025-10-13_17-12-43.png",
      "/assets/slices/Snipaste_2025-10-13_17-14-29.png",
      "/assets/slices/3213.png"
    ],
    figma: "/assets/figma/6.png"
  },
  {
    slug: "c4d-practice",
    title: "C4D 练习",
    category: "C4D练习",
    eyebrow: "3D PRACTICE",
    year: "2026",
    summary: "三维场景、产品质感与视觉氛围探索。",
    cover: "/assets/slices/123_拷贝_1.png",
    gallery: [
      "/assets/slices/Desktop_-_3_1.png",
      "/assets/slices/Desktop_-_5_1.png",
      "/assets/slices/地图.png"
    ],
    figma: "/assets/figma/8.png"
  },
  {
    slug: "graphic",
    title: "平面设计",
    category: "平面设计",
    eyebrow: "GRAPHIC",
    year: "2026",
    summary: "节日海报、品牌物料与视觉实验。",
    cover: "/assets/slices/fanbaba_A_picture_of_a_traditional_Chinese_festival_a_little_bo_c_upscayl_4x_realesrgan-x4plus_1_1.png",
    gallery: [
      "/assets/slices/画板_1_3.png",
      "/assets/slices/图层_10_1.png",
      "/assets/slices/中文版_1.png"
    ],
    figma: "/assets/figma/9.png"
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
