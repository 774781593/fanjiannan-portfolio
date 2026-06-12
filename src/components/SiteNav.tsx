"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects/b-system", label: "B端" },
  { href: "/projects/web-design", label: "网页设计" },
  { href: "/projects/app-design", label: "APP" },
  { href: "/projects/dashboard", label: "大屏" },
  { href: "/projects/c4d-practice", label: "C4D" },
  { href: "/projects/graphic", label: "平面" }
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <nav className="site-nav" aria-label="作品集导航" data-menu-open={menuOpen ? "true" : "false"}>
        <Link className="site-nav__brand" href="/" aria-label="返回首页">
          FanJiannan
        </Link>
        <button
          className="site-nav__menu-button"
          type="button"
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <div className="site-nav__links">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;

            return (
              <Link
                key={item.href}
                className="site-nav__link"
                data-active={active ? "true" : "false"}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <button className="back-to-top" type="button" aria-label="回到顶部" onClick={scrollToTop}>
        <span className="back-to-top__arrow" aria-hidden="true" />
      </button>
    </>
  );
}
