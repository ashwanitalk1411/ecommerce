const STATUS = require("./appStatusCode");

function successResponse(
  res,
  data = null,
  message = "Success",
  statusCode = STATUS.OK
) {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data
  });
}

function errorResponse(
  res,
  message = "Internal server error",
  statusCode = STATUS.INTERNAL_SERVER_ERROR,
  details = null
) {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(details ? { details } : {})
  });
}

module.exports = {
  successResponse,
  errorResponse
};
