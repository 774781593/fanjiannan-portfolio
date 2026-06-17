/* eslint-disable @next/next/no-html-link-for-pages */
import type { CSSProperties } from "react";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import { ResponsiveStage } from "@/components/ResponsiveStage";
import { assetUrl } from "@/lib/assets";

const S = "/assets/slices";
const F = "/assets/figma-dev/home";

type ProjectItem = {
  href: string;
  number: string;
  label: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  img: string;
  imgX: number;
  imgY: number;
  imgW: number;
  imgH: number;
};

const projects: ProjectItem[] = [
  {
    href: "/projects/b-system",
    number: "01",
    label: "B端设计",
    x: 215,
    y: 2533,
    labelX: 255,
    labelY: 2617,
    img: `${S}/jimeng-2025-09-29-7626-编辑图1，将绿色手写体文字“Design”替换为“UI”，保持极细连笔风格、居中__1.png`,
    imgX: 411,
    imgY: 2629,
    imgW: 109,
    imgH: 103
  },
  {
    href: "/projects/web-design",
    number: "02",
    label: "网页设计",
    x: 797,
    y: 2533,
    labelX: 857,
    labelY: 2617,
    img: `${S}/5555_1.png`,
    imgX: 1000,
    imgY: 2620,
    imgW: 198,
    imgH: 135
  },
  {
    href: "/projects/app-design",
    number: "03",
    label: "APP设计",
    x: 1395,
    y: 2533,
    labelX: 1425,
    labelY: 2617,
    img: `${S}/5555_1.png`,
    imgX: 1536,
    imgY: 2600,
    imgW: 195,
    imgH: 133
  },
  {
    href: "/projects/dashboard",
    number: "04",
    label: "大屏设计",
    x: 215,
    y: 2799,
    labelX: 255,
    labelY: 2884,
    img: `${S}/5555_1.png`,
    imgX: 411,
    imgY: 2891,
    imgW: 152,
    imgH: 103
  },
  {
    href: "/projects/c4d-practice",
    number: "05",
    label: "C4D练习",
    x: 797,
    y: 2799,
    labelX: 850,
    labelY: 2884,
    img: `${S}/5555_1.png`,
    imgX: 1032,
    imgY: 2877,
    imgW: 172,
    imgH: 117
  },
  {
    href: "/projects/graphic",
    number: "06",
    label: "平面设计",
    x: 1395,
    y: 2799,
    labelX: 1442,
    labelY: 2884,
    img: `${S}/32133_2.png`,
    imgX: 1561,
    imgY: 2909,
    imgW: 125,
    imgH: 77
  }
];

const px = (value: number) => `${value}px`;

const homeText = {
  nav: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 305,
    lineHeight: "normal",
    letterSpacing: "-0.8px",
    color: "#ffffff"
  },
  navMuted: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 305,
    lineHeight: "normal",
    color: "rgba(255, 255, 255, 0.75)"
  },
  command: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 380,
    lineHeight: "normal",
    color: "#ffffff"
  },
  aboutTitle: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: 630,
    lineHeight: "100.055%",
    color: "#ffffff"
  },
  aboutRole: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "36px",
    fontStyle: "normal",
    fontWeight: 450,
    lineHeight: "normal",
    color: "#ffffff"
  },
  aboutBody: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 450,
    lineHeight: "66px",
    color: "rgba(255, 255, 255, 0.95)"
  },
  contentsTitle: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: 630,
    lineHeight: "100.055%",
    color: "#ffffff"
  },
  contentsSub: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: 380,
    lineHeight: "100.055%",
    color: "#cdcdcd"
  },
  projectNumber: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "128px",
    fontStyle: "normal",
    fontWeight: 520,
    lineHeight: "100.055%",
    color: "#565656"
  },
  projectLabel: {
    fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 520,
    lineHeight: "100.055%",
    color: "#ffffff"
  }
} satisfies Record<string, CSSProperties>;

