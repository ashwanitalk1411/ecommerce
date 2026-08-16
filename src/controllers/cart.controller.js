const cartService = require("../services/cart.service");

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user.id);

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
}

async function addItem(req, res, next) {
  try {
    const item = await cartService.addItem(
      req.user.id,
      req.body.productId,
      req.body.quantity
    );

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: item
    });
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const item = await cartService.updateItem(
      req.user.id,
      req.params.id,
      req.body.quantity
    );

    res.json({
      success: true,
      message: "Cart item updated",
      data: item
    });
  } catch (error) {
    next(error);
  }
}

async function removeItem(req, res, next) {
  try {
    await cartService.removeItem(req.user.id, req.params.id);

    res.json({
      success: true,
      message: "Cart item removed"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem };