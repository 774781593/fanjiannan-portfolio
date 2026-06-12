/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig = {
  images: {
    unoptimized: true
  },
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true
      }
    : {})
};

export default nextConfig;
