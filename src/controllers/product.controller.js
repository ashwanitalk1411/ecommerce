const productService = require("../services/product.service");

async function create(req, res, next) {
  try {
    const product = await productService.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const products = await productService.list();

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const product = await productService.getById(req.params.id);

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const product = await productService.update(req.params.id, req.body);

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await productService.remove(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, list, getById, update, remove };