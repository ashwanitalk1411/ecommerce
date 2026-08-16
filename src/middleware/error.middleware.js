const STATUS = require("../utils/appStatusCode");

function notFound(req, res) {
  return res.status(STATUS.NOT_FOUND).json({
    success: false,
    statusCode: STATUS.NOT_FOUND,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message || "Internal server error",
    ...(error.details ? { details: error.details } : {})
  });
}

module.exports = { notFound, errorHandler };
