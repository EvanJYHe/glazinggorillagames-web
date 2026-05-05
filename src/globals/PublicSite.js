import { globalAccess } from "../lib/payload/access.js";

/** @type {import("payload").GlobalConfig} */
export const PublicSite = {
  slug: "public-site",
  access: globalAccess,
  fields: [
    {
      name: "shared",
      type: "json",
      required: true,
    },
    {
      name: "nav",
      type: "json",
      required: true,
    },
    {
      name: "hero",
      type: "json",
      required: true,
    },
    {
      name: "ticker",
      type: "json",
      required: true,
    },
    {
      name: "stats",
      type: "json",
      required: true,
    },
    {
      name: "catalog",
      type: "json",
      required: true,
    },
    {
      name: "social",
      type: "json",
      required: true,
      admin: {
        description: "Stores section copy only. Profiles and media cards live in their own collections.",
      },
    },
    {
      name: "studio",
      type: "json",
      required: true,
    },
    {
      name: "contact",
      type: "json",
      required: true,
    },
    {
      name: "footer",
      type: "json",
      required: true,
    },
    {
      name: "gameCard",
      type: "json",
      required: true,
    },
    {
      name: "gamesPage",
      type: "json",
      required: true,
    },
  ],
};
