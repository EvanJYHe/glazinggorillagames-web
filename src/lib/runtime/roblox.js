const ROBLOX_HEADERS = {
  Accept: "application/json",
  "User-Agent": "GGGBackend/2.0",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toISODate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function toErrorMessage(error) {
  return error?.message || String(error);
}

function uniqueNumbers(values) {
  return [...new Set(values.map((value) => Number(value)).filter((value) => Number.isFinite(value)))];
}

function buildUrl(url, params = {}) {
  const parsed = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      parsed.searchParams.set(key, value);
    }
  });

  return parsed.toString();
}

function isRetryableStatus(status) {
  return status === 429 || status >= 500;
}

export async function fetchJSONWithRetry(
  url,
  { fetchImpl = fetch, retries = 3, retryDelayMs = (attempt) => Math.min(1000 * 2 ** attempt, 5000), logger = console } = {}
) {
  let attempt = 0;

  while (true) {
    try {
      const response = await fetchImpl(url, {
        headers: ROBLOX_HEADERS,
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        const error = new Error(`Roblox responded with ${response.status} for ${url}`);
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } catch (error) {
      const retryable = isRetryableStatus(error.status);
      if (!retryable || attempt >= retries) {
        throw error;
      }

      const delay = retryDelayMs(attempt);
      logger.warn?.(`Roblox request failed (${toErrorMessage(error)}). Retrying in ${delay}ms.`);
      await sleep(delay);
      attempt += 1;
    }
  }
}

function fallbackGame(game) {
  return {
    universeId: game.universeId,
    name: game.name,
    description: game.description || null,
    playing: 0,
    visits: 0,
    maxPlayers: 0,
    created: null,
    updated: null,
    rootPlaceId: game.rootPlaceId || null,
    favorites: 0,
    likes: 0,
    downVotes: 0,
    isPlayable: false,
    genre: null,
    price: 0,
    fetched: false,
  };
}

function toRuntimeGame(game, apiGame, votesInfo) {
  if (!apiGame) {
    return fallbackGame(game);
  }

  return {
    universeId: game.universeId,
    name: apiGame.name || game.name,
    description: apiGame.description || null,
    playing: toNumber(apiGame.playing),
    visits: toNumber(apiGame.visits),
    maxPlayers: toNumber(apiGame.maxPlayers),
    created: toISODate(apiGame.created),
    updated: toISODate(apiGame.updated),
    rootPlaceId: toNumber(apiGame.rootPlaceId, game.rootPlaceId || 0) || null,
    favorites: toNumber(apiGame.favoritedCount),
    likes: toNumber(votesInfo?.upVotes),
    downVotes: toNumber(votesInfo?.downVotes),
    isPlayable: apiGame.isPlayable !== false,
    genre: apiGame.genre || null,
    price: toNumber(apiGame.price),
    fetched: true,
  };
}

function toRuntimeImage(game, apiGame, imageInfo) {
  return {
    universeId: game.universeId,
    name: apiGame?.name || game.name,
    media: imageInfo?.imageUrl
      ? [
          {
            imageUrl: imageInfo.imageUrl,
            state: imageInfo.state || null,
          },
        ]
      : [],
    thumbnailUrl: imageInfo?.imageUrl || null,
    thumbnailState: imageInfo?.state || null,
  };
}

function toRuntimeGroup(group, apiGroup) {
  if (!apiGroup) {
    return {
      groupId: group.groupId,
      name: group.name,
      description: group.description || null,
      memberCount: 0,
      fetched: false,
    };
  }

  return {
    groupId: group.groupId,
    name: apiGroup.name || group.name,
    description: apiGroup.description || group.description || null,
    memberCount: toNumber(apiGroup.memberCount),
    fetched: true,
  };
}

async function fetchBatchData({ universeIds, fetchImpl, logger }) {
  if (!universeIds.length) {
    return {
      gamesData: [],
      imagesData: [],
      votesData: [],
      warnings: [],
    };
  }

  const ids = universeIds.join(",");
  const requests = [
    {
      key: "gamesData",
      label: "games",
      url: buildUrl("https://games.roblox.com/v1/games", { universeIds: ids }),
    },
    {
      key: "imagesData",
      label: "images",
      url: buildUrl("https://thumbnails.roblox.com/v1/games/icons", {
        universeIds: ids,
        size: "512x512",
        format: "Png",
        isCircular: "false",
      }),
    },
    {
      key: "votesData",
      label: "votes",
      url: buildUrl("https://games.roblox.com/v1/games/votes", { universeIds: ids }),
    },
  ];

  const results = await Promise.all(
    requests.map(async (request) => {
      try {
        const response = await fetchJSONWithRetry(request.url, { fetchImpl, logger });
        return [request.key, response.data || [], null];
      } catch (error) {
        const message = `${request.label} fetch failed: ${toErrorMessage(error)}`;
        logger.warn?.(message);
        return [request.key, [], message];
      }
    })
  );

  return results.reduce(
    (accumulator, [key, data, warning]) => {
      accumulator[key] = data;
      if (warning) {
        accumulator.warnings.push(warning);
      }
      return accumulator;
    },
    {
      gamesData: [],
      imagesData: [],
      votesData: [],
      warnings: [],
    }
  );
}

async function fetchGroups({ groups, fetchImpl, logger }) {
  const results = await Promise.all(
    groups.map(async (group) => {
      try {
        const apiGroup = await fetchJSONWithRetry(`https://groups.roblox.com/v1/groups/${group.groupId}`, {
          fetchImpl,
          logger,
        });
        return {
          group: toRuntimeGroup(group, apiGroup),
          warning: null,
        };
      } catch (error) {
        const warning = `group ${group.groupId} fetch failed: ${toErrorMessage(error)}`;
        logger.warn?.(warning);
        return {
          group: toRuntimeGroup(group, null),
          warning,
        };
      }
    })
  );

  return {
    groups: results.map((result) => result.group),
    warnings: results.map((result) => result.warning).filter(Boolean),
  };
}

export async function fetchRobloxRuntimeData({ games = [], groups = [], fetchImpl = fetch, logger = console } = {}) {
  const universeIds = uniqueNumbers(games.map((game) => game.universeId));
  const { gamesData, imagesData, votesData, warnings: batchWarnings } = await fetchBatchData({
    universeIds,
    fetchImpl,
    logger,
  });
  const { groups: runtimeGroups, warnings: groupWarnings } = await fetchGroups({ groups, fetchImpl, logger });

  const gamesByUniverseId = new Map(gamesData.map((game) => [game.id, game]));
  const votesByUniverseId = new Map(votesData.map((vote) => [vote.id, vote]));
  const imagesByUniverseId = new Map(imagesData.map((image) => [image.targetId, image]));

  const runtimeGames = games.map((game) =>
    toRuntimeGame(game, gamesByUniverseId.get(game.universeId), votesByUniverseId.get(game.universeId))
  );
  const gameImages = games.map((game) =>
    toRuntimeImage(game, gamesByUniverseId.get(game.universeId), imagesByUniverseId.get(game.universeId))
  );

  return {
    games: runtimeGames,
    groups: runtimeGroups,
    images: gameImages,
    totals: {
      totalPlaying: runtimeGames.reduce((sum, game) => sum + (game.playing || 0), 0),
      totalVisits: runtimeGames.reduce((sum, game) => sum + (game.visits || 0), 0),
      totalMembers: runtimeGroups.reduce((sum, group) => sum + (group.memberCount || 0), 0),
    },
    warnings: [...batchWarnings, ...groupWarnings],
  };
}
