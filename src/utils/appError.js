const STATUS = require("./appStatusCode");

class AppError extends Error {
  constructor(message, statusCode = STATUS.INTERNAL_SERVER_ERROR, details = null) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message = "Bad request", details = null) {
    return new AppError(message, STATUS.BAD_REQUEST, details);
  }

  static unauthorized(message = "Unauthorized", details = null) {
    return new AppError(message, STATUS.UNAUTHORIZED, details);
  }

  static forbidden(message = "Forbidden", details = null) {
    return new AppError(message, STATUS.FORBIDDEN, details);
  }

  static notFound(message = "Resource not found", details = null) {
    return new AppError(message, STATUS.NOT_FOUND, details);
  }

  static conflict(message = "Conflict", details = null) {
    return new AppError(message, STATUS.CONFLICT, details);
  }

  static unprocessableEntity(
    message = "Unprocessable entity",
    details = null
  ) {
    return new AppError(message, STATUS.UNPROCESSABLE_ENTITY, details);
  }

  static tooManyRequests(message = "Too many requests", details = null) {
    return new AppError(message, STATUS.TOO_MANY_REQUESTS, details);
  }

  static internalServerError(
    message = "Internal server error",
    details = null
  ) {
    return new AppError(message, STATUS.INTERNAL_SERVER_ERROR, details);
  }
}

module.exports = AppError;

