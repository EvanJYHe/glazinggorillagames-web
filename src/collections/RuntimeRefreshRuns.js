import { adminOnlyAccess } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const RuntimeRefreshRuns = {
  slug: "runtime-refresh-runs",
  admin: {
    group: "Runtime",
    useAsTitle: "startedAt",
    defaultColumns: ["status", "startedAt", "finishedAt", "gamesCount", "groupsCount"],
  },
  access: adminOnlyAccess,
  fields: [
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Success", value: "success" },
        { label: "Partial Failure", value: "partial_failure" },
        { label: "Failure", value: "failure" },
      ],
    },
    {
      name: "startedAt",
      type: "date",
      index: true,
      required: true,
    },
    {
      name: "finishedAt",
      type: "date",
      required: true,
    },
    {
      name: "gamesCount",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "groupsCount",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "totalPlaying",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "totalVisits",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "totalMembers",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "errorMessage",
      type: "textarea",
    },
    {
      name: "warnings",
      type: "json",
    },
    {
      name: "gamesSnapshot",
      type: "json",
    },
    {
      name: "groupsSnapshot",
      type: "json",
    },
    {
      name: "imagesSnapshot",
      type: "json",
    },
  ],
};
