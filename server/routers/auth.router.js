const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginUser);
router.post("/signUp", AuthController.signUp);
router.put("/forgetPassword", AuthController.forgetPassword);

// token for reset password
router.post("/check-token", AuthController.verifyResetToken);

router.post("/reset-password", AuthController.resetPassword);

router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
