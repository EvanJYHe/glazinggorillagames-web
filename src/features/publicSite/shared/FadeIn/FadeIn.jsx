"use client";

import { cn } from "../../../../lib/utils.js";
import useInViewOnce from "../useInViewOnce.js";

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

  const isPop = variant === "pop";
  const transitionClass = isPop
    ? "transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
    : "transition-[opacity,transform] duration-[550ms] ease-[ease] motion-reduce:transition-none";
  const hiddenClass = isPop ? "opacity-0 scale-95" : "opacity-0 translate-y-5";
  const visibleClass = isPop ? "opacity-100 scale-100" : "opacity-100 translate-y-0";

  return (
    <Component
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        transitionClass,
        visible ? visibleClass : hiddenClass,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
