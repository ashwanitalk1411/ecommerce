const cartService = require("../services/cart.service");
const { successResponse } = require("../utils/response");
const STATUS = require("../utils/appStatusCode");

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user.id);

    return successResponse(
      res,
      cart,
      "Cart retrieved successfully",
      STATUS.OK
    );
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

    return successResponse(
      res,
      item,
      "Item added to cart",
      STATUS.CREATED
    );
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

    return successResponse(
      res,
      item,
      "Cart item updated",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
}

async function removeItem(req, res, next) {
  try {
    await cartService.removeItem(req.user.id, req.params.id);

    return successResponse(
      res,
      null,
      "Cart item removed",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem };