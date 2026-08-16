const STATUS = require("../utils/appStatusCode");
const { errorResponse } = require("../utils/response");

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return errorResponse(
        res,
        "You do not have permission to access this resource",
        STATUS.FORBIDDEN
      );
    }

    next();
  };
}

module.exports = { authorize };