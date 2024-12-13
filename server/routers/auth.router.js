const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginUser);
router.post("/signUp", AuthController.signUp);
router.put("/forgetPassword", AuthController.forgetPassword);

router.get('/verify-email', AuthController.verifyEmailAndSignup);

router.post('/check-email-otp', AuthController.forgetPasswordOTPEmail);

// token for reset password
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
