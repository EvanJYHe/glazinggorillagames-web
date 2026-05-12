"use client";

import useParallax from "./useParallax.js";

const Parallax = ({
  as: Component = "div",
  speed = 0.2,
  minWidth,
  maxOffsetRatio,
  className,
  children,
  ...rest
}) => {
  const ref = useParallax({ speed, minWidth, maxOffsetRatio });

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
};

export default Parallax;
