"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function StickyNav() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(3, 3, 3, 0)", "rgba(3, 3, 3, 0.78)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(245, 245, 242, 0)", "rgba(245, 245, 242, 0.12)"]
  );

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
      style={{ backgroundColor, borderColor }}
    >
      <nav className="container-grid flex h-16 items-center justify-between text-sm text-ink">
        <Link href="/" className="flex items-center gap-3 font-medium tracking-[0]">
          <span className="h-3 w-3 rounded-full bg-ink" />
          <span className="h-3 w-3 rounded-full border border-ink/45" />
          <span className="ml-2 text-muted">Collections 2022-2025</span>
        </Link>
        <div className="flex items-center gap-6 text-muted max-sm:hidden">
          <Link href="/#work" className="transition hover:text-ink">
            Work
          </Link>
          <Link href="/#profile" className="transition hover:text-ink">
            Profile
          </Link>
          <a href="mailto:774781593@qq.com" className="transition hover:text-ink">
            774781593@qq.com
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
