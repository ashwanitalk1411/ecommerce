const { Cart, CartItem, Product } = require("../models");
const AppError = require("../utils/appError");

async function getCart(userId) {
  let cart = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        include: [Product]
      }
    ]
  });

  if (!cart) {
    cart = await Cart.create({ userId });
    cart = await Cart.findByPk(cart.id, {
      include: [{ model: CartItem, include: [Product] }]
    });
  }

  return cart;
}

async function addItem(userId, productId, quantity) {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < quantity) {
    throw new AppError("Insufficient product stock", 400);
  }

  const [cart] = await Cart.findOrCreate({ where: { userId } });

  const existingItem = await CartItem.findOne({
    where: { cartId: cart.id, productId }
  });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (product.stock < newQuantity) {
      throw new AppError("Insufficient product stock", 400);
    }

    await existingItem.update({ quantity: newQuantity });
    return existingItem;
  }

  return CartItem.create({
    cartId: cart.id,
    productId,
    quantity
  });
}

async function updateItem(userId, itemId, quantity) {
  const cart = await Cart.findOne({ where: { userId } });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const item = await CartItem.findOne({
    where: { id: itemId, cartId: cart.id },
    include: [Product]
  });

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  if (item.Product.stock < quantity) {
    throw new AppError("Insufficient product stock", 400);
  }

  await item.update({ quantity });
  return item;
}

async function removeItem(userId, itemId) {
  const cart = await Cart.findOne({ where: { userId } });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const item = await CartItem.findOne({
    where: { id: itemId, cartId: cart.id }
  });

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  await item.destroy();
}

module.exports = { getCart, addItem, updateItem, removeItem };