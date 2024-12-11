const sequelize = require("../config/db");
const Person = require("./person.model");
const { logger } = require("../utils/logger");
const Assignment = require("./assignment.model");
const Attachment = require("./attachment.model");

Assignment.hasMany(Attachment, { foreignKey: "assignmentId", as: "attachments" });
Attachment.belongsTo(Assignment, { foreignKey: "assignmentId", as: "assignment" });

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
  Assignment, 
  Attachment
};
