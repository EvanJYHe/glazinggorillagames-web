"use client";

import { cn } from "../../../../lib/utils.js";
import { useScrolledPast } from "./useScrolledPast.js";

export default function HeaderShell({ ariaLabel, children }) {
  const scrolled = useScrolledPast(30);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[200] flex h-[70px] items-center justify-between border-b border-b-transparent bg-transparent px-ggg transition-[background,border-color] duration-300 sm:grid sm:grid-cols-[1fr_auto_1fr]",
        scrolled && "border-b-ggg-border bg-ggg-bg",
      )}
      aria-label={ariaLabel}
    >
      {children}
    </nav>
  );
}
