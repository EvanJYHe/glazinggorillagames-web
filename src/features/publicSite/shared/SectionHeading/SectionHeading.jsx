import { cn } from "../../../../lib/utils.js";
import SplitText from "../SplitText/SplitText.jsx";

const SectionHeading = ({ eyebrow, title, body, align = "left" }) => {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3.5 flex items-center gap-[9px] text-ggg-label font-bold uppercase tracking-[0.18em] text-ggg-accent",
            centered && "justify-center"
          )}
        >
          <span className="block h-px w-5 bg-ggg-accent" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className="font-bebas font-bold text-ggg-section uppercase text-ggg-text [font-synthesis:weight_style]">
        <SplitText text={title} />
      </h2>
      {body && (
        <p
          className={cn(
            "mt-3 text-ggg-body text-ggg-muted",
            centered && "mx-auto max-w-[520px]"
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
