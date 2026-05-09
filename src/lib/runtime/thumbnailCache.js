import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

let cachedClient = null;
let warnedAboutMissingEnv = false;

function getR2Config() {
  const {
    R2_BUCKET,
    R2_PUBLIC_URL,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
    S3_ENDPOINT,
  } = process.env;

  if (
    !R2_BUCKET ||
    !R2_PUBLIC_URL ||
    !S3_ACCESS_KEY_ID ||
    !S3_SECRET_ACCESS_KEY ||
    !S3_ENDPOINT
  ) {
    return null;
  }

  return {
    bucket: R2_BUCKET,
    publicUrl: R2_PUBLIC_URL.replace(/\/+$/, ""),
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    endpoint: S3_ENDPOINT,
  };
}

function getClient(config) {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new S3Client({
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    endpoint: config.endpoint,
    forcePathStyle: true,
    region: "auto",
  });

  return cachedClient;
}

export function buildThumbnailKey(universeId) {
  return `game-thumbnails/${universeId}.png`;
}

export async function cacheGameThumbnail({
  universeId,
  sourceUrl,
  fetchImpl = fetch,
  logger = console,
  s3Client,
} = {}) {
  if (!universeId || !sourceUrl) {
    return null;
  }

  const config = getR2Config();

  if (!config) {
    if (!warnedAboutMissingEnv) {
      logger.warn?.(
        "thumbnailCache: R2 envs missing — skipping thumbnail upload (subsequent skips will be silent)."
      );
      warnedAboutMissingEnv = true;
    }
    return null;
  }

  const key = buildThumbnailKey(universeId);

  try {
    const response = await fetchImpl(sourceUrl);
    if (!response.ok) {
      logger.warn?.(
        `thumbnailCache: source fetch ${response.status} for universeId=${universeId}`
      );
      return null;
    }
    const body = new Uint8Array(await response.arrayBuffer());

    const client = s3Client || getClient(config);
    await client.send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Body: body,
        ContentType: "image/png",
        CacheControl: "public, max-age=604800",
      })
    );

    return `${config.publicUrl}/${key}`;
  } catch (error) {
    logger.warn?.(
      `thumbnailCache: failed to cache universeId=${universeId}: ${error?.message || error}`
    );
    return null;
  }
}
