const authService = require("../services/auth.service");
const { successResponse } = require("../utils/response");
const STATUS = require("../utils/appStatusCode");

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);

    return successResponse(
      res,
      user,
      "User registered successfully",
      STATUS.CREATED
    );
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body.email, req.body.password);

    return successResponse(res, result, "Login successful", STATUS.OK);
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };