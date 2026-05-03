import { isAdmin, isAdminOrSelf } from "../lib/payload/access.js";

/** @type {import("payload").CollectionConfig} */
export const Users = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    admin: isAdmin,
    create: async ({ req }) => {
      const existingUsers = await req.payload.count({
        collection: "users",
      });

      return existingUsers.totalDocs === 0 || Boolean(req.user?.role === "admin");
    },
    delete: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
      required: true,
    },
  ],
};
