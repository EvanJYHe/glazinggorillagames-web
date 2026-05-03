import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "ggg-hero",
            "ggg-section",
            "ggg-page",
            "ggg-contact",
            "ggg-studio",
            "ggg-metric",
            "ggg-media-stat",
            "ggg-body",
            "ggg-body-sm",
            "ggg-body-xs",
            "ggg-label",
            "ggg-eyebrow",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "ggg-text",
            "ggg-muted",
            "ggg-dim",
            "ggg-accent",
            "ggg-live",
          ],
        },
      ],
      rounded: [
        { rounded: ["ggg-sm", "ggg", "ggg-md", "ggg-lg"] },
      ],
      shadow: [
        { shadow: ["ggg-card", "ggg-card-hover"] },
      ],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
