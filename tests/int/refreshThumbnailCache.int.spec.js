// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

import { resolveGameThumbnailCache } from "@/lib/runtime/refresh.js";

const NOW = new Date("2026-05-09T12:00:00.000Z").getTime();
const ONE_DAY = 24 * 60 * 60 * 1000;

describe("resolveGameThumbnailCache", () => {
  it("reuses cached fields when within the 7-day window", async () => {
    const cacheImpl = vi.fn();
    const result = await resolveGameThumbnailCache({
      existing: {
        thumbnailCachedUrl: "https://cdn.example/game-thumbnails/1.png",
        thumbnailCachedAt: new Date(NOW - 3 * ONE_DAY).toISOString(),
      },
      image: { thumbnailUrl: "https://tr.rbxcdn.com/source.png" },
      universeId: 1,
      cacheImpl,
      now: NOW,
    });

    expect(cacheImpl).not.toHaveBeenCalled();
    expect(result.cachedUrl).toBe("https://cdn.example/game-thumbnails/1.png");
  });

  it("re-uploads when cached more than 7 days ago", async () => {
    const cacheImpl = vi
      .fn()
      .mockResolvedValue("https://cdn.example/game-thumbnails/1.png");
    const result = await resolveGameThumbnailCache({
      existing: {
        thumbnailCachedUrl: "https://cdn.example/game-thumbnails/1.png",
        thumbnailCachedAt: new Date(NOW - 8 * ONE_DAY).toISOString(),
      },
      image: { thumbnailUrl: "https://tr.rbxcdn.com/source.png" },
      universeId: 1,
      cacheImpl,
      now: NOW,
    });

    expect(cacheImpl).toHaveBeenCalledOnce();
    expect(result.cachedUrl).toBe("https://cdn.example/game-thumbnails/1.png");
    expect(result.cachedAt).toBe(new Date(NOW).toISOString());
  });

  it("uploads on first sight when no cached fields exist", async () => {
    const cacheImpl = vi
      .fn()
      .mockResolvedValue("https://cdn.example/game-thumbnails/42.png");
    const result = await resolveGameThumbnailCache({
      existing: null,
      image: { thumbnailUrl: "https://tr.rbxcdn.com/new.png" },
      universeId: 42,
      cacheImpl,
      now: NOW,
    });

    expect(cacheImpl).toHaveBeenCalledOnce();
    expect(result.cachedUrl).toBe("https://cdn.example/game-thumbnails/42.png");
    expect(result.cachedAt).toBe(new Date(NOW).toISOString());
  });

  it("keeps existing cached fields when the upload fails", async () => {
    const cacheImpl = vi.fn().mockResolvedValue(null);
    const existingAt = new Date(NOW - 30 * ONE_DAY).toISOString();
    const result = await resolveGameThumbnailCache({
      existing: {
        thumbnailCachedUrl: "https://cdn.example/game-thumbnails/1.png",
        thumbnailCachedAt: existingAt,
      },
      image: { thumbnailUrl: "https://tr.rbxcdn.com/source.png" },
      universeId: 1,
      cacheImpl,
      now: NOW,
    });

    expect(cacheImpl).toHaveBeenCalledOnce();
    expect(result.cachedUrl).toBe("https://cdn.example/game-thumbnails/1.png");
    expect(result.cachedAt).toBe(existingAt);
  });

  it("returns null fields when there is no source URL and nothing cached", async () => {
    const cacheImpl = vi.fn();
    const result = await resolveGameThumbnailCache({
      existing: null,
      image: null,
      universeId: 1,
      cacheImpl,
      now: NOW,
    });

    expect(cacheImpl).not.toHaveBeenCalled();
    expect(result.cachedUrl).toBeNull();
    expect(result.cachedAt).toBeNull();
  });
});
