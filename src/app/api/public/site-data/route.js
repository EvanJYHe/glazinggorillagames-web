import { createPublicJsonResponse } from "@/lib/publicSite/api.js";
import { getPublicSiteState } from "@/lib/publicSite/state.js";

export async function GET() {
  const state = await getPublicSiteState();
  return createPublicJsonResponse(state.contract, "site-data");
}
