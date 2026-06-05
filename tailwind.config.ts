import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f5f5f2",
        paper: "#030303",
        acid: "#6DE11E",
        graphite: "#171717",
        panel: "#202020",
        line: "rgba(245, 245, 242, 0.18)",
        muted: "#9b9b9b"
      },
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "Microsoft YaHei",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.42)",
        glow: "0 0 64px rgba(109, 225, 30, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
