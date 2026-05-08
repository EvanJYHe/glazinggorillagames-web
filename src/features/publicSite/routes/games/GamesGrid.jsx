import { getPublicSiteState } from "@/lib/publicSite/state.js";
import { getPublicSiteGamesPageData } from "../../data/publicSiteData.js";
import FadeIn from "../../shared/FadeIn/FadeIn.jsx";
import GameCardGrid from "../../shared/GameCard/GameCardGrid.jsx";
import StateCard from "../../ui/StateCard.jsx";
import { GAMES_GALLERY_GRID_CLASS } from "./GamesGallerySkeleton.jsx";

export default async function GamesGrid() {
  const state = await getPublicSiteState();
  const { siteContent } = state.contract;
  const pageData = getPublicSiteGamesPageData({
    gameData: state.contract.catalog.games,
    groupData: state.contract.catalog.groups,
    gameImages: state.contract.assets.games,
    siteContent,
  });

  const runtimeAvailable = state.contract.metrics.hasRuntimeData;
  const errorMessage = siteContent.topTitles.errorMessage;

  return (
    <>
      {!runtimeAvailable ? <StateCard>{errorMessage}</StateCard> : null}

      {pageData.games.length ? (
        <div className={GAMES_GALLERY_GRID_CLASS} aria-labelledby="games-page-heading">
          {pageData.games.map((game, index) => (
            <FadeIn
              key={game.universeId}
              variant="pop"
              delay={Math.min(index, 7) * 60}
              immediate
            >
              <GameCardGrid game={game} gameCard={siteContent.gameCard} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <StateCard>{siteContent.gamesPage.emptyMessage}</StateCard>
      )}
    </>
  );
}
