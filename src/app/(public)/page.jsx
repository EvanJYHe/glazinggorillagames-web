import Footer from "@/features/publicSite/layout/Footer/Footer.jsx";
import Header from "@/features/publicSite/layout/Header/Header.jsx";
import AboutGGG from "@/features/publicSite/sections/AboutGGG/AboutGGG.jsx";
import Hero from "@/features/publicSite/sections/Hero/Hero.jsx";
import Media from "@/features/publicSite/sections/Media/Media.jsx";
import ProofBar from "@/features/publicSite/sections/ProofBar/ProofBar.jsx";
import TopTitles from "@/features/publicSite/sections/TopTitles/TopTitles.jsx";
import FadeIn from "@/features/publicSite/shared/FadeIn/FadeIn.jsx";
import { getPublicSiteHomePageData, getPrimaryGroupUrl } from "@/features/publicSite/data/publicSiteData.js";
import { getPublicSiteChromeState, getPublicSiteState } from "@/lib/publicSite/state.js";

export const revalidate = 30;

const dividerClass = "h-px w-full bg-ggg-border";

export default async function Page() {
  const chrome = await getPublicSiteChromeState();
  const state = await getPublicSiteState();
  const { siteContent } = state.contract;
  const { mediaAssets } = chrome;
  const groupUrl = getPrimaryGroupUrl(chrome.contract.catalog.groups);
  const pageData = getPublicSiteHomePageData({
    gameData: state.contract.catalog.games,
    groupData: state.contract.catalog.groups,
    totalData: state.contract.metrics,
    gameImages: state.contract.assets.games,
    siteContent,
  });
  const runtimeAvailable = state.contract.metrics.hasRuntimeData;

  return (
    <div className="min-h-screen isolate overflow-x-hidden bg-ggg-bg text-ggg-text font-medium">
      <Header
        brandLogoUrl={mediaAssets.brandLogo.url}
        groupUrl={groupUrl}
        header={siteContent.header}
        site={siteContent.site}
      />
      <Hero
        hero={siteContent.hero}
        heroKeyArtUrl={mediaAssets.heroKeyArt.url}
      />
      <FadeIn>
        <ProofBar proofBar={siteContent.proofBar} stats={pageData.stats} />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
      <FadeIn>
        <TopTitles
          error={!runtimeAvailable}
          gameCard={siteContent.gameCard}
          games={pageData.games}
          loading={false}
          topTitles={siteContent.topTitles}
        />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
      <FadeIn>
        <Media cards={pageData.mediaCards} media={siteContent.media} />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
      <FadeIn>
        <AboutGGG aboutGGG={siteContent.aboutGGG} />
      </FadeIn>
      <div className={dividerClass} role="presentation" aria-hidden />
      <Footer
        brandLogoUrl={mediaAssets.brandLogo.url}
        footer={siteContent.footer}
        groupUrl={groupUrl}
        media={siteContent.media}
        site={siteContent.site}
      />
    </div>
  );
}