export default function Home() {
  return (
    <main className="home-main min-h-screen overflow-x-hidden">
      <ResponsiveStage designWidth={1920} designHeight={4320} className="home-stage-shell">
        <PortfolioMotion
          className="relative h-[4320px] w-[1920px] text-white"
          style={{ fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif" } as CSSProperties}
        >
        <div className="absolute left-0 top-0 h-[4320px] w-[1920px] overflow-hidden bg-[#030304]">
          <img
            src={assetUrl(`${F}/img41.png`)}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute left-[-184px] top-[-87px] h-[1288.125px] w-[2288.211px] max-w-none object-cover"
          />

          <div className="absolute left-[44px] top-[28px] flex h-[16px] w-[37px] items-center gap-[8px]">
            <span className="block size-[16px] rounded-full bg-white/65" />
            <span className="block size-[16px] rounded-full border border-white/45" />
          </div>
          <p className="absolute left-[105px] top-[23px] m-0 whitespace-nowrap" style={homeText.nav}>
            Collections 2022-2025
          </p>
          <p className="absolute left-[1673.12px] top-[29px] m-0 whitespace-nowrap" style={homeText.navMuted}>
            ↘&nbsp;&nbsp;774781593@qq.com
          </p>

          <div className="absolute left-[242.99px] top-[272.01px] h-[72.755px] w-[363.776px] bg-[#050405]" />
          <img
            src={assetUrl(`${S}/UI设计师_UI_Desgin.png`)}
            alt="UI设计师/UI Desgin"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute left-[259.69px] top-[277.97px] h-[67px] w-[435px] max-w-none object-contain"
          />
          <img
            src={assetUrl(`${S}/jimeng-2025-09-28-2879-把右下角绿色的字抠出来放到黑背景上面_1.png`)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute left-[1292.57px] top-[534.4px] h-[161.016px] w-[484.382px] max-w-none object-cover"
          />

          <div className="absolute left-[460.06px] top-[834.96px] h-[40.552px] w-[483.047px] bg-[#2e2d2d]" />
          <img
            src={assetUrl(`${S}/欢迎观看范健男的作品集.png`)}
            alt="欢迎观看范健男的作品集"
            loading="lazy"
            decoding="async"
            className="absolute left-[460px] top-[838.06px] h-[40px] w-[278px] max-w-none object-contain"
          />
          <div className="absolute left-[1179.27px] top-[834.96px] h-[40.552px] w-[125.234px] bg-[#3f3e3f]" />
          <p className="absolute left-[1213.85px] top-[838.58px] m-0 h-[40.552px] w-[57.25px]" style={homeText.command}>
            取消
          </p>
          <div className="absolute left-[1371.29px] top-[834.96px] h-[40.552px] w-[125.234px] bg-[#262526]" />
          <p className="absolute left-[1405.88px] top-[838.58px] m-0 h-[40.552px] w-[57.25px]" style={homeText.command}>
            生成
          </p>

          <section className="absolute left-0 top-[1080px] h-[1080px] w-[1920px] bg-[#030304]" data-motion-reveal />
          <section className="absolute left-0 top-[2160px] h-[1080px] w-[1920px] bg-[#030304]" data-motion-reveal />

          <h1 className="motion-title-shine absolute left-[158px] top-[1385px] m-0 whitespace-nowrap" style={homeText.aboutTitle} data-motion-reveal>
            范健男
          </h1>
          <p className="absolute left-[158px] top-[1511px] m-0 w-[602.1px]" style={homeText.aboutRole} data-motion-reveal>
            UI / UX Designer
          </p>
          <div className="absolute left-[163px] top-[1628px] w-[888px]" style={homeText.aboutBody} data-motion-reveal>
            <p className="m-0">专注方向：</p>
            <ul className="m-0 list-disc pl-[48px]">
              <li className="m-0">3年互联网产品B端设计经验</li>
              <li className="m-0">B端系统设计&nbsp;&nbsp;&nbsp;&nbsp; 数据可视化&nbsp;&nbsp;&nbsp;&nbsp; 智慧园区&nbsp;&nbsp;&nbsp;&nbsp; AI科技风UI</li>
              <li className="m-0">AI生成设计</li>
            </ul>
          </div>

          <div
            className="absolute left-[823px] top-[1534px] flex h-[98.697px] w-[189.442px] items-center justify-center"
            data-motion-reveal
            style={{ "--motion-delay": "80ms" } as CSSProperties}
          >
            <div className="rotate-[9.18deg]">
              <img src={assetUrl(`${S}/图层_1_1.png`)} alt="About me" loading="lazy" decoding="async" className="h-[70.81px] w-[180.456px] max-w-none object-cover" />
            </div>
          </div>
          <img
            src={assetUrl(`${S}/Vector 2.svg`)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute left-[957px] top-[1604px] h-[59.6px] w-[44.551px] max-w-none"
            data-motion-reveal
            style={{ "--motion-delay": "110ms" } as CSSProperties}
          />

          <div
            className="absolute left-[1157px] top-[1186px] h-[867px] w-[617px]"
            data-motion-reveal
            style={{ "--motion-delay": "120ms" } as CSSProperties}
          >
            <div className="absolute left-[13px] top-[13px] h-[766px] w-[516px] border-2 border-dashed border-white" />
            <div className="absolute left-0 top-0 size-[25px] bg-white" />
            <div className="absolute left-[516px] top-0 size-[25px] bg-white" />
            <div className="absolute left-0 top-[383px] size-[25px] bg-white" />
            <div className="absolute left-[516px] top-[383px] size-[25px] bg-white" />
            <div className="absolute left-0 top-[766px] size-[25px] bg-white" />
            <div className="absolute left-[516px] top-[766px] size-[25px] bg-white" />
            <img src={assetUrl(`${S}/4214_1.png`)} alt="" loading="lazy" decoding="async" className="absolute left-[548px] top-[791px] h-[76px] w-[69px] max-w-none" />
            <div className="absolute left-[13px] top-[71px] h-[707px] w-[516px] overflow-hidden opacity-90">
              <img src={assetUrl(`${S}/图层_1_拷贝_1.png`)} alt="范健男肖像" loading="lazy" decoding="async" className="absolute left-[-21.827px] top-[-0.212px] h-[707.424px] w-[559.654px] max-w-none" />
            </div>
          </div>
          <div
            className="absolute left-[1419px] top-[1897px] flex h-[159.969px] w-[290.187px] items-center justify-center"
            data-motion-reveal
            style={{ "--motion-delay": "160ms" } as CSSProperties}
          >
            <div className="-rotate-[15deg]">
              <img
                src={assetUrl(`${S}/jimeng-2025-09-28-2879-把右下角绿色的字抠出来放到黑背景上面_1.png`)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[91.698px] w-[275.853px] max-w-none object-cover"
              />
            </div>
          </div>

          <h2 className="motion-title-shine absolute left-[139px] top-[2317px] m-0 whitespace-nowrap uppercase" data-motion-reveal>
            <span style={homeText.contentsTitle}>目录</span>
            <span style={homeText.contentsSub}>/CONTENTS</span>
          </h2>

          <div className="absolute left-[157px] top-[2497px] h-[516px] w-[1605px] border-2 border-dashed border-white" />
          <div className="absolute left-[145px] top-[2484px] size-[25px] bg-white" />
          <div className="absolute left-[928px] top-[2484px] h-[25px] w-[43px] bg-white" />
          <div className="absolute left-[1749px] top-[2484px] size-[25px] bg-white" />
          <div className="absolute left-[145px] top-[3000px] size-[25px] bg-white" />
          <div className="absolute left-[928px] top-[3000px] h-[25px] w-[43px] bg-white" />
          <div className="absolute left-[1749px] top-[3000px] size-[25px] bg-white" />
          <img src={assetUrl(`${S}/4214_1.png`)} alt="" loading="lazy" decoding="async" className="absolute left-[1786px] top-[3044px] h-[76px] w-[69px] max-w-none" />

          {projects.map((project, index) => (
            <a key={project.number} href={project.href} className="contents text-white motion-home-project" style={{ "--motion-delay": `${index * 70}ms` } as CSSProperties}>
              <span
                className="motion-home-project__number absolute whitespace-nowrap uppercase"
                data-motion-reveal
                style={{ ...homeText.projectNumber, left: px(project.x), top: px(project.y) }}
              >
                {project.number}
              </span>
              <span
                className="motion-home-project__label absolute whitespace-nowrap uppercase"
                data-motion-reveal
                style={{ ...homeText.projectLabel, left: px(project.labelX), top: px(project.labelY) }}
              >
                {project.label}
              </span>
              <img
                src={assetUrl(project.img)}
                alt=""
                loading="lazy"
                decoding="async"
                className="motion-home-project__image absolute max-w-none object-cover"
                data-motion-reveal
                style={{ left: px(project.imgX), top: px(project.imgY), width: px(project.imgW), height: px(project.imgH) }}
              />
            </a>
          ))}

          <section id="thanks" className="absolute left-0 top-[3240px] h-[1080px] w-[1920px] overflow-hidden bg-[#070709]" data-motion-reveal>
            <div className="absolute left-0 top-0 h-[1080px] w-[1920px] bg-[#070709]" />
            <div className="absolute left-[281.232px] top-[285.947px] h-[439.958px] w-[1368.474px] border-2 border-dashed border-white" />
            <div className="absolute left-[271px] top-[274.863px] h-[21.316px] w-[21.316px] bg-[#87f814]" />
            <div className="absolute left-[938.611px] top-[274.863px] h-[21.316px] w-[21.316px] bg-[#87f814]" />
            <div className="absolute left-[1638.621px] top-[274.863px] h-[21.316px] w-[21.316px] bg-[#87f814]" />
            <div className="absolute left-[271px] top-[714.821px] h-[21.316px] w-[21.316px] bg-[#87f814]" />
            <div className="absolute left-[938.611px] top-[714.821px] h-[21.316px] w-[21.316px] bg-[#87f814]" />
            <div className="absolute left-[1638.621px] top-[714.821px] h-[21.316px] w-[21.316px] bg-[#87f814]" />
            <img
              src={assetUrl(`${S}/4214_1.png`)}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute left-[1670.168px] top-[752.337px] h-[64.8px] w-[58.832px] max-w-none"
            />
            <img
              src={assetUrl(`${S}/jimeng-2025-09-28-2879-把右下角绿色的字抠出来放到黑背景上面_1.png`)}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute left-[324px] top-[170px] h-[87px] w-[262px] max-w-none object-cover"
            />
            <div className="absolute left-[292px] top-[243px] flex h-[63.444px] w-[51.07px] items-center justify-center">
              <div className="flex-none" style={{ transform: "rotate(-165deg)" }}>
                <img src={assetUrl(`${S}/Vector 2.svg`)} alt="" loading="lazy" decoding="async" className="block h-[55.5px] w-[38px] max-w-none" />
              </div>
            </div>
            <div className="absolute left-[314.449px] top-[654.513px] flex h-[130.035px] w-[130.035px] items-center justify-center">
              <div className="flex-none" style={{ transform: "rotate(45deg)" }}>
                <img src={assetUrl(`${S}/图层_1.png`)} alt="" loading="lazy" decoding="async" className="block h-[91.949px] w-[91.949px] max-w-none object-cover" />
              </div>
            </div>
            <div className="absolute left-[1427.001px] top-[221px] flex h-[134.902px] w-[135.192px] items-center justify-center">
              <div className="flex-none" style={{ transform: "rotate(-39.106deg)" }}>
                <img src={assetUrl(`${S}/图层_4.png`)} alt="" loading="lazy" decoding="async" className="block h-[95px] w-[97px] max-w-none object-cover" />
              </div>
            </div>
            <h2
              className="absolute left-[499px] top-[399px] m-0 h-[199px] w-[900px] whitespace-nowrap bg-clip-text text-transparent"
              style={{
                fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
                fontSize: "150px",
                fontWeight: 520,
                fontVariationSettings: "\"wght\" 520",
                lineHeight: "100.055%",
                backgroundImage: "linear-gradient(90deg, #ffffff 0%, #7b7b7b 32.2115%, #ffffff 66.8269%, #7b7b7b 100%)"
              }}
            >
              感谢您的观看
            </h2>
            <p
              className="absolute left-[664px] top-[785px] m-0 h-[42px] w-[522px] whitespace-nowrap text-center text-white"
              style={{
                fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
                fontSize: "32px",
                fontWeight: 520,
                fontVariationSettings: "\"wght\" 520",
                lineHeight: "100.055%"
              }}
            >
              如果你喜欢我的<span className="text-[#84eb19]">作品集</span>，请与我联系!
            </p>
          </section>
        </div>
        </PortfolioMotion>
      </ResponsiveStage>
    </main>
  );
}
