import { adminsOnly, publicRead } from "../lib/payload/access.js";
import { refreshSingleGame } from "../lib/runtime/singleRefresh.js";

/** @type {import("payload").CollectionConfig} */
export const Games = {
  slug: "games",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "universeId", "displayOrder"],
  },
  access: publicRead,
  fields: [
    {
      name: "universeId",
      type: "number",
      index: true,
      required: true,
      unique: true,
      admin: {
        description: "Roblox universe ID. Everything else (name, stats, thumbnail) is fetched from Roblox automatically.",
      },
    },
    {
      name: "name",
      type: "text",
      admin: {
        readOnly: true,
        description: "Synced from Roblox automatically.",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description:
          "Higher values appear first. Leave at 0 for the default ranking (sorted by lifetime visits). Use a positive value to pin a game above the rest.",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
  hooks: {
    ...adminsOnly,
    afterChange: [
      ({ context, doc, operation, req }) => {
        if (operation !== "create" || !doc?.universeId || context?.skipSingleRefresh) {
          return;
        }

        refreshSingleGame(doc.universeId).catch((error) => {
          req?.payload?.logger?.error?.(
            `Single-game refresh failed for universeId ${doc.universeId}: ${error?.message || error}`
          );
        });
      },
    ],
  },
};
