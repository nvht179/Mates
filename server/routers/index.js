const express = require("express");
const router = express.Router();
const swaggerDocument = require("../swagger.json");
const swaggerUi = require("swagger-ui-express");

const authRouter = require("./auth.router");
const userRouter = require("./user.router");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;