const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routers = require("./routers");
const { handleError } = require("./helpers/error");
const unknownEndpoint = require("./middleware/unknownEndpoint.middleware");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.use("/api", routers);
app.get("/", (req, res) =>
  res.send("<h1 style='text-align: center'>Mates API</h1>"),
);

app.use(handleError);
// app.use(unknownEndpoint);

module.exports = app;
