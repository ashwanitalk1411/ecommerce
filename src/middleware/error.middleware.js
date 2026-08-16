const STATUS = require("../utils/appStatusCode");
const { errorResponse } = require("../utils/response");

function notFound(req, res) {
  return errorResponse(
    res,
    `Route not found: ${req.method} ${req.originalUrl}`,
    STATUS.NOT_FOUND
  );
}

function errorHandler(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;

  return errorResponse(
    res,
    error.message || "Internal server error",
    statusCode,
    error.details || null
  );
}

module.exports = { notFound, errorHandler };

