import { adminsOnly, publicRead } from "../lib/payload/access.js";
// import { refreshSingleGroup } from "../lib/runtime/singleRefresh.js";

/** @type {import("payload").CollectionConfig} */
export const Groups = {
  slug: "groups",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "groupId"],
  },
  access: publicRead,
  fields: [
    {
      name: "groupId",
      type: "number",
      index: true,
      required: true,
      unique: true,
      admin: {
        description: "Roblox group ID. Name and member count are fetched from Roblox automatically.",
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
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
  hooks: {
    ...adminsOnly,
    // afterChange: [
    //   ({ context, doc, operation, req }) => {
    //     if (operation !== "create" || !doc?.groupId || context?.skipSingleRefresh) {
    //       return;
    //     }
    //
    //     refreshSingleGroup(doc.groupId).catch((error) => {
    //       req?.payload?.logger?.error?.(
    //         `Single-group refresh failed for groupId ${doc.groupId}: ${error?.message || error}`
    //       );
    //     });
    //   },
    // ],
  },
};
