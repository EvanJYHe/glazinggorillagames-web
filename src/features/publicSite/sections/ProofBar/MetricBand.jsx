"use client";

import { useState } from "react";

import { cn } from "../../../../lib/utils.js";
import AnimatedStatValue from "../../shared/AnimatedStatValue/AnimatedStatValue.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const ruleColor = "rgba(240, 237, 232, 0.06)";
const COLUMNS = 4;

const MetricBand = ({ stats, statsAriaLabel }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const rows = Math.ceil(stats.length / COLUMNS);
  const highlightStyle =
    activeIndex == null
      ? undefined
      : {
          width: `${100 / COLUMNS}%`,
          height: `${100 / rows}%`,
          left: `${(activeIndex % COLUMNS) * (100 / COLUMNS)}%`,
          top: `${Math.floor(activeIndex / COLUMNS) * (100 / rows)}%`,
        };

  return (
    <section
      id="stats"
      aria-label={statsAriaLabel}
      className="relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-b border-ggg-border bg-white/[0.018] [background-image:radial-gradient(ellipse_92%_140%_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_55%),radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(0,0,0,0.35)_0%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#090909_0%,transparent_6%,transparent_94%,#090909_100%)] min-[2000px]:bg-[linear-gradient(to_right,#090909_0%,#090909_8%,transparent_28%,transparent_72%,#090909_92%,#090909_100%)]"
      />
      <PageContainer className="relative flex justify-center">
        <div
          className="relative grid w-full max-w-[min(960px,100%)] grid-cols-3 sm:grid-cols-4"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className={cn(
                "absolute bg-white/[0.035] opacity-0 transition-[top,left,width,height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.32,1)]",
                activeIndex != null && "opacity-100",
              )}
              style={highlightStyle}
            />
          </div>

          {stats.map((stat, index) => (
            <div
              className={cn(
                "relative z-10 px-2 py-4 text-center sm:px-3 sm:py-5 lg:px-5 lg:py-[30px]",
                index < stats.length - 1 && "border-r",
                stat.key === "activePlayers" && "hidden sm:block",
              )}
              key={stat.key}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              style={{ borderColor: ruleColor }}
              tabIndex={0}
            >
              <span className="mb-1 block font-bebas font-bold text-ggg-metric text-ggg-text [font-synthesis:weight_style] sm:mb-2">
                <AnimatedStatValue value={stat.value} />
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-ggg-dim sm:text-ggg-body-xs sm:tracking-[0.14em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default MetricBand;
