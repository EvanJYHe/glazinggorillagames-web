import { getPayloadClient } from "../payload/client.js";
import { fetchRobloxRuntimeData } from "./roblox.js";
import {
  buildGroupMetricsRow,
  updateEditorialGameName,
  updateEditorialGroupName,
  upsertGameWithThumbnailCache,
  upsertGroupMetrics,
} from "./refresh.js";

export async function refreshSingleGame(universeId, { fetchImpl = fetch, logger = console } = {}) {
  const id = Number(universeId);
  if (!Number.isFinite(id)) {
    return null;
  }

  const payload = await getPayloadClient();
  const result = await fetchRobloxRuntimeData({
    fetchImpl,
    games: [{ universeId: id }],
    groups: [],
    logger,
  });

  const game = result.games.find((entry) => entry.universeId === id);
  if (!game?.fetched) {
    return null;
  }

  const image = result.images.find((entry) => entry.universeId === id);
  const refreshedAt = new Date().toISOString();

  await Promise.all([
    upsertGameWithThumbnailCache(payload, { game, image, refreshedAt, logger }),
    updateEditorialGameName(payload, id, game.name),
  ]);

  return game;
}

export async function refreshSingleGroup(groupId, { fetchImpl = fetch, logger = console } = {}) {
  const id = Number(groupId);
  if (!Number.isFinite(id)) {
    return null;
  }

  const payload = await getPayloadClient();
  const result = await fetchRobloxRuntimeData({
    fetchImpl,
    games: [],
    groups: [{ groupId: id }],
    logger,
  });

  const group = result.groups.find((entry) => entry.groupId === id);
  if (!group?.fetched) {
    return null;
  }

  const refreshedAt = new Date().toISOString();

  await Promise.all([
    upsertGroupMetrics(payload, buildGroupMetricsRow(group, refreshedAt)),
    updateEditorialGroupName(payload, id, group.name),
  ]);

  return group;
}
