import Link from "next/link";

import SectionHeading from "../../shared/SectionHeading/SectionHeading.jsx";
import Button from "../../ui/Button.jsx";
import PageContainer from "../../ui/PageContainer.jsx";
import StateCard from "../../ui/StateCard.jsx";

import { MobileCarousel, PodiumLayout, TabletLayout } from "./TopTitlesShowcase.jsx";

const ambienceWashClass =
  "pointer-events-none absolute left-1/2 top-1/2 hidden h-[74%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_52%_72%_at_50%_50%,oklch(62%_0.19_24_/_0.08)_0%,oklch(62%_0.19_24_/_0.04)_28%,transparent_62%),radial-gradient(ellipse_78%_42%_at_50%_84%,rgba(19,24,56,0.22)_0%,transparent_72%)] blur-3xl sm:block";

const ambienceCenterClass =
  "pointer-events-none absolute left-1/2 top-[52%] hidden h-[32%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(62%_0.19_24_/_0.12)_0%,oklch(62%_0.19_24_/_0.04)_38%,transparent_72%)] blur-[90px] sm:block";

const ambienceLineClass =
  "pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,oklch(62%_0.19_24_/_0.1)_30%,oklch(62%_0.19_24_/_0.14)_50%,oklch(62%_0.19_24_/_0.1)_70%,transparent_100%)] sm:block";

const TopTitles = ({ error, gameCard, games, topTitles }) => (
  <PageContainer as="section" id="games" className="relative py-16 sm:py-20 lg:py-[100px]">
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-3 sm:mb-10 sm:gap-x-6">
      <SectionHeading title={topTitles.heading} />
      <Button
        as={Link}
        href="/games"
        variant="ghost"
        className="shrink-0 whitespace-nowrap px-5.5 py-2.5 text-xs max-[380px]:px-3 max-[380px]:py-2 max-[380px]:text-[10px]"
      >
        {topTitles.viewAllLabel}
      </Button>
    </div>

    {error && <StateCard className="rounded-ggg">{topTitles.errorMessage}</StateCard>}

    <div className="relative overflow-visible pb-2">
      <div className={ambienceWashClass} aria-hidden />
      <div className={ambienceCenterClass} aria-hidden />
      <div className={ambienceLineClass} aria-hidden />

      <PodiumLayout games={games} gameCard={gameCard} />
      <TabletLayout games={games} gameCard={gameCard} />
      <MobileCarousel games={games} gameCard={gameCard} />
    </div>
  </PageContainer>
);

export default TopTitles;
