import Link from "next/link";

import GameCardShowcase from "../../shared/GameCard/GameCardShowcase.jsx";
import SectionHeading from "../../shared/SectionHeading/SectionHeading.jsx";
import Button from "../../ui/Button.jsx";
import PageContainer from "../../ui/PageContainer.jsx";
import StateCard from "../../ui/StateCard.jsx";

const showcaseSlots = ["outer", "inner", "featured", "inner", "outer"];

function orderGamesForCenter(games) {
  if (!games.length) return games;
  if (games.length === 5) {
    return [games[4], games[2], games[0], games[1], games[3]].filter(Boolean);
  }
  if (games.length <= 2) return games;

  const ordered = [];
  const centerIndex = Math.floor(games.length / 2);
  ordered[centerIndex] = games[0];

  let left = centerIndex - 1;
  let right = centerIndex + 1;
  let source = 1;

  while (source < games.length) {
    if (left >= 0) {
      ordered[left] = games[source];
      source += 1;
      left -= 1;
    }

    if (source < games.length && right < games.length) {
      ordered[right] = games[source];
      source += 1;
      right += 1;
    }
  }

  return ordered.filter(Boolean);
}

const TopTitles = ({ error, gameCard, games, loading, topTitles }) => {
  const showcaseGames = orderGamesForCenter(games);

  return (
    <PageContainer as="section" id="games" className="relative py-16 sm:py-20 lg:py-[100px]">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
        <SectionHeading title={topTitles.heading} />
        <Button as={Link} href="/games" variant="ghost" className="px-5.5 py-2.5 text-xs">
          {topTitles.viewAllLabel} →
        </Button>
      </div>

      {error && <StateCard className="rounded-ggg">{topTitles.errorMessage}</StateCard>}

      {loading && !games.length ? (
        <div className="grid grid-cols-5 items-end justify-items-stretch gap-4 max-[1280px]:grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="w-full" key={index}>
              <div className="w-full overflow-hidden rounded-ggg-lg border border-ggg-border bg-ggg-panel shadow-ggg-card">
                <div className="aspect-square animate-pulse bg-white/[0.03]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative overflow-visible pb-2">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_52%_72%_at_50%_50%,oklch(62%_0.19_24_/_0.08)_0%,oklch(62%_0.19_24_/_0.04)_28%,transparent_62%),radial-gradient(ellipse_78%_42%_at_50%_84%,rgba(19,24,56,0.22)_0%,transparent_72%)] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[52%] h-[32%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(62%_0.19_24_/_0.12)_0%,oklch(62%_0.19_24_/_0.04)_38%,transparent_72%)] blur-[90px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,oklch(62%_0.19_24_/_0.1)_30%,oklch(62%_0.19_24_/_0.14)_50%,oklch(62%_0.19_24_/_0.1)_70%,transparent_100%)]"
            aria-hidden
          />

          {/* Desktop podium — 5 games at ≥1024px */}
          <div className="relative z-[1] mx-auto hidden items-end gap-4 lg:flex">
            {showcaseGames.map((game, index) => (
              <GameCardShowcase
                key={game.universeId}
                game={game}
                gameCard={gameCard}
                showcaseSlot={showcaseSlots[index] ?? "inner"}
              />
            ))}
          </div>

          {/* Tablet — top 3 row at 640px–1023px (#2 left, #1 center featured, #3 right) */}
          <div className="relative z-[1] hidden grid-cols-3 items-end gap-4 sm:grid lg:hidden">
            {[games[1], games[0], games[2]].filter(Boolean).map((game, index) => (
              <GameCardShowcase
                key={game.universeId}
                game={game}
                gameCard={gameCard}
                showcaseSlot={index === 1 ? "featured" : "inner"}
              />
            ))}
          </div>

          {/* Mobile — top 1 only at <640px */}
          {games[0] ? (
            <div className="relative z-[1] mx-auto max-w-md sm:hidden">
              <GameCardShowcase game={games[0]} gameCard={gameCard} showcaseSlot="featured-mobile" />
            </div>
          ) : null}
        </div>
      )}
    </PageContainer>
  );
};

export default TopTitles;
