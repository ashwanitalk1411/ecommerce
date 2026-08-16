const STATUS = require("../utils/appStatusCode");
const { errorResponse } = require("../utils/response");

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return errorResponse(
        res,
        "Validation failed",
        STATUS.BAD_REQUEST,
        error.details.map((item) => item.message)
      );
    }

    req.body = value;
    next();
  };
}

module.exports = { validate };