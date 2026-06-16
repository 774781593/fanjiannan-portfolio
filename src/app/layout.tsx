import type { Metadata, Viewport } from "next";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "FanJiannan Portfolio",
  description: "FanJiannan UI/UX portfolio and design works."
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
      </head>
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
