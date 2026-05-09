const innerTint =
  "bg-[radial-gradient(circle_at_24%_18%,rgba(118,215,255,0.3)_0%,transparent_36%),radial-gradient(circle_at_84%_24%,rgba(255,140,128,0.14)_0%,transparent_32%),linear-gradient(180deg,rgba(89,112,255,0.22)_0%,rgba(46,59,118,0.13)_30%,transparent_52%,rgba(0,0,0,0.2)_100%)]";

const outerTint =
  "bg-[radial-gradient(circle_at_22%_18%,rgba(118,215,255,0.34)_0%,transparent_36%),radial-gradient(circle_at_82%_24%,rgba(255,152,116,0.18)_0%,transparent_34%),linear-gradient(180deg,rgba(86,117,255,0.24)_0%,rgba(42,54,112,0.14)_28%,transparent_52%,rgba(0,0,0,0.2)_100%)]";

const heroTint =
  "bg-[radial-gradient(circle_at_26%_18%,rgba(255,225,166,0.28)_0%,transparent_34%),radial-gradient(circle_at_78%_20%,rgba(255,123,102,0.18)_0%,transparent_34%),linear-gradient(180deg,rgba(227,97,86,0.22)_0%,rgba(110,49,70,0.12)_26%,transparent_40%,rgba(0,0,0,0.24)_100%)]";

const neutralTint =
  "bg-[radial-gradient(circle_at_24%_18%,rgba(118,215,255,0.3)_0%,transparent_36%),linear-gradient(180deg,rgba(89,112,255,0.18)_0%,rgba(46,59,118,0.12)_30%,transparent_52%,rgba(0,0,0,0.2)_100%)]";

export const slotSizing = {
  outer: "flex-[0_0_15%]",
  inner: "flex-[0_0_19%]",
  hero: "flex-[0_0_26%]",
  stack: "w-full",
  mobileLead: "w-full",
};

export const slotTint = {
  outer: outerTint,
  inner: innerTint,
  hero: heroTint,
  stack: innerTint,
  mobileLead: neutralTint,
};

export const featuredShadow =
  "shadow-[inset_0_0_0_1px_oklch(62%_0.19_24_/_0.3),0_0_0_1px_oklch(62%_0.19_24_/_0.12),0_16px_56px_oklch(62%_0.19_24_/_0.14),0_8px_24px_rgba(0,0,0,0.7)] group-hover:shadow-[inset_0_0_0_1px_oklch(62%_0.19_24_/_0.5),0_0_0_1px_oklch(62%_0.19_24_/_0.2),0_32px_80px_oklch(62%_0.19_24_/_0.28),0_16px_48px_rgba(0,0,0,0.85)]";

export const standardShadow =
  "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.55)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_24px_64px_rgba(0,0,0,0.75),0_0_40px_rgba(0,0,0,0.4)]";
