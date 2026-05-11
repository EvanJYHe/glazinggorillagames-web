"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "../../../../lib/utils.js";

function getActiveLineOffset() {
  return Math.max(120, window.innerHeight * 0.35);
}

function getSectionId(href) {
  if (typeof href !== "string" || !href.startsWith("#")) return null;
  return href.slice(1);
}

export default function HeaderNavLinks({ items }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const sectionIds = useMemo(
    () => items.map(item => getSectionId(item.href)).filter(Boolean),
    [items],
  );

  const [activeSectionId, setActiveSectionId] = useState(null);

  useEffect(() => {
    if (!sectionIds.length) return undefined;

    const update = () => {
      const offset = getActiveLineOffset();
      let bestId = null;
      let bestTop = -Infinity;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      setActiveSectionId(bestId);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds, pathname]);

  return items.map(item => {
    const sectionId = getSectionId(item.href);
    const isActive = sectionId !== null && sectionId === activeSectionId;
    const className = cn(
      "font-inter text-[13px] font-bold uppercase tracking-[0.07em] text-ggg-text touch-manipulation transition-colors hover:text-ggg-accent",
      isActive && "text-ggg-accent underline underline-offset-[6px] decoration-2 decoration-ggg-accent",
    );

    if (sectionId !== null && isHome) {
      return (
        <a className={className} key={item.href} href={item.href}>
          {item.label}
        </a>
      );
    }

    return (
      <Link
        className={className}
        key={item.href}
        href={sectionId !== null ? `/${item.href}` : item.href}
      >
        {item.label}
      </Link>
    );
  });
}
