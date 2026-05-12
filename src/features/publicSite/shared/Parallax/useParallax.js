"use client";

import { useEffect, useRef } from "react";

const DEFAULT_MIN_WIDTH = 640;
const LERP_FACTOR = 0.16;
const SETTLE_THRESHOLD = 0.15;

const useParallax = ({ speed = 0.2, minWidth = DEFAULT_MIN_WIDTH } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") return undefined;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const widthQuery = window.matchMedia?.(`(min-width: ${minWidth}px)`);
    if (reducedMotion || !widthQuery?.matches) return undefined;

    let target = 0;
    let current = 0;
    let frame = 0;
    let inView = false;

    const tick = () => {
      const rect = node.getBoundingClientRect();
      target = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
      current += (target - current) * LERP_FACTOR;

      const settled = Math.abs(target - current) < SETTLE_THRESHOLD;
      if (settled) current = target;
      node.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!inView || frame) return;
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        node.style.willChange = inView ? "transform" : "";
        wake();
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    observer.observe(node);

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      observer.disconnect();
      node.style.transform = "";
      node.style.willChange = "";
    };
  }, [speed, minWidth]);

  return ref;
};

export default useParallax;
