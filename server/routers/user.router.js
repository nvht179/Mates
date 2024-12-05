const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/getUserByEmail/:email", UserController.getUserByEmail);

module.exports = router;
