import { access } from "node:fs/promises";
import path from "node:path";
import { getPayloadClient } from "../lib/payload/client.js";
import { getFallbackMediaCards } from "../lib/publicSite/seedData.js";

// Download https://www.instagram.com/reel/C_68B7KRJ8w/ and pass the local MP4:
// NODE_ENV=production pnpm exec tsx src/scripts/updateSocialShowcase.js /path/to/consume-instagram-C_68B7KRJ8w.mp4
const filePath = process.argv[2];
if (!filePath || path.extname(filePath).toLowerCase() !== ".mp4") {
  throw new Error("Pass the downloaded CONSUME reel as a local .mp4 file.");
}
await access(filePath);

const payload = await getPayloadClient();
const card = getFallbackMediaCards().find(({ id }) => id === "viral-reach");
const { docs: assets } = await payload.find({
  collection: "media-assets",
  where: { registryKey: { equals: card.assetRegistryKey } },
  depth: 0,
  limit: 1,
});
const existingCard = await payload.findByID({
  collection: "media-cards",
  id: card.id,
  depth: 0,
});
if (!assets[0] || existingCard.mediaAsset !== assets[0].id) {
  throw new Error("Expected the Social Media card to reference the viral reach asset.");
}

const asset = await payload.update({
  collection: "media-assets",
  id: assets[0].id,
  context: { trustedImport: true },
  overrideAccess: true,
  filePath: path.resolve(filePath),
  data: { title: "CONSUME — Instagram reel C_68B7KRJ8w", kind: "video" },
});
await payload.update({
  collection: "media-cards",
  id: card.id,
  context: { trustedImport: true },
  overrideAccess: true,
  data: {
    ctaHref: card.ctaHref,
    mediaAlt: card.mediaAlt,
    mediaOverlay: card.mediaOverlay,
  },
});
console.log(`Updated the Social Media showcase: ${asset.url}`);
process.exit(0);
