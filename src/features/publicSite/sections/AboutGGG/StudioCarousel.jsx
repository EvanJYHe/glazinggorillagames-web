"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const StudioCarousel = ({ heading, cardCount, children }) => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <>
      <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
        {heading}
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
        {children}
      </div>
    </>
  );
};

export default StudioCarousel;
