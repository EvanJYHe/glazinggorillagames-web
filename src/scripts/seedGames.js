import { getPayloadClient } from "../lib/payload/client.js";
import { fetchRobloxRuntimeData } from "../lib/runtime/roblox.js";
import {
  updateEditorialGameName,
  upsertGameWithThumbnailCache,
} from "../lib/runtime/refresh.js";

const universeIdArgs = process.argv.slice(2).map(Number);
if (!universeIdArgs.length || universeIdArgs.some((id) => !Number.isFinite(id))) {
  console.error("Usage: tsx src/scripts/seedGames.js <universeId> [<universeId> ...]");
  process.exit(1);
}

const payload = await getPayloadClient();

for (const universeId of universeIdArgs) {
  const existing = await payload.find({
    collection: "games",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { universeId: { equals: universeId } },
  });

  if (existing.docs[0]) {
    console.log(`Game ${universeId} already exists (id=${existing.docs[0].id}).`);
  } else {
    await payload.create({
      collection: "games",
      context: { trustedImport: true, skipSingleRefresh: true },
      overrideAccess: true,
      data: {
        universeId,
        isActive: true,
      },
    });
    console.log(`Created games entry for ${universeId}.`);
  }
}

const runtimeData = await fetchRobloxRuntimeData({
  games: universeIdArgs.map((universeId) => ({ universeId })),
  groups: [],
});

const refreshedAt = new Date().toISOString();
let hadFailure = false;

for (const universeId of universeIdArgs) {
  const game = runtimeData.games.find((entry) => entry.universeId === universeId);
  const image = runtimeData.images.find((entry) => entry.universeId === universeId);

  if (!game?.fetched) {
    hadFailure = true;
    console.warn(`Roblox fetch did not return data for game ${universeId}. The cron will retry.`);
    continue;
  }

  await Promise.all([
    upsertGameWithThumbnailCache(payload, { game, image, refreshedAt, logger: console }),
    updateEditorialGameName(payload, universeId, game.name),
  ]);
  console.log(`Synced from Roblox: ${game.name} (${game.visits ?? 0} visits).`);
}

if (runtimeData.warnings.length) {
  console.warn("Roblox warnings:", runtimeData.warnings);
}

process.exit(hadFailure ? 1 : 0);
