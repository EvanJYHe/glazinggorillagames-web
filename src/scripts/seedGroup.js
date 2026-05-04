import { getPayloadClient } from "../lib/payload/client.js";
import { refreshSingleGroup } from "../lib/runtime/singleRefresh.js";

const groupIdArg = Number(process.argv[2]);
if (!Number.isFinite(groupIdArg)) {
  console.error("Usage: tsx src/scripts/seedGroup.js <groupId>");
  process.exit(1);
}

try {
  const payload = await getPayloadClient();
  const existing = await payload.find({
    collection: "groups",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { groupId: { equals: groupIdArg } },
  });

  if (existing.docs[0]) {
    console.log(`Group ${groupIdArg} already exists (id=${existing.docs[0].id}). Refreshing from Roblox…`);
  } else {
    await payload.create({
      collection: "groups",
      context: { trustedImport: true, skipSingleRefresh: true },
      overrideAccess: true,
      data: {
        groupId: groupIdArg,
        isActive: true,
      },
    });
    console.log(`Created groups entry for ${groupIdArg}.`);
  }

  const refreshed = await refreshSingleGroup(groupIdArg);
  if (refreshed) {
    console.log(`Synced from Roblox: ${refreshed.name} (${refreshed.memberCount} members).`);
  } else {
    console.warn(`Roblox fetch did not return data for group ${groupIdArg}. The cron will retry.`);
  }

  process.exit(0);
} catch (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}
