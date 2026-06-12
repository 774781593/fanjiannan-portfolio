import type { Metadata, Viewport } from "next";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A motion-led portfolio site restored from Figma."
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
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
