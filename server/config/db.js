require("dotenv").config();
const { Sequelize } = require("sequelize");
const { logger } = require("../utils/logger");

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: databaseUrl,
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    logger.info("Connection to Supabase has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
