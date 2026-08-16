require("dotenv").config();
const path = require("path");
const fs = require("fs");
const sequelize = require("../config/database");

async function runMigrations() {
  const queryInterface = sequelize.getQueryInterface();
  const isReset = process.argv.includes("--reset");

  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    const migrationsDir = path.join(__dirname, "migrations");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".js"))
      .sort();

    if (isReset) {
      console.log("Rolling back migrations...");
      for (const file of [...migrationFiles].reverse()) {
        const migration = require(path.join(migrationsDir, file));
        if (typeof migration.down === "function") {
          console.log(`Reverting: ${file}`);
          await migration.down(queryInterface, sequelize.Sequelize);
        }
      }
      console.log("All migrations rolled back.");
    }

    console.log("Running migrations...");
    for (const file of migrationFiles) {
      const migration = require(path.join(migrationsDir, file));
      console.log(`Applying: ${file}`);
      await migration.up(queryInterface, sequelize.Sequelize);
    }

    console.log("All migrations executed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

runMigrations();
