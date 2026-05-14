import { getPayloadClient } from "../payload/client.js";
import { fetchRobloxRuntimeData } from "./roblox.js";
import { cacheGameThumbnail } from "./thumbnailCache.js";

const THUMBNAIL_REFRESH_MS = 7 * 24 * 60 * 60 * 1000;

function toErrorMessage(error) {
  return error?.message || String(error);
}

function isCachedThumbnailFresh(cachedAt, now = Date.now()) {
  if (!cachedAt) {
    return false;
  }
  const cachedTime = new Date(cachedAt).getTime();
  if (Number.isNaN(cachedTime)) {
    return false;
  }
  return now - cachedTime < THUMBNAIL_REFRESH_MS;
}

async function findOne(payload, collection, where) {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where,
  });

  return result.docs[0] || null;
}

async function upsertByUniqueField(payload, collection, field, data) {
  const existing = await findOne(payload, collection, {
    [field]: {
      equals: data[field],
    },
  });

  if (existing) {
    return payload.update({
      id: existing.id,
      collection,
      context: {
        trustedImport: true,
      },
      data,
      overrideAccess: true,
    });
  }

  return payload.create({
    collection,
    context: {
      trustedImport: true,
    },
    data,
    overrideAccess: true,
  });
}

export function buildGameMetricsRow({ game, image, refreshedAt, cachedUrl = null, cachedAt = null }) {
  return {
    universeId: game.universeId,
    name: game.name,
    description: game.description,
    playing: game.playing,
    visits: game.visits,
    maxPlayers: game.maxPlayers,
    created: game.created,
    updated: game.updated,
    rootPlaceId: game.rootPlaceId,
    favorites: game.favorites,
    likes: game.likes,
    downVotes: game.downVotes,
    isPlayable: game.isPlayable,
    genre: game.genre,
    price: game.price,
    thumbnailUrl: image?.thumbnailUrl || null,
    thumbnailState: image?.thumbnailState || null,
    thumbnailCachedUrl: cachedUrl,
    thumbnailCachedAt: cachedAt,
    refreshedAt,
  };
}

export async function resolveGameThumbnailCache({
  existing,
  image,
  universeId,
  cacheImpl = cacheGameThumbnail,
  logger,
  now = Date.now(),
}) {
  const existingUrl = existing?.thumbnailCachedUrl || null;
  const existingAt = existing?.thumbnailCachedAt || null;

  if (existingUrl && isCachedThumbnailFresh(existingAt, now)) {
    return { cachedUrl: existingUrl, cachedAt: existingAt };
  }

  const sourceUrl = image?.thumbnailUrl;
  if (!sourceUrl) {
    return { cachedUrl: existingUrl, cachedAt: existingAt };
  }

  const newUrl = await cacheImpl({ universeId, sourceUrl, logger });
  if (!newUrl) {
    return { cachedUrl: existingUrl, cachedAt: existingAt };
  }

  return { cachedUrl: newUrl, cachedAt: new Date(now).toISOString() };
}

export function buildGroupMetricsRow(group, refreshedAt) {
  return {
    groupId: group.groupId,
    name: group.name,
    description: group.description,
    memberCount: group.memberCount,
    refreshedAt,
  };
}

export async function upsertGameMetrics(payload, row) {
  return upsertByUniqueField(payload, "runtime-game-metrics", "universeId", row);
}

export async function upsertGroupMetrics(payload, row) {
  return upsertByUniqueField(payload, "runtime-group-metrics", "groupId", row);
}

export async function updateEditorialGameName(payload, universeId, name) {
  if (!name) {
    return;
  }

  return payload
    .update({
      collection: "games",
      where: { universeId: { equals: universeId } },
      data: { name },
      context: { trustedImport: true },
      overrideAccess: true,
    })
    .catch(() => undefined);
}

export async function updateEditorialGroupName(payload, groupId, name) {
  if (!name) {
    return;
  }

  return payload
    .update({
      collection: "groups",
      where: { groupId: { equals: groupId } },
      data: { name },
      context: { trustedImport: true },
      overrideAccess: true,
    })
    .catch(() => undefined);
}

