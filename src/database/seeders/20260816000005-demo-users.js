const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    const now = new Date();

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "System Admin",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: "Test User",
        email: "user@example.com",
        password: userPassword,
        role: "user",
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", {
      email: ["admin@example.com", "user@example.com"]
    });
  }
};
