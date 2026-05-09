"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../../../lib/utils.js";
import FadeIn from "../../shared/FadeIn/FadeIn.jsx";
import SplitText from "../../shared/SplitText/SplitText.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const STRIPE_PLACEHOLDER =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 14px), linear-gradient(180deg, #1a1a1a, #111)";

const navButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/[0.14] bg-[rgba(14,14,14,0.94)] p-0 text-[#f5f3ef] shadow-[0_6px_28px_rgba(0,0,0,0.55)] transition-[border-color,background,color,box-shadow,transform] duration-200 ease-out hover:scale-[1.04] hover:border-white/[0.22] hover:bg-[rgba(26,26,26,0.98)] hover:text-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ggg-accent sm:size-12";

function CarouselNavButton({ direction, onClick, label }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button type="button" className={navButtonClass} aria-label={label} onClick={onClick}>
      <Icon size={24} strokeWidth={2} aria-hidden />
    </button>
  );
}

const ServiceCard = ({ card, index }) => {
  const hasImage = Boolean(card.mediaSrc);

  return (
    <FadeIn
      delay={index * 80}
      className="flex w-[78%] max-w-[340px] shrink-0 snap-start min-[980px]:w-auto min-[980px]:max-w-none min-[980px]:shrink"
    >
      <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-ggg-lg border border-ggg-border bg-ggg-panel transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-ggg-border-strong">
        <div
          className="relative aspect-[4/3] overflow-hidden border-b border-ggg-border"
          style={hasImage ? undefined : { backgroundImage: STRIPE_PLACEHOLDER }}
        >
          {hasImage && (
            <img
              src={card.mediaSrc}
              alt={card.mediaAlt || ""}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                card.mediaPosition === "left" && "object-left",
                card.mediaPosition === "right" && "object-right",
              )}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-[26px]">
          <h3 className="m-0 font-bebas text-[26px] font-bold uppercase tracking-[0.04em] text-ggg-text [font-synthesis:weight_style]">
            {card.title}
          </h3>
          <p className="m-0 text-ggg-body leading-[1.62] text-ggg-muted text-pretty">
            {card.body}
          </p>
          <a
            href={card.ctaHref}
            className="mt-auto inline-flex items-center gap-2 self-start pt-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-ggg-text no-underline transition-[color,gap] duration-200 group-hover:gap-3 group-hover:text-ggg-accent"
          >
            {card.ctaLabel}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </article>
    </FadeIn>
  );
};

const AboutGGG = ({ aboutGGG }) => {
  const [titleLeading, titleAccent] = aboutGGG.titleLines;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCount = aboutGGG.cards.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let bestIndex = 0;
        let bestDist = Infinity;
        for (let i = 0; i < el.children.length; i += 1) {
          const child = el.children[i];
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(center - childCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIndex = i;
          }
        }
        setActiveIndex(bestIndex);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [cardCount]);

  const scrollToIndex = useCallback(nextIndex => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[nextIndex];
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    if (cardCount === 0) return;
    scrollToIndex((activeIndex - 1 + cardCount) % cardCount);
  }, [activeIndex, cardCount, scrollToIndex]);

  const goNext = useCallback(() => {
    if (cardCount === 0) return;
    scrollToIndex((activeIndex + 1) % cardCount);
  }, [activeIndex, cardCount, scrollToIndex]);

  const showNav = cardCount > 1;

  return (
    <section id="studio" className="py-16 sm:py-20 lg:py-[88px]">
      <PageContainer>
        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <h2 className="font-bebas font-bold text-ggg-studio uppercase text-ggg-text [font-synthesis:weight_style]">
            <SplitText text={titleLeading} />{" "}
            <SplitText text={titleAccent} startDelay={150} className="text-ggg-accent" />
          </h2>
          {showNav ? (
            <div className="flex shrink-0 items-center gap-3 pb-1 min-[980px]:hidden">
              <CarouselNavButton direction="prev" label="Previous service" onClick={goPrev} />
              <CarouselNavButton direction="next" label="Next service" onClick={goNext} />
            </div>
          ) : null}
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[980px]:grid min-[980px]:grid-cols-3 min-[980px]:gap-5 min-[980px]:overflow-visible min-[980px]:pb-0"
        >
          {aboutGGG.cards.map((card, index) => (
            <ServiceCard key={card.id ?? card.title} card={card} index={index} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default AboutGGG;
