import { Suspense } from "react";

import HomeDynamicFallback from "@/features/publicSite/routes/home/HomeDynamicFallback.jsx";
import HomeDynamicSections from "@/features/publicSite/routes/home/HomeDynamicSections.jsx";
import HomeShell from "@/features/publicSite/routes/home/HomeShell.jsx";
import { getPrimaryGroupUrl } from "@/features/publicSite/data/publicSiteData.js";
import { getPublicSiteChromeState } from "@/lib/publicSite/state.js";

export const revalidate = 30;

export default async function Page() {
  const chrome = await getPublicSiteChromeState();
  const groupUrl = getPrimaryGroupUrl(chrome.contract.catalog.groups);

  return (
    <HomeShell
      groupUrl={groupUrl}
      mediaAssets={chrome.mediaAssets}
      siteContent={chrome.contract.siteContent}
    >
      <Suspense fallback={<HomeDynamicFallback />}>
        <HomeDynamicSections />
      </Suspense>
    </HomeShell>
  );
}
