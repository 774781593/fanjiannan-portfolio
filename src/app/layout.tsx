import type { Metadata, Viewport } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteBackdrop } from "@/components/SiteBackdrop";
import { siteUrl } from "@/data/projectSeo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FanJiannan Portfolio",
    template: "%s | FanJiannan Portfolio"
  },
  description: "范健男 UI/UX 作品集，展示 B 端系统、网页、APP、大屏、C4D 和平面设计作品。",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "FanJiannan Portfolio",
    description: "范健男 UI/UX 作品集，展示 B 端系统、网页、APP、大屏、C4D 和平面设计作品。",
    url: "/",
    siteName: "FanJiannan Portfolio",
    images: [
      {
        url: "/assets-optimized/figma-dev/home/img41.webp",
        width: 1200,
        height: 675,
        alt: "FanJiannan Portfolio"
      }
    ],
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FanJiannan Portfolio",
    description: "范健男 UI/UX 作品集，展示 B 端系统、网页、APP、大屏、C4D 和平面设计作品。",
    images: ["/assets-optimized/figma-dev/home/img41.webp"]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preload" href="/assets/fonts/Druk/Druk-Wide-Bold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/MiSans/MiSansVF-subset.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SiteBackdrop />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
