import { cn } from "../../../lib/utils.js";

const baseClass =
  "inline-flex w-max max-w-full flex-none touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-ggg-sm font-dm leading-none outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ggg-bg focus-visible:ring-ggg-accent";

const variantClass = {
  primary:
    "bg-ggg-accent px-7 py-[13px] text-ggg-body-sm font-bold uppercase tracking-[0.07em] text-white hover:-translate-y-0.5 hover:shadow-[0_10px_32px_var(--ggg-accent-glow)] max-[480px]:px-5",
  ghost:
    "border border-white/[0.18] bg-transparent px-[26px] py-3 text-ggg-body-sm font-semibold uppercase tracking-[0.07em] text-ggg-text hover:border-white/[0.42] hover:bg-white/[0.04] max-[480px]:px-5",
  pill:
    "rounded-[3px] bg-ggg-accent px-4 py-2 font-inter text-[12.5px] font-bold uppercase tracking-[0.06em] text-white hover:opacity-[0.88] sm:px-5 sm:py-[9px]",
};

const Button = ({
  as: Component = "button",
  variant = "primary",
  className,
  children,
  type,
  ...rest
}) => {
  const props = Component === "button" ? { type: type ?? "button", ...rest } : rest;

  return (
    <Component className={cn(baseClass, variantClass[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Button;
