const jwt = require("jsonwebtoken");
const STATUS = require("../utils/appStatusCode");
const { errorResponse } = require("../utils/response");

function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return errorResponse(
        res,
        "Authentication token is required",
        STATUS.UNAUTHORIZED
      );
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(
      res,
      "Invalid or expired token",
      STATUS.UNAUTHORIZED
    );
  }
}

module.exports = { authenticate };