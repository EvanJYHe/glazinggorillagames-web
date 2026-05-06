import { cn } from "../../../../lib/utils.js";
import FadeIn from "../../shared/FadeIn/FadeIn.jsx";
import SplitText from "../../shared/SplitText/SplitText.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const STRIPE_PLACEHOLDER =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 14px), linear-gradient(180deg, #1a1a1a, #111)";

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

  return (
    <section id="studio" className="py-16 sm:py-20 lg:py-[88px]">
      <PageContainer>
        <h2 className="mb-4 font-bebas font-bold text-ggg-studio uppercase text-ggg-text [font-synthesis:weight_style] sm:mb-6">
          <SplitText text={titleLeading} />{" "}
          <SplitText text={titleAccent} startDelay={150} className="text-ggg-accent" />
        </h2>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[980px]:grid min-[980px]:grid-cols-3 min-[980px]:gap-5 min-[980px]:overflow-visible min-[980px]:pb-0">
          {aboutGGG.cards.map((card, index) => (
            <ServiceCard key={card.id ?? card.title} card={card} index={index} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default AboutGGG;
