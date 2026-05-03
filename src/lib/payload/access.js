export const isAdmin = ({ req }) => req.user?.role === "admin";

export const isAdminOrSelf = ({ req, id }) => {
  if (!req.user) {
    return false;
  }

  return req.user.id === id || req.user.role === "admin";
};

export const publicRead = {
  create: isAdmin,
  delete: isAdmin,
  read: () => true,
  update: isAdmin,
};

export const adminOnlyAccess = {
  create: isAdmin,
  delete: isAdmin,
  read: isAdmin,
  update: isAdmin,
};

export const globalAccess = {
  read: () => true,
  update: isAdmin,
};

export const adminsOnly = {
  beforeOperation: [
    ({ context, operation, req }) => {
      if (operation === "read") {
        return;
      }

      if (context?.trustedImport) {
        return;
      }

      if (!req.user) {
        throw new Error("Authentication required.");
      }
    },
  ],
};
