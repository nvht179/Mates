const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.post("/checkUserByEmail", UserController.checkUserByEmail);
router.get("/getUserByID/:id", UserController.getUserByID);

module.exports = router;
