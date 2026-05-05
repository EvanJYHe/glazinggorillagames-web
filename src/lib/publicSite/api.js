function createPublicSiteEtag(contract, scope) {
  const generatedAt = contract.meta.generatedAt || "no-runtime-data";
  const metricsKey = [
    contract.metrics.totalPlaying,
    contract.metrics.totalVisits,
    contract.metrics.totalMembers,
  ].join("-");

  return `"${scope}-${generatedAt}-${contract.catalog.games.length}-${contract.catalog.groups.length}-${metricsKey}"`;
}

export function createPublicJsonResponse(contract, scope, payload = contract) {
  const headers = new Headers({
    "Cache-Control": "public, max-age=300, must-revalidate",
    ETag: createPublicSiteEtag(contract, scope),
    "X-Data-Freshness":
      contract.meta.cacheAgeMs == null ? "unavailable" : `${Math.floor(contract.meta.cacheAgeMs / 1000)}s`,
  });

  if (contract.meta.generatedAt) {
    headers.set("Last-Modified", new Date(contract.meta.generatedAt).toUTCString());
  }

  return Response.json(payload, { headers });
}
