const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginUser);
router.post("/signUp", AuthController.signUp);
router.put("/forgetPassword", AuthController.forgetPassword);

module.exports = router;
