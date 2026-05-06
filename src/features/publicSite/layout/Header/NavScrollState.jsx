"use client";

import { useEffect, useState } from "react";

import { cn } from "../../../../lib/utils.js";

export default function NavScrollState({ ariaLabel, children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 30);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[200] flex h-[60px] items-center justify-between border-b border-transparent bg-transparent px-ggg transition-[background,border-color,backdrop-filter] duration-300",
        scrolled && "border-b-ggg-border bg-[rgba(9,9,9,0.94)] backdrop-blur-[16px] backdrop-saturate-[0.9]",
      )}
      aria-label={ariaLabel}
    >
      {children}
    </nav>
  );
}
