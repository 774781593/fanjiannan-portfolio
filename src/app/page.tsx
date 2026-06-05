import Link from "next/link";

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

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <div
        className="relative mx-auto h-[3240px] w-[1920px] origin-top text-white max-[1920px]:left-1/2 max-[1920px]:-translate-x-1/2"
        style={{ fontFamily: "MiSans, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif" }}
      >
        <div className="absolute left-0 top-0 h-[3240px] w-[1920px] overflow-hidden bg-[#030304]">
          <img
            src={`${F}/img41.png`}
            alt=""
            className="pointer-events-none absolute left-[-184px] top-[-87px] h-[1288.125px] w-[2288.211px] max-w-none object-cover"
          />

          <div className="absolute left-[44px] top-[28px] flex h-[16px] w-[37px] items-center gap-[8px]">
            <span className="block size-[16px] rounded-full bg-white/65" />
            <span className="block size-[16px] rounded-full border border-white/45" />
          </div>
          <p className="absolute left-[105px] top-[23px] m-0 whitespace-nowrap text-[20px] font-normal leading-normal tracking-[-0.8px]">
            Collections 2022-2025
          </p>
          <p className="absolute left-[1673.12px] top-[29px] m-0 whitespace-nowrap text-[20px] font-normal leading-normal text-white/75">
            ↘&nbsp;&nbsp;774781593@qq.com
          </p>

          <div className="absolute left-[242.99px] top-[272.01px] h-[72.755px] w-[363.776px] bg-[#050405]" />
          <img
            src={`${S}/UI设计师_UI_Desgin.png`}
            alt="UI设计师/UI Desgin"
            className="absolute left-[259.69px] top-[277.97px] h-[67px] w-[435px] max-w-none object-contain"
          />
          <img
            src={`${S}/jimeng-2025-09-28-2879-把右下角绿色的字抠出来放到黑背景上面_1.png`}
            alt=""
            className="absolute left-[1292.57px] top-[534.4px] h-[161.016px] w-[484.382px] max-w-none object-cover"
          />

          <div className="absolute left-[460.06px] top-[834.96px] h-[40.552px] w-[483.047px] bg-[#2e2d2d]" />
          <img
            src={`${S}/欢迎观看范健男的作品集.png`}
            alt="欢迎观看范健男的作品集"
            className="absolute left-[460px] top-[838.06px] h-[40px] w-[278px] max-w-none object-contain"
          />
          <div className="absolute left-[1179.27px] top-[834.96px] h-[40.552px] w-[125.234px] bg-[#3f3e3f]" />
          <p className="absolute left-[1213.85px] top-[838.58px] m-0 h-[40.552px] w-[57.25px] text-[24px] font-medium leading-normal">
            取消
          </p>
          <div className="absolute left-[1371.29px] top-[834.96px] h-[40.552px] w-[125.234px] bg-[#262526]" />
          <p className="absolute left-[1405.88px] top-[838.58px] m-0 h-[40.552px] w-[57.25px] text-[24px] font-medium leading-normal">
            生成
          </p>

          <section className="absolute left-0 top-[1080px] h-[1080px] w-[1920px] bg-[#030304]" />
          <section className="absolute left-0 top-[2160px] h-[1080px] w-[1920px] bg-[#030304]" />

          <h1 className="absolute left-[158px] top-[1385px] m-0 whitespace-nowrap text-[96px] font-bold leading-[100.055%] text-white">
            范健男
          </h1>
          <p className="absolute left-[158px] top-[1511px] m-0 w-[602.1px] text-[36px] font-semibold leading-normal text-white">
            UI / UX Designer
          </p>
          <div className="absolute left-[163px] top-[1628px] w-[888px] text-[32px] font-semibold leading-[66px] text-white/95">
            <p className="m-0">专注方向：</p>
            <ul className="m-0 list-disc pl-[48px]">
              <li className="m-0">3年互联网产品B端设计经验</li>
              <li className="m-0">B端系统设计&nbsp;&nbsp;&nbsp;&nbsp; 数据可视化&nbsp;&nbsp;&nbsp;&nbsp; 智慧园区&nbsp;&nbsp;&nbsp;&nbsp; AI科技风UI</li>
              <li className="m-0">AI生成设计</li>
            </ul>
          </div>

          <div className="absolute left-[823px] top-[1534px] flex h-[98.697px] w-[189.442px] items-center justify-center">
            <div className="rotate-[9.18deg]">
              <img src={`${S}/图层_1_1.png`} alt="About me" className="h-[70.81px] w-[180.456px] max-w-none object-cover" />
            </div>
          </div>
          <img src={`${S}/Vector 2.svg`} alt="" className="absolute left-[957px] top-[1604px] h-[59.6px] w-[44.551px] max-w-none" />

          <div className="absolute left-[1157px] top-[1186px]">
            <div className="absolute left-[13px] top-[13px] h-[766px] w-[516px] border-2 border-dashed border-white" />
            <div className="absolute left-0 top-0 size-[25px] bg-white" />
            <div className="absolute left-[516px] top-0 size-[25px] bg-white" />
            <div className="absolute left-0 top-[383px] size-[25px] bg-white" />
            <div className="absolute left-[516px] top-[383px] size-[25px] bg-white" />
            <div className="absolute left-0 top-[766px] size-[25px] bg-white" />
            <div className="absolute left-[516px] top-[766px] size-[25px] bg-white" />
            <img src={`${S}/4214_1.png`} alt="" className="absolute left-[548px] top-[791px] h-[76px] w-[69px] max-w-none" />
          </div>
          <div className="absolute left-[1170px] top-[1257px] h-[707px] w-[516px] overflow-hidden opacity-90">
            <img src={`${S}/图层_1_拷贝_1.png`} alt="范健男肖像" className="absolute left-[-21.827px] top-[-0.212px] h-[707.424px] w-[559.654px] max-w-none" />
          </div>
          <div className="absolute left-[1419px] top-[1897px] flex h-[159.969px] w-[290.187px] items-center justify-center">
            <div className="-rotate-[15deg]">
              <img
                src={`${S}/jimeng-2025-09-28-2879-把右下角绿色的字抠出来放到黑背景上面_1.png`}
                alt=""
                className="h-[91.698px] w-[275.853px] max-w-none object-cover"
              />
            </div>
          </div>

          <h2 className="absolute left-[139px] top-[2317px] m-0 whitespace-nowrap font-bold uppercase leading-[100.055%]">
            <span className="text-[96px]">目录</span>
            <span className="text-[40px] font-medium text-[#cdcdcd]">/CONTENTS</span>
          </h2>

          <div className="absolute left-[157px] top-[2497px] h-[516px] w-[1605px] border-2 border-dashed border-white" />
          <div className="absolute left-[145px] top-[2484px] size-[25px] bg-white" />
          <div className="absolute left-[928px] top-[2484px] h-[25px] w-[43px] bg-white" />
          <div className="absolute left-[1749px] top-[2484px] size-[25px] bg-white" />
          <div className="absolute left-[145px] top-[3000px] size-[25px] bg-white" />
          <div className="absolute left-[928px] top-[3000px] h-[25px] w-[43px] bg-white" />
          <div className="absolute left-[1749px] top-[3000px] size-[25px] bg-white" />
          <img src={`${S}/4214_1.png`} alt="" className="absolute left-[1786px] top-[3044px] h-[76px] w-[69px] max-w-none" />

          {projects.map((project) => (
            <Link key={project.number} href={project.href} className="contents text-white">
              <span
                className="absolute whitespace-nowrap text-[128px] font-semibold uppercase leading-[100.055%] text-[#565656]"
                style={{ left: px(project.x), top: px(project.y) }}
              >
                {project.number}
              </span>
              <span
                className="absolute whitespace-nowrap text-[48px] font-semibold uppercase leading-[100.055%] text-white"
                style={{ left: px(project.labelX), top: px(project.labelY) }}
              >
                {project.label}
              </span>
              <img
                src={project.img}
                alt=""
                className="absolute max-w-none object-cover"
                style={{ left: px(project.imgX), top: px(project.imgY), width: px(project.imgW), height: px(project.imgH) }}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
