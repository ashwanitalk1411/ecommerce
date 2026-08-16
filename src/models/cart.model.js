const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: "carts",
      timestamps: true
    }
  );