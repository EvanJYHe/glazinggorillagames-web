import { Suspense } from "react";

import GamesGrid from "@/features/publicSite/routes/games/GamesGrid.jsx";
import GamesGallerySkeleton from "@/features/publicSite/routes/games/GamesGallerySkeleton.jsx";
import GamesShell from "@/features/publicSite/routes/games/GamesShell.jsx";
import { getPrimaryGroupUrl } from "@/features/publicSite/data/publicSiteData.js";
import { getPublicSiteChromeState } from "@/lib/publicSite/state.js";

export const revalidate = 30;

export default async function Page() {
  const chrome = await getPublicSiteChromeState();
  const groupUrl = getPrimaryGroupUrl(chrome.contract.catalog.groups);

  return (
    <GamesShell
      groupUrl={groupUrl}
      mediaAssets={chrome.mediaAssets}
      siteContent={chrome.contract.siteContent}
    >
      <Suspense fallback={<GamesGallerySkeleton />}>
        <GamesGrid />
      </Suspense>
    </GamesShell>
  );
}
