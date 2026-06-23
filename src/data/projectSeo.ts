export type ProjectSeo = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  priority: number;
};

export const siteUrl = "https://fanjiannan.com";

export const projectSeo: ProjectSeo[] = [
  {
    slug: "b-system",
    title: "B端能源管理系统设计",
    description: "中微 EMS 能源管理系统的 B 端产品设计案例，覆盖数据看板、能耗分析、报表管理与系统配置体验。",
    category: "B端设计",
    image: "/assets-optimized/figma-dev/b-system/product-objectives.webp",
    priority: 0.9
  },
  {
    slug: "web-design",
    title: "信芯微官网网页设计",
    description: "信芯微官网改版设计案例，围绕芯片科技企业的品牌表达、产品展示、新闻体系与官网访问体验。",
    category: "网页设计",
    image: "/assets-optimized/figma-dev/web-xinxin-bg-main.webp",
    priority: 0.85
  },
  {
    slug: "app-design",
    title: "颜层美容 APP 界面设计",
    description: "美容 APP UI/UX 设计案例，展示移动端信息架构、核心功能页面和高质感视觉界面。",
    category: "APP设计",
    image: "/assets-optimized/slices/3213_4.webp",
    priority: 0.85
  },
  {
    slug: "dashboard",
    title: "智慧园区大屏设计",
    description: "智慧园区可视化大屏设计案例，聚焦楼宇、能耗、告警和运营指标的信息展示。",
    category: "大屏设计",
    image: "/assets-optimized/figma-dev/dashboard-layer-1.webp",
    priority: 0.8
  },
  {
    slug: "c4d-practice",
    title: "C4D 练习作品",
    description: "C4D 三维练习作品，包含场景氛围、产品质感和视觉表达探索。",
    category: "C4D练习",
    image: "/assets-optimized/slices/Desktop_-_3_1.webp",
    priority: 0.75
  },
  {
    slug: "graphic",
    title: "平面设计作品",
    description: "平面设计作品合集，包含节日海报、品牌物料、视觉实验和端午主题设计。",
    category: "平面设计",
    image: "/assets-optimized/slices/duanwu-sothis-2026.webp",
    priority: 0.8
  }
];

export function getProjectSeo(slug: string) {
  return projectSeo.find((project) => project.slug === slug);
}
