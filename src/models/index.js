const sequelize = require("../config/database");

const User = require("./user.model")(sequelize);
const Product = require("./product.model")(sequelize);
const Cart = require("./cart.model")(sequelize);
const CartItem = require("./cartItem.model")(sequelize);

User.hasOne(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(CartItem, { foreignKey: "cartId", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem
};