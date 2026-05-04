// @vitest-environment node
import { describe, it, expect } from "vitest";

import { fetchJSONWithRetry, fetchRobloxRuntimeData } from "@/lib/runtime/roblox.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
    status,
  });
}

function createFetchStub(routes) {
  const calls = [];

  return {
    calls,
    fetch: async (url) => {
      calls.push(url);
      const route = routes.find((candidate) => url.includes(candidate.includes));

      if (!route) {
        throw new Error(`Unexpected URL: ${url}`);
      }

      if (route.error) {
        throw route.error;
      }

      return jsonResponse(route.body, route.status || 200);
    },
  };
}

describe("roblox runtime", () => {
  it("fetchRobloxRuntimeData merges games, images, votes, and groups", async () => {
    const { fetch: fetchImpl } = createFetchStub([
      {
        includes: "games.roblox.com/v1/games?",
        body: {
          data: [
            {
              id: 100,
              name: "Live Game",
              description: "From Roblox",
              playing: 12,
              visits: 3400,
              maxPlayers: 20,
              rootPlaceId: 500,
              favoritedCount: 77,
              isPlayable: true,
            },
          ],
        },
      },
      {
        includes: "thumbnails.roblox.com",
        body: {
          data: [{ targetId: 100, imageUrl: "https://cdn.example/game.png", state: "Completed" }],
        },
      },
      {
        includes: "games.roblox.com/v1/games/votes",
        body: {
          data: [{ id: 100, upVotes: 9, downVotes: 1 }],
        },
      },
      {
        includes: "groups.roblox.com/v1/groups/200",
        body: {
          name: "Live Group",
          description: "Group from Roblox",
          memberCount: 123,
        },
      },
    ]);

    const result = await fetchRobloxRuntimeData({
      fetchImpl,
      games: [{ universeId: 100, name: "CMS Game" }],
      groups: [{ groupId: 200, name: "CMS Group" }],
      logger: { warn() {} },
    });

    expect(result.warnings.length).toBe(0);
    expect(result.games[0].name).toBe("Live Game");
    expect(result.games[0].playing).toBe(12);
    expect(result.games[0].likes).toBe(9);
    expect(result.images[0].thumbnailUrl).toBe("https://cdn.example/game.png");
    expect(result.groups[0].memberCount).toBe(123);
    expect(result.totals).toEqual({
      totalMembers: 123,
      totalPlaying: 12,
      totalVisits: 3400,
    });
  });

  it("fetchRobloxRuntimeData returns empty snapshots for empty active catalog", async () => {
    const result = await fetchRobloxRuntimeData({
      fetchImpl: async () => {
        throw new Error("fetch should not be called");
      },
      games: [],
      groups: [],
      logger: { warn() {} },
    });

    expect(result.games).toEqual([]);
    expect(result.groups).toEqual([]);
    expect(result.images).toEqual([]);
    expect(result.warnings).toEqual([]);
    expect(result.totals).toEqual({
      totalMembers: 0,
      totalPlaying: 0,
      totalVisits: 0,
    });
  });

  it("fetchRobloxRuntimeData records partial failures with fallback snapshots", async () => {
    const { fetch: fetchImpl } = createFetchStub([
      {
        includes: "games.roblox.com/v1/games?",
        status: 400,
        body: { error: "nope" },
      },
      {
        includes: "thumbnails.roblox.com",
        body: { data: [] },
      },
      {
        includes: "games.roblox.com/v1/games/votes",
        body: { data: [] },
      },
      {
        includes: "groups.roblox.com/v1/groups/200",
        status: 400,
        body: { error: "nope" },
      },
    ]);

    const result = await fetchRobloxRuntimeData({
      fetchImpl,
      games: [{ universeId: 100, name: "CMS Game", rootPlaceId: 500 }],
      groups: [{ groupId: 200, name: "CMS Group" }],
      logger: { warn() {} },
    });

    expect(result.games[0].fetched).toBe(false);
    expect(result.games[0].playing).toBe(0);
    expect(result.games[0].rootPlaceId).toBe(500);
    expect(result.groups[0].fetched).toBe(false);
    expect(result.groups[0].memberCount).toBe(0);
    expect(result.warnings.length).toBe(2);
  });

  it("fetchJSONWithRetry retries 429 responses", async () => {
    let attempts = 0;
    const fetchImpl = async () => {
      attempts += 1;
      return attempts === 1 ? jsonResponse({ error: "rate limited" }, 429) : jsonResponse({ ok: true });
    };

    const result = await fetchJSONWithRetry("https://example.com", {
      fetchImpl,
      logger: { warn() {} },
      retryDelayMs: () => 0,
    });

    expect(result).toEqual({ ok: true });
    expect(attempts).toBe(2);
  });
});
