const STATUS = require("../utils/appStatusCode");

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(STATUS.FORBIDDEN).json({
        success: false,
        statusCode: STATUS.FORBIDDEN,
        message: "You do not have permission to access this resource"
      });
    }

    next();
  };
}

module.exports = { authorize };