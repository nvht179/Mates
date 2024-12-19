const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const avatar = require("../middleware/avatar.middleware");

router.post("/checkUserByEmail", UserController.checkUserByEmail);
router.get("/getUserByID/:id", UserController.getUserByID);
router.put("/update-user-info", avatar, UserController.updateUserInfo);

module.exports = router;
