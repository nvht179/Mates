const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routers = require("./routers");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routers);

app.get("/", (req, res) =>
  res.send("<h1 style='text-align: center'>Mates API</h1>"),
);

module.exports = app;
