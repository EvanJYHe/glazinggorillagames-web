import { cn } from "../../../../lib/utils.js";

const BrandLogo = ({ src, variant = "nav", className = "" }) => {
  const footer = variant === "footer";
  const cls = cn(
    "block h-[30px] w-auto shrink-0 object-contain object-left",
    footer && "h-[26px]",
    className
  );

  return (
    <img
      className={cls}
      src={src}
      alt=""
      width={512}
      height={512}
      decoding="async"
    />
  );
};

export default BrandLogo;
