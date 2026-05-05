import { clonePublicSiteContractContent } from "@/features/publicSite/content/publicSiteContractContent.js";
import { publicSiteMediaCatalogInventory } from "@/features/publicSite/content/publicSiteMediaCatalog.js";

const fallbackContract = clonePublicSiteContractContent();

export function getFallbackSiteSettings() {
  return {
    site: fallbackContract.site,
  };
}

export function getFallbackPublicSiteGlobal() {
  return {
    shared: fallbackContract.shared,
    nav: fallbackContract.nav,
    hero: fallbackContract.hero,
    ticker: fallbackContract.ticker,
    stats: fallbackContract.stats,
    catalog: fallbackContract.catalog,
    social: {
      heading: fallbackContract.social.heading,
      previousAriaLabel: fallbackContract.social.previousAriaLabel,
      nextAriaLabel: fallbackContract.social.nextAriaLabel,
    },
    studio: fallbackContract.studio,
    contact: fallbackContract.contact,
    footer: fallbackContract.footer,
    gameCard: fallbackContract.gameCard,
    gamesPage: fallbackContract.gamesPage,
  };
}

export function getFallbackSocialProfiles() {
  return fallbackContract.social.links.map((profile, index) => ({
    ...profile,
    displayOrder: index,
  }));
}

export function getFallbackMediaCards() {
  return fallbackContract.social.mediaCards.map((card, index) => ({
    ...card,
    displayOrder: index,
    assetRegistryKey: card.mediaAsset,
  }));
}

export function getFallbackMediaAssetDocs() {
  return publicSiteMediaCatalogInventory.map((asset) => ({
    ...asset,
    title: asset.id,
    registryKey: asset.id,
  }));
}
