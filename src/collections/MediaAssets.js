import { adminsOnly, publicRead } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const MediaAssets = {
  slug: "media-assets",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "registryKey", "kind"],
  },
  access: publicRead,
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "registryKey",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "kind",
      type: "select",
      required: true,
      options: [
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Video",
          value: "video",
        },
      ],
    },
  ],
  hooks: adminsOnly,
};
