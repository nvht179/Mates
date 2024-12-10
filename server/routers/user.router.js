const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.post("/checkUserByEmail", UserController.checkUserByEmail);

module.exports = router;
