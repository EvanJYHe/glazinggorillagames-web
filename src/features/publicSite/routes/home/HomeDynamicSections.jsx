import { getPublicSiteState } from "@/lib/publicSite/state.js";
import { getPublicSiteHomePageData } from "../../data/publicSiteData.js";
import Media from "../../sections/Media/Media.jsx";
import ProofBar from "../../sections/ProofBar/ProofBar.jsx";
import TopTitles from "../../sections/TopTitles/TopTitles.jsx";
import FadeIn from "../../shared/FadeIn/FadeIn.jsx";

const dividerClass = "h-px w-full bg-ggg-border";

export default async function HomeDynamicSections() {
  const state = await getPublicSiteState();
  const { siteContent } = state.contract;
  const pageData = getPublicSiteHomePageData({
    gameData: state.contract.catalog.games,
    groupData: state.contract.catalog.groups,
    totalData: state.contract.metrics,
    gameImages: state.contract.assets.games,
    siteContent,
  });

  const runtimeAvailable = state.contract.metrics.hasRuntimeData;

  return (
    <>
      <FadeIn>
        <ProofBar proofBar={siteContent.proofBar} stats={pageData.stats} />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
      <FadeIn>
        <TopTitles
          error={!runtimeAvailable}
          gameCard={siteContent.gameCard}
          games={pageData.games}
          topTitles={siteContent.topTitles}
        />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
      <FadeIn>
        <Media cards={pageData.mediaCards} media={siteContent.media} />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
    </>
  );
}
