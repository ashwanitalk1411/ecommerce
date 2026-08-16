const express = require("express");
const controller = require("../controllers/cart.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validation.middleware");
const {
  addCartItemSchema,
  updateCartItemSchema
} = require("../validations/cart.validation");

const router = express.Router();

router.use(authenticate);

router.get("/", controller.getCart);
router.post("/items", validate(addCartItemSchema), controller.addItem);
router.put("/items/:id", validate(updateCartItemSchema), controller.updateItem);
router.delete("/items/:id", controller.removeItem);

module.exports = router;