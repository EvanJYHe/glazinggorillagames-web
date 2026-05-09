// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cacheGameThumbnail } from "@/lib/runtime/thumbnailCache.js";

const REQUIRED_ENVS = {
  R2_BUCKET: "test-bucket",
  R2_PUBLIC_URL: "https://cdn.test.example",
  S3_ACCESS_KEY_ID: "key",
  S3_SECRET_ACCESS_KEY: "secret",
  S3_ENDPOINT: "https://s3.test.example",
};

let originalEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  Object.assign(process.env, REQUIRED_ENVS);
});

afterEach(() => {
  process.env = originalEnv;
  vi.restoreAllMocks();
});

function pngResponse(bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47])) {
  return new Response(bytes, {
    status: 200,
    headers: { "content-type": "image/png" },
  });
}

function makeS3Stub() {
  const send = vi.fn().mockResolvedValue({});
  return { send };
}

describe("cacheGameThumbnail", () => {
  it("uploads bytes to R2 and returns the public URL", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(pngResponse());
    const s3Client = makeS3Stub();

    const url = await cacheGameThumbnail({
      universeId: 12345,
      sourceUrl: "https://tr.rbxcdn.com/abc.png",
      fetchImpl,
      s3Client,
      logger: { warn: () => {} },
    });

    expect(url).toBe("https://cdn.test.example/game-thumbnails/12345.png");
    expect(fetchImpl).toHaveBeenCalledWith("https://tr.rbxcdn.com/abc.png");
    expect(s3Client.send).toHaveBeenCalledTimes(1);
    const command = s3Client.send.mock.calls[0][0];
    expect(command.input).toMatchObject({
      Bucket: "test-bucket",
      Key: "game-thumbnails/12345.png",
      ContentType: "image/png",
      CacheControl: "public, max-age=604800",
    });
  });

  it("returns null when the source fetch fails non-OK", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response("nope", { status: 404 }));
    const s3Client = makeS3Stub();
    const warn = vi.fn();

    const url = await cacheGameThumbnail({
      universeId: 7,
      sourceUrl: "https://tr.rbxcdn.com/missing.png",
      fetchImpl,
      s3Client,
      logger: { warn },
    });

    expect(url).toBeNull();
    expect(s3Client.send).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });

  it("returns null when S3 PUT throws", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(pngResponse());
    const s3Client = { send: vi.fn().mockRejectedValue(new Error("rate limit")) };
    const warn = vi.fn();

    const url = await cacheGameThumbnail({
      universeId: 9,
      sourceUrl: "https://tr.rbxcdn.com/x.png",
      fetchImpl,
      s3Client,
      logger: { warn },
    });

    expect(url).toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it("returns null and warns once when R2 envs are missing", async () => {
    delete process.env.R2_BUCKET;
    const fetchImpl = vi.fn();
    const s3Client = makeS3Stub();
    const warn = vi.fn();

    const url = await cacheGameThumbnail({
      universeId: 1,
      sourceUrl: "https://tr.rbxcdn.com/a.png",
      fetchImpl,
      s3Client,
      logger: { warn },
    });

    expect(url).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(s3Client.send).not.toHaveBeenCalled();
  });

  it("returns null with no upload when required args missing", async () => {
    const fetchImpl = vi.fn();
    const s3Client = makeS3Stub();

    const url = await cacheGameThumbnail({
      universeId: null,
      sourceUrl: "https://tr.rbxcdn.com/a.png",
      fetchImpl,
      s3Client,
    });

    expect(url).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(s3Client.send).not.toHaveBeenCalled();
  });
});
