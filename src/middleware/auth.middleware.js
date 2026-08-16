const jwt = require("jsonwebtoken");
const STATUS = require("../utils/appStatusCode");

function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        statusCode: STATUS.UNAUTHORIZED,
        message: "Authentication token is required"
      });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).json({
      success: false,
      statusCode: STATUS.UNAUTHORIZED,
      message: "Invalid or expired token"
    });
  }
}

module.exports = { authenticate };