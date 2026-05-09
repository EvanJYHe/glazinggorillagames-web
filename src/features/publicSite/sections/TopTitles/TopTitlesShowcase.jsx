import GameCardShowcase from "../../shared/GameCard/GameCardShowcase.jsx";

import { orderGamesForCenter, showcaseSlots, tabletOrder } from "./showcaseLayout.js";

export function PodiumLayout({ games, gameCard }) {
  const showcaseGames = orderGamesForCenter(games);

  return (
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
  );
}

export function TabletLayout({ games, gameCard }) {
  return (
    <div className="relative z-[1] hidden grid-cols-3 items-end gap-4 sm:grid lg:hidden">
      {tabletOrder(games).map((game, index) => (
        <GameCardShowcase
          key={game.universeId}
          game={game}
          gameCard={gameCard}
          showcaseSlot={index === 1 ? "hero" : "inner"}
        />
      ))}
    </div>
  );
}

export function MobileCarousel({ games, gameCard }) {
  if (games.length === 0) return null;

  return (
    <div className="relative z-[1] -mx-ggg flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-ggg pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden">
      {games.map((game, index) => (
        <div
          key={game.universeId}
          className="flex shrink-0 snap-center basis-[72%] max-[380px]:basis-[80%]"
        >
          <GameCardShowcase
            game={game}
            gameCard={gameCard}
            showcaseSlot={index === 0 ? "mobileLead" : "stack"}
          />
        </div>
      ))}
    </div>
  );
}
