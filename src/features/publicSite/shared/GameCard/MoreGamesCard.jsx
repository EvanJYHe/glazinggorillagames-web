const DEFAULT_CONTENT = {
  countPrefix: "+",
  label: "more games",
  visitsUnitLabel: "combined visits",
};

const MoreGamesCard = ({ count, totalVisitsLabel, brandLogoUrl, content }) => {
  const text = { ...DEFAULT_CONTENT, ...(content || {}) };

  return (
    <div className="relative aspect-square overflow-hidden rounded-ggg-md border border-white/[0.06] bg-[#111]">
      {brandLogoUrl ? (
        <img
          src={brandLogoUrl}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-4%] top-[-2%] h-[78%] w-[78%] -rotate-[12deg] object-contain opacity-[0.16] [mask-image:linear-gradient(180deg,#000_0%,#000_50%,transparent_100%)]"
          loading="lazy"
          decoding="async"
        />
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col items-start gap-1.5 p-3.5 pb-4">
        <div className="font-bebas text-[clamp(56px,9vw,88px)] font-bold uppercase leading-[0.85] tracking-[0.005em] text-white [font-synthesis:weight_style]">
          {`${text.countPrefix}${count}`}
        </div>

        <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
          {text.label}
        </div>

        <div className="mt-1 inline-flex items-center gap-[5px] whitespace-nowrap text-[10.5px] font-semibold text-white/60 sm:text-[11px]">
          <span className="h-0 w-0 border-b-[3px] border-l-[5px] border-t-[3px] border-b-transparent border-l-ggg-accent border-t-transparent" />
          <span className="font-extrabold text-white/85">{totalVisitsLabel}</span>
          <span>{text.visitsUnitLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default MoreGamesCard;
