"use client";

import { cn } from "../../../../lib/utils.js";
import useInViewOnce from "../useInViewOnce.js";

const SplitText = ({
  as: Component = "span",
  text,
  className,
  startDelay = 0,
  stagger = 40,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}) => {
  const [ref, visible] = useInViewOnce({ threshold, rootMargin });

  const parts = String(text ?? "").split(/(\s+)/);
  let wordIndex = 0;

  return (
    <Component ref={ref} aria-label={text} className={cn("inline", className)}>
      {parts.map((part, i) => {
        if (part === "" || /^\s+$/.test(part)) {
          return <span key={i}>{part}</span>;
        }
        const idx = wordIndex;
        wordIndex += 1;
        const delay = startDelay + idx * stagger;
        return (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "inline-block transition-[opacity,transform,filter] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              visible
                ? "opacity-100 translate-y-0 blur-[0px]"
                : "opacity-0 translate-y-3 blur-[4px]",
            )}
            style={{ transitionDelay: `${delay}ms` }}
          >
            {part}
          </span>
        );
      })}
    </Component>
  );
};

export default SplitText;
