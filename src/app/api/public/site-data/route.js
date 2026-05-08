import { createPublicJsonResponse } from "@/lib/publicSite/api.js";
import { getPublicSiteState } from "@/lib/publicSite/state.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = await getPublicSiteState();
  return createPublicJsonResponse(state.contract, "site-data");
}
