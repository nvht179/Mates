const sequelize = require("../config/db");
const Person = require("./person.model");
const { logger } = require("../utils/logger");

// Sync all models with the database
sequelize
  .sync()
  .then(() => {
    logger.info("Database connected and models synced.");
  })
  .catch((err) => {
    logger.error("Error syncing models: ", err);
  });

module.exports = {
  sequelize,
  Person,
};
