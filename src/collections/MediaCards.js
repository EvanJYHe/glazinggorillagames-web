import { adminsOnly, publicRead } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const MediaCards = {
  slug: "media-cards",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "headline", "eyebrow", "mediaType", "displayOrder"],
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
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Internal label shown in the admin list (not rendered on the public site).",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "eyebrow",
      type: "text",
    },
    {
      name: "headline",
      type: "text",
      required: true,
    },
    {
      name: "metricKey",
      type: "text",
    },
    {
      name: "subLabel",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "ctaLabel",
      type: "text",
    },
    {
      name: "ctaHref",
      type: "text",
    },
    {
      name: "mediaType",
      type: "select",
      options: [
        {
          label: "Video",
          value: "video",
        },
        {
          label: "Image",
          value: "image",
        },
      ],
      required: true,
    },
    {
      name: "mediaAsset",
      type: "relationship",
      relationTo: "media-assets",
      required: true,
    },
    {
      name: "mediaAlt",
      type: "text",
    },
    {
      name: "mediaOverlay",
      type: "json",
    },
    {
      name: "mediaPosition",
      type: "text",
    },
  ],
  hooks: adminsOnly,
};
