const productService = require("../services/product.service");
const { successResponse } = require("../utils/response");
const STATUS = require("../utils/appStatusCode");

async function create(req, res, next) {
  try {
    const product = await productService.create(req.body);

    return successResponse(
      res,
      product,
      "Product created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const products = await productService.list();

    return successResponse(
      res,
      products,
      "Products retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const product = await productService.getById(req.params.id);

    return successResponse(
      res,
      product,
      "Product retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const product = await productService.update(req.params.id, req.body);

    return successResponse(
      res,
      product,
      "Product updated successfully",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await productService.remove(req.params.id);

    return successResponse(
      res,
      null,
      "Product deleted successfully",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { create, list, getById, update, remove };