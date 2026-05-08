import { publicSiteMediaCatalog } from "./publicSiteMediaCatalog.js";

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

export function getPublicSiteMediaAsset(assetKey) {
  return assetKey.split(".").reduce((value, segment) => value?.[segment], publicSiteMediaAssets);
}
