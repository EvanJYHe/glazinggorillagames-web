const CredibilityTicker = ({ ticker }) => {
  const items = [...ticker.items, ...ticker.items];

  return (
    <div
      className="group relative overflow-hidden border-y border-ggg-border bg-white/[0.016] bg-[linear-gradient(90deg,rgba(240,237,232,0.045)_1px,transparent_1px)] bg-[length:72px_100%] py-[13px]"
      aria-label={ticker.ariaLabel}
    >
      <div className="flex w-max animate-landing-ticker group-hover:[animation-play-state:paused]">
        {items.map((item, index) => (
          <div
            className="flex items-center gap-[7px] whitespace-nowrap px-9 font-inter text-xs font-semibold uppercase tracking-[0.12em] text-ggg-dim"
            key={`${item.text}-${index}`}
          >
            {item.star ? (
              <span className="text-[10px] text-ggg-accent">★</span>
            ) : (
              <span className="block size-1 rounded-full bg-ggg-accent" />
            )}
            {item.text}
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#090909_0%,transparent_6%,transparent_94%,#090909_100%)] min-[2000px]:bg-[linear-gradient(to_right,#090909_0%,#090909_8%,transparent_30%,transparent_70%,#090909_92%,#090909_100%)]"
      />
    </div>
  );
};

export default CredibilityTicker;
