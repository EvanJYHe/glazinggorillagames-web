import { cn } from "../../../../lib/utils.js";

const slotClass = {
  outer: "flex-[0_0_15%]",
  inner: "flex-[0_0_19%]",
  featured: "flex-[0_0_26%]",
  stack: "w-full",
  "featured-mobile": "col-span-2 w-full max-[560px]:col-span-1",
};

const tintClass = {
  outer:
    "bg-[radial-gradient(circle_at_22%_18%,rgba(118,215,255,0.34)_0%,transparent_36%),radial-gradient(circle_at_82%_24%,rgba(255,152,116,0.18)_0%,transparent_34%),linear-gradient(180deg,rgba(86,117,255,0.24)_0%,rgba(42,54,112,0.14)_28%,transparent_52%,rgba(0,0,0,0.2)_100%)]",
  inner:
    "bg-[radial-gradient(circle_at_24%_18%,rgba(118,215,255,0.3)_0%,transparent_36%),radial-gradient(circle_at_84%_24%,rgba(255,140,128,0.14)_0%,transparent_32%),linear-gradient(180deg,rgba(89,112,255,0.22)_0%,rgba(46,59,118,0.13)_30%,transparent_52%,rgba(0,0,0,0.2)_100%)]",
  featured:
    "bg-[radial-gradient(circle_at_26%_18%,rgba(255,225,166,0.28)_0%,transparent_34%),radial-gradient(circle_at_78%_20%,rgba(255,123,102,0.18)_0%,transparent_34%),linear-gradient(180deg,rgba(227,97,86,0.22)_0%,rgba(110,49,70,0.12)_26%,transparent_40%,rgba(0,0,0,0.24)_100%)]",
  stack:
    "bg-[radial-gradient(circle_at_24%_18%,rgba(118,215,255,0.3)_0%,transparent_36%),radial-gradient(circle_at_84%_24%,rgba(255,140,128,0.14)_0%,transparent_32%),linear-gradient(180deg,rgba(89,112,255,0.22)_0%,rgba(46,59,118,0.13)_30%,transparent_52%,rgba(0,0,0,0.2)_100%)]",
  "featured-mobile":
    "bg-[radial-gradient(circle_at_26%_18%,rgba(255,225,166,0.28)_0%,transparent_34%),radial-gradient(circle_at_78%_20%,rgba(255,123,102,0.18)_0%,transparent_34%),linear-gradient(180deg,rgba(227,97,86,0.22)_0%,rgba(110,49,70,0.12)_26%,transparent_40%,rgba(0,0,0,0.24)_100%)]",
};

const featuredShadow =
  "shadow-[inset_0_0_0_1px_oklch(62%_0.19_24_/_0.3),0_0_0_1px_oklch(62%_0.19_24_/_0.12),0_16px_56px_oklch(62%_0.19_24_/_0.14),0_8px_24px_rgba(0,0,0,0.7)] group-hover:shadow-[inset_0_0_0_1px_oklch(62%_0.19_24_/_0.5),0_0_0_1px_oklch(62%_0.19_24_/_0.2),0_32px_80px_oklch(62%_0.19_24_/_0.28),0_16px_48px_rgba(0,0,0,0.85)]";

const standardShadow =
  "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.55)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_24px_64px_rgba(0,0,0,0.75),0_0_40px_rgba(0,0,0,0.4)]";

const GameCardShowcase = ({ game, gameCard, showcaseSlot = "stack" }) => {
  const featured = showcaseSlot === "featured" || showcaseSlot === "featured-mobile";

  return (
    <a
      className={cn(
        "group relative flex min-w-0 cursor-pointer flex-col items-stretch text-inherit no-underline",
        slotClass[showcaseSlot] ?? slotClass.stack,
      )}
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-ggg-md bg-[#111] transition-[transform,box-shadow] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[10px]",
          featured ? `rounded-ggg-lg ${featuredShadow} group-hover:-translate-y-3` : standardShadow,
        )}
      >
        {game.image ? (
          <img
            className="block aspect-square h-auto w-full object-cover transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            src={game.image}
            alt={game.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.013)_0_1px,transparent_1px_18px)] px-3 text-center font-mono text-[10px] leading-[1.5] text-white/[0.12]">
            [ {game.name} ]
          </div>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_22%,rgba(0,0,0,0.08)_46%,rgba(0,0,0,0.42)_68%,rgba(0,0,0,0.92)_100%)]",
            featured &&
              "bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_14%,rgba(0,0,0,0.06)_38%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0.94)_100%)]",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[2] opacity-100 mix-blend-screen",
            tintClass[showcaseSlot] ?? tintClass.stack,
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-[4] flex flex-col items-start gap-1.5 p-3.5 pb-4",
            featured && "p-4.5 pb-5",
          )}
        >
          {featured && (
            <div className="mb-1 inline-flex items-center gap-[5px] rounded bg-ggg-accent px-2 py-[3px] text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">
              ★ Top Game
            </div>
          )}

          <div className={cn("max-w-full", featured && "max-w-[82%]")}>
            <div
              className={cn(
                "line-clamp-2 text-ggg-body-xs font-extrabold leading-[1.18] tracking-[0.01em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95),0_0_1px_rgba(0,0,0,0.9)]",
                featured && "text-ggg-body",
              )}
            >
              {game.name}
            </div>

            <div
              className={cn(
                "mt-1.5 inline-flex items-center gap-[5px] whitespace-nowrap text-[10.5px] font-semibold text-white/[0.86] [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]",
                featured && "mt-[7px] text-xs",
              )}
            >
              <span className="h-0 w-0 border-b-[3px] border-l-[5px] border-t-[3px] border-b-transparent border-l-ggg-accent border-t-transparent drop-shadow-[0_0_6px_rgba(255,112,86,0.45)]" />
              <span className="font-extrabold text-white">
                {game.visitsCompactLabel ?? game.visitsLabel}
              </span>
              <span className="text-white/[0.76]">{gameCard.visitsUnitLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GameCardShowcase;
