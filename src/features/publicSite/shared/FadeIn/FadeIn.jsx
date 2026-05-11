"use client";

import { cn } from "../../../../lib/utils.js";
import useInViewOnce from "../useInViewOnce.js";

const VARIANTS = {
  fade: {
    transition:
      "transition-[opacity,transform] duration-[550ms] ease-[ease] motion-reduce:transition-none",
    hidden: "opacity-0 translate-y-5",
    visible: "opacity-100 translate-y-0",
  },
  pop: {
    transition:
      "transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  soft: {
    transition:
      "transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
    hidden: "opacity-0",
    visible: "opacity-100",
  },
};

const FadeIn = ({
  as: Component = "div",
  children,
  className,
  delay = 0,
  threshold = 0.08,
  rootMargin = "0px 0px -10% 0px",
  variant = "fade",
  immediate = false,
  ...rest
}) => {
  const [ref, visible] = useInViewOnce({ threshold, rootMargin, immediate });
  const styles = VARIANTS[variant] || VARIANTS.fade;

  return (
    <Component
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(styles.transition, visible ? styles.visible : styles.hidden, className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
