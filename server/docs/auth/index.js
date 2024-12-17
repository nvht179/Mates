const checkEmailOTP = require("./checkEmailOTP");
const login = require("./login");
const signup = require("./signup");
const refreshToken = require("./refreshToken");
const forgetPassword = require("./forgetPassword");
const verifyEmail = require("./verifyEmail");
const checkOTP = require("./checkOTP");
const resendVerificationLink = require("./resendVerificatonLink");

module.exports = {
  "/auth/login": {
    ...login
  },
  "/auth/signUp": {
    ...signup
  },
  "/auth/resend-verification-link": {
    ...resendVerificationLink
  },
  "/auth/check-email-otp": {
    ...checkEmailOTP
  },
  "/auth/forgetPassword": {
    ...forgetPassword
  },
  "/auth/checkOTP": {
    ...checkOTP
  },
  "/auth/verify-email": {
    ...verifyEmail
  },
  "/auth/refresh-token": {
    ...refreshToken
  },
};