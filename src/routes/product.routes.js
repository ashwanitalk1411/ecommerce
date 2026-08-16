const express = require("express");
const controller = require("../controllers/product.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { validate } = require("../middleware/validation.middleware");
const { productSchema } = require("../validations/product.validation");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(productSchema),
  controller.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(productSchema),
  controller.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  controller.remove
);

module.exports = router;