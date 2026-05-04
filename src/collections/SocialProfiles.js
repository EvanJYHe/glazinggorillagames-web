import { adminsOnly, publicRead } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const SocialProfiles = {
  slug: "social-profiles",
  admin: {
    useAsTitle: "platform",
    defaultColumns: ["platform", "href", "displayOrder"],
  },
  access: publicRead,
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "platform",
      type: "text",
      required: true,
    },
    {
      name: "href",
      type: "text",
      required: true,
    },
  ],
  hooks: adminsOnly,
};
