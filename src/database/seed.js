require("dotenv").config();
const path = require("path");
const fs = require("fs");
const sequelize = require("../config/database");

async function runSeeders() {
  const queryInterface = sequelize.getQueryInterface();
  const isReset = process.argv.includes("--reset");

  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    const seedersDir = path.join(__dirname, "seeders");
    const seederFiles = fs
      .readdirSync(seedersDir)
      .filter((file) => file.endsWith(".js"))
      .sort();

    if (isReset) {
      console.log("Rolling back seeders...");
      for (const file of [...seederFiles].reverse()) {
        const seeder = require(path.join(seedersDir, file));
        if (typeof seeder.down === "function") {
          console.log(`Reverting seeder: ${file}`);
          await seeder.down(queryInterface, sequelize.Sequelize);
        }
      }
      console.log("All seeders rolled back.");
    }

    console.log("Running seeders...");
    for (const file of seederFiles) {
      const seeder = require(path.join(seedersDir, file));
      console.log(`Executing seeder: ${file}`);
      await seeder.up(queryInterface, sequelize.Sequelize);
    }

    console.log("All seeders executed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
}

runSeeders();
