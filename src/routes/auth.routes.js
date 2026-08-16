const express = require("express");
const controller = require("../controllers/auth.controller");
const { validate } = require("../middleware/validation.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;