const sendEmailOTP = require("./sendEmailOTP");
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
  "/auth/send-email-otp": {
    ...sendEmailOTP
  },
  "/auth/checkOTP": {
    ...checkOTP
  },
  "/auth/forgetPassword": {
    ...forgetPassword
  },
  "/auth/verify-email": {
    ...verifyEmail
  },
  "/auth/refresh-token": {
    ...refreshToken
  },
};