async function loadActiveCatalog(payload) {
  const [gamesResult, groupsResult] = await Promise.all([
    payload.find({
      collection: "games",
      depth: 0,
      limit: 500,
      overrideAccess: true,
      sort: "displayOrder",
      where: {
        isActive: {
          equals: true,
        },
      },
    }),
    payload.find({
      collection: "groups",
      depth: 0,
      limit: 200,
      overrideAccess: true,
      sort: "groupId",
      where: {
        isActive: {
          equals: true,
        },
      },
    }),
  ]);

  return {
    games: gamesResult.docs,
    groups: groupsResult.docs,
  };
}

export async function upsertGameWithThumbnailCache(payload, { game, image, refreshedAt, logger }) {
  const existing = await findOne(payload, "runtime-game-metrics", {
    universeId: { equals: game.universeId },
  });

  const { cachedUrl, cachedAt } = await resolveGameThumbnailCache({
    existing,
    image,
    universeId: game.universeId,
    logger,
  });

  const visits = Math.max(game.visits || 0, existing?.visits || 0);

  return upsertGameMetrics(
    payload,
    buildGameMetricsRow({ game: { ...game, visits }, image, refreshedAt, cachedUrl, cachedAt })
  );
}

async function upsertRuntimeRows(payload, { games, groups, images, refreshedAt, logger }) {
  const imagesByUniverseId = new Map(images.map((image) => [image.universeId, image]));
  const fetchedGames = games.filter((game) => game.fetched);
  const fetchedGroups = groups.filter((group) => group.fetched);

  await Promise.all([
    ...fetchedGames.flatMap((game) => {
      const image = imagesByUniverseId.get(game.universeId);
      return [
        upsertGameWithThumbnailCache(payload, { game, image, refreshedAt, logger }),
        updateEditorialGameName(payload, game.universeId, game.name),
      ];
    }),
    ...fetchedGroups.flatMap((group) => [
      upsertGroupMetrics(payload, buildGroupMetricsRow(group, refreshedAt)),
      updateEditorialGroupName(payload, group.groupId, group.name),
    ]),
  ]);
}

async function insertRefreshRun(
  payload,
  { errorMessage = null, finishedAt, result, startedAt, status, warnings = [] }
) {
  return payload.create({
    collection: "runtime-refresh-runs",
    context: {
      trustedImport: true,
    },
    data: {
      status,
      startedAt,
      finishedAt,
      gamesCount: result?.games?.length || 0,
      groupsCount: result?.groups?.length || 0,
      totalPlaying: result?.totals?.totalPlaying || 0,
      totalVisits: result?.totals?.totalVisits || 0,
      totalMembers: result?.totals?.totalMembers || 0,
      errorMessage,
      warnings,
      gamesSnapshot: result?.games || [],
      groupsSnapshot: result?.groups || [],
      imagesSnapshot: result?.images || [],
    },
    overrideAccess: true,
  });
}

export async function refreshRobloxRuntime({ fetchImpl = fetch, logger = console } = {}) {
  const payload = await getPayloadClient();
  const startedAt = new Date().toISOString();

  try {
    const catalog = await loadActiveCatalog(payload);
    logger.info?.(
      `Refreshing Roblox runtime for ${catalog.games.length} games and ${catalog.groups.length} groups.`
    );

    const result = await fetchRobloxRuntimeData({
      fetchImpl,
      games: catalog.games,
      groups: catalog.groups,
      logger,
    });
    const finishedAt = new Date().toISOString();
    const status = result.warnings.length ? "partial_failure" : "success";

    await upsertRuntimeRows(payload, {
      games: result.games,
      groups: result.groups,
      images: result.images,
      refreshedAt: finishedAt,
      logger,
    });
    await insertRefreshRun(payload, {
      finishedAt,
      result,
      startedAt,
      status,
      warnings: result.warnings,
    });

    return {
      ...result,
      finishedAt,
      startedAt,
      status,
    };
  } catch (error) {
    const finishedAt = new Date().toISOString();
    const message = toErrorMessage(error);

    await insertRefreshRun(payload, {
      errorMessage: message,
      finishedAt,
      result: null,
      startedAt,
      status: "failure",
      warnings: [message],
    }).catch((insertError) => {
      logger.error?.("Failed to record runtime refresh failure:", insertError);
    });

    throw error;
  }
}
