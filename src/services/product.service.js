const { Product } = require("../models");
const AppError = require("../utils/appError");

async function create(data) {
  return Product.create(data);
}

async function list() {
  return Product.findAll({ order: [["id", "DESC"]] });
}

async function getById(id) {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
}

async function update(id, data) {
  const product = await getById(id);
  await product.update(data);
  return product;
}

async function remove(id) {
  const product = await getById(id);
  await product.destroy();
}

module.exports = { create, list, getById, update, remove };