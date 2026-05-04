import { getPayloadClient } from "../payload/client.js";

const emptyRuntime = {
  freshness: {
    cacheAgeMs: null,
    generatedAt: null,
    hasRuntimeData: false,
  },
  gameImages: [],
  games: [],
  groups: [],
  metrics: null,
};

function idWhere(field, ids) {
  return {
    [field]: {
      in: ids,
    },
  };
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function latestDate(...values) {
  const dates = values.map(parseDate).filter(Boolean).sort((a, b) => b.getTime() - a.getTime());
  return dates[0] || null;
}

function toGame(metric) {
  return {
    universeId: metric.universeId,
    name: metric.name,
    description: metric.description || null,
    playing: metric.playing || 0,
    visits: metric.visits || 0,
    maxPlayers: metric.maxPlayers || 0,
    created: metric.created || null,
    updated: metric.updated || null,
    rootPlaceId: metric.rootPlaceId || null,
  };
}

function toGroup(metric) {
  return {
    groupId: metric.groupId,
    name: metric.name,
    description: metric.description || null,
    memberCount: metric.memberCount || 0,
  };
}

function toGameImage(metric) {
  return {
    universeId: metric.universeId,
    name: metric.name,
    media: metric.thumbnailUrl
      ? [
          {
            imageUrl: metric.thumbnailUrl,
            state: metric.thumbnailState || null,
          },
        ]
      : [],
  };
}

export async function fetchRuntimePublicData({ groupIds = [], universeIds = [] } = {}) {
  try {
    const payload = await getPayloadClient();
    const [gamesResult, groupsResult, runsResult] = await Promise.all([
      universeIds.length
        ? payload.find({
            collection: "runtime-game-metrics",
            depth: 0,
            limit: 500,
            overrideAccess: true,
            where: idWhere("universeId", universeIds),
          })
        : Promise.resolve({ docs: [] }),
      groupIds.length
        ? payload.find({
            collection: "runtime-group-metrics",
            depth: 0,
            limit: 200,
            overrideAccess: true,
            where: idWhere("groupId", groupIds),
          })
        : Promise.resolve({ docs: [] }),
      payload.find({
        collection: "runtime-refresh-runs",
        depth: 0,
        limit: 1,
        overrideAccess: true,
        sort: "-finishedAt",
      }),
    ]);

    const games = gamesResult.docs.map(toGame);
    const groups = groupsResult.docs.map(toGroup);
    const gameImages = gamesResult.docs.map(toGameImage);
    const latestRun = runsResult.docs[0] || null;
    const latestMetricDate = latestDate(
      ...gamesResult.docs.map((game) => game.refreshedAt),
      ...groupsResult.docs.map((group) => group.refreshedAt)
    );
    const generatedAt = latestMetricDate?.toISOString() || latestRun?.finishedAt || null;
    const generatedAtDate = parseDate(generatedAt);

    return {
      metrics: generatedAt
        ? {
            totalPlaying: games.reduce((sum, game) => sum + (game.playing || 0), 0),
            totalVisits: games.reduce((sum, game) => sum + (game.visits || 0), 0),
            totalMembers: groups.reduce((sum, group) => sum + (group.memberCount || 0), 0),
          }
        : null,
      games,
      groups,
      gameImages,
      freshness: {
        generatedAt,
        cacheAgeMs: generatedAtDate ? Date.now() - generatedAtDate.getTime() : null,
        hasRuntimeData: Boolean(latestMetricDate || (generatedAt && latestRun?.status !== "failure")),
      },
    };
  } catch (error) {
    console.error("Failed to load runtime public data from Payload:", error);
    return emptyRuntime;
  }
}
