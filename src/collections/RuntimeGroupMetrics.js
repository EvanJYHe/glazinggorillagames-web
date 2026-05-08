import { adminOnlyAccess } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const RuntimeGroupMetrics = {
  slug: "runtime-group-metrics",
  admin: {
    group: "Runtime",
    useAsTitle: "name",
    defaultColumns: ["name", "groupId", "memberCount", "refreshedAt"],
  },
  access: adminOnlyAccess,
  fields: [
    {
      name: "groupId",
      type: "number",
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "memberCount",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "refreshedAt",
      type: "date",
      index: true,
      required: true,
    },
  ],
};
