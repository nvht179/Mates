const pino = require("pino");
const pinoPretty = require("pino-pretty");

// Create a logging instance
const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  },
  process.env.NODE_ENV !== "production" ? pinoPretty() : undefined,
);

module.exports.logger = logger;
