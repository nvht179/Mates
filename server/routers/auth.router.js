const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logout);
router.post("/signUp", AuthController.signUp);
router.put("/forgetPassword", AuthController.forgetPassword);
router.post("/checkOTP", AuthController.checkOTP);
router.post("/resend-verification-link", AuthController.resendVerificationLink);

router.get('/verify-email', AuthController.verifyEmailAndSignup);

router.post('/send-email-otp', AuthController.forgetPasswordOTPEmail);

// token for reset password
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
