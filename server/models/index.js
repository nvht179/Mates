const sequelize = require("../config/db");
const Person = require("./person.model");

// Sync all models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and models synced.");
  })
  .catch((err) => {
    console.error("Error syncing models: ", err);
  });

module.exports = {
  sequelize,
  Person,
};
