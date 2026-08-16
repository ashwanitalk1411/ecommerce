module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    await queryInterface.bulkInsert("carts", [
      {
        id: 1,
        userId: 2, // Test User
        createdAt: now,
        updatedAt: now
      }
    ]);

    await queryInterface.bulkInsert("cart_items", [
      {
        id: 1,
        cartId: 1,
        productId: 3, // Headphones
        quantity: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        cartId: 1,
        productId: 5, // Mouse
        quantity: 2,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("cart_items", null, {});
    await queryInterface.bulkDelete("carts", null, {});
  }
};
