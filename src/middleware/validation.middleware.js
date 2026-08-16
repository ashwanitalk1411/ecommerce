const STATUS = require("../utils/appStatusCode");

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        success: false,
        statusCode: STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: error.details.map((item) => item.message)
      });
    }

    req.body = value;
    next();
  };
}

module.exports = { validate };