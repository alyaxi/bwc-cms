const httpStatus = require('http-status');
const { roles } = require('../config/roles');
const ApiError = require('../utils/ApiError');

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      console.log(req.user, "ROLEEEEEEEEEEEEEE");

      const roleId = req.user.roleId?.toString(); // Ensure roleId is a string
      console.log(roleId, "roleeeeeeeeeeeeeeeeeeeeee");

      // Validate if the role exists
      if (!roles.getGrants()[roleId]) {
        return res.status(httpStatus.FORBIDDEN).json({
          message: "Invalid role ID or no permissions configured for this role.",
        });
      }

      const actionResource = `${action.toLowerCase()}:${resource}`;
      console.log(actionResource, "actionResource");

      // Check permissions
      const permission = roles.can(roleId)[action](resource);
      console.log(permission, "permissioneeeeeeeeeeeeeeeeeeee");

      // Check if permission is granted
      if (!permission.granted) {
        return res.status(httpStatus.FORBIDDEN).json({
          message: "You don't have enough permission to perform this action",
        });
      }

      next();
    } catch (error) {
      console.error("Error in grantAccess middleware:", error);
      next(error);
    }
  };
};

module.exports = { grantAccess };
