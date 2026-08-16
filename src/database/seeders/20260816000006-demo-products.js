module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    await queryInterface.bulkInsert("products", [
      {
        id: 1,
        name: "Pro Gaming Laptop 16-inch",
        price: 1299.99,
        stock: 15,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: "Flagship Smartphone 5G",
        price: 899.50,
        stock: 30,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        name: "Noise Cancelling Headphones",
        price: 249.99,
        stock: 50,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 4,
        name: "Wireless Mechanical Keyboard",
        price: 119.00,
        stock: 25,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 5,
        name: "Ergonomic Optical Mouse",
        price: 49.99,
        stock: 40,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("products", null, {});
  }
};
