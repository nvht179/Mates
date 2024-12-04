const express = require("express");
const router = express.Router();

const studentRouters = require("./student.router");

router.use("/students", studentRouters);

module.exports = router;
