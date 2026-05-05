import {
  PUBLIC_SITE_MEDIA_REGISTRY_PATH,
  publicSiteMediaCatalog,
  publicSiteMediaCatalogInventory,
} from "./publicSiteMediaCatalog.js";

/*
 * Static shape for the public-site media registry. URLs come from Payload + R2
 * at runtime (see lib/publicSite/state.js). This file only holds the slot
 * shape so that components can reference `mediaAssets.brandLogo.url` without
 * a TypeError when the CMS-resolved data is unavailable.
 */
function emptyAsset(meta) {
  return { ...meta, url: "" };
}

export const publicSiteMediaAssets = {
  brandLogo: emptyAsset(publicSiteMediaCatalog.brandLogo),
  heroKeyArt: emptyAsset(publicSiteMediaCatalog.heroKeyArt),
  socialProof: {
    viralReach: emptyAsset(publicSiteMediaCatalog.socialProof.viralReach),
    creatorPartnerships: emptyAsset(publicSiteMediaCatalog.socialProof.creatorPartnerships),
    communityPreview: emptyAsset(publicSiteMediaCatalog.socialProof.communityPreview),
  },
  services: {
    brandIntegrations: emptyAsset(publicSiteMediaCatalog.services.brandIntegrations),
    originalGames: emptyAsset(publicSiteMediaCatalog.services.originalGames),
    publishingAcquisitions: emptyAsset(publicSiteMediaCatalog.services.publishingAcquisitions),
  },
};

export const publicSiteMediaAssetInventory = publicSiteMediaCatalogInventory.map((asset) =>
  getPublicSiteMediaAsset(asset.id)
);

export function getPublicSiteMediaAsset(assetKey) {
  return assetKey.split(".").reduce((value, segment) => value?.[segment], publicSiteMediaAssets);
}

export { PUBLIC_SITE_MEDIA_REGISTRY_PATH };
