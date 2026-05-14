// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

import { upsertGameWithThumbnailCache } from "@/lib/runtime/refresh.js";

function createPayloadMock({ existing }) {
  const updates = [];
  const creates = [];

  return {
    updates,
    creates,
    payload: {
      find: vi.fn().mockImplementation(async ({ collection }) => {
        if (collection === "runtime-game-metrics" && existing) {
          return { docs: [existing] };
        }
        return { docs: [] };
      }),
      update: vi.fn().mockImplementation(async (args) => {
        updates.push(args);
        return { ...existing, ...args.data };
      }),
      create: vi.fn().mockImplementation(async (args) => {
        creates.push(args);
        return args.data;
      }),
    },
  };
}

const baseGame = {
  universeId: 100,
  name: "Find The Hamster",
  description: "desc",
  playing: 156,
  maxPlayers: 20,
  created: null,
  updated: null,
  rootPlaceId: 1,
  favorites: 670739,
  likes: 0,
  downVotes: 0,
  isPlayable: true,
  genre: null,
  price: 0,
  fetched: true,
};

describe("upsertGameWithThumbnailCache visits guard", () => {
  it("preserves existing visits when Roblox returns 0 (transient API blank)", async () => {
    const { payload, updates } = createPayloadMock({
      existing: {
        id: 1,
        universeId: 100,
        visits: 12967700,
        thumbnailCachedUrl: "https://cdn.example/100.png",
        thumbnailCachedAt: new Date().toISOString(),
      },
    });

    await upsertGameWithThumbnailCache(payload, {
      game: { ...baseGame, visits: 0 },
      image: { thumbnailUrl: "https://tr.rbxcdn.com/x.png" },
      refreshedAt: new Date().toISOString(),
      logger: { warn() {} },
    });

    expect(updates).toHaveLength(1);
    expect(updates[0].data.visits).toBe(12967700);
    expect(updates[0].data.playing).toBe(156);
  });

  it("preserves existing visits when new value would regress below existing", async () => {
    const { payload, updates } = createPayloadMock({
      existing: { id: 1, universeId: 100, visits: 1_000_000 },
    });

    await upsertGameWithThumbnailCache(payload, {
      game: { ...baseGame, visits: 500_000 },
      image: null,
      refreshedAt: new Date().toISOString(),
      logger: { warn() {} },
    });

    expect(updates[0].data.visits).toBe(1_000_000);
  });

  it("writes new visits when value increases", async () => {
    const { payload, updates } = createPayloadMock({
      existing: { id: 1, universeId: 100, visits: 1_000_000 },
    });

    await upsertGameWithThumbnailCache(payload, {
      game: { ...baseGame, visits: 1_500_000 },
      image: null,
      refreshedAt: new Date().toISOString(),
      logger: { warn() {} },
    });

    expect(updates[0].data.visits).toBe(1_500_000);
  });

  it("accepts whatever visits the API returns for a brand-new game", async () => {
    const { payload, creates } = createPayloadMock({ existing: null });

    await upsertGameWithThumbnailCache(payload, {
      game: { ...baseGame, visits: 0 },
      image: null,
      refreshedAt: new Date().toISOString(),
      logger: { warn() {} },
    });

    expect(creates).toHaveLength(1);
    expect(creates[0].data.visits).toBe(0);
  });
});
