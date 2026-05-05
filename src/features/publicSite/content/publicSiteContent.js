import {
  clonePublicSiteContractContent,
  CONTACT_EMAIL,
  GROUP_URL,
} from "./publicSiteContractContent.js";

const content = clonePublicSiteContractContent();

content.header = content.nav;
content.proofBar = {
  ticker: content.ticker,
  statsAriaLabel: content.stats.ariaLabel,
  fallbacks: content.stats.fallbacks,
  statCards: content.stats.cards,
};
content.topTitles = content.catalog;
content.media = content.social;
content.aboutGGG = content.studio;
content.workTogether = {
  ...content.contact,
};

export const publicSiteContent = content;
export { content };
export { CONTACT_EMAIL, GROUP_URL };
