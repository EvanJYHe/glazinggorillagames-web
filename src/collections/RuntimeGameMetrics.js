import { adminOnlyAccess } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const RuntimeGameMetrics = {
  slug: "runtime-game-metrics",
  admin: {
    group: "Runtime",
    useAsTitle: "name",
    defaultColumns: ["name", "universeId", "playing", "visits", "refreshedAt"],
  },
  access: adminOnlyAccess,
  fields: [
    {
      name: "universeId",
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
      name: "playing",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "visits",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "maxPlayers",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "created",
      type: "date",
    },
    {
      name: "updated",
      type: "date",
    },
    {
      name: "rootPlaceId",
      type: "number",
    },
    {
      name: "favorites",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "likes",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "downVotes",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "isPlayable",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "genre",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "thumbnailUrl",
      type: "text",
    },
    {
      name: "thumbnailState",
      type: "text",
    },
    {
      name: "refreshedAt",
      type: "date",
      index: true,
      required: true,
    },
  ],
};
