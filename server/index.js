require("dotenv").config();
const http = require("http");
const app = require("./app");
const { logger } = require("./utils/logger");

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () =>
  logger.info(`Magic happening at http://localhost:${PORT}`),
);
