const checkEmailOTP = require("./checkEmailOTP");
const login = require("./login");
const signup = require("./signup");
const refreshToken = require("./refreshToken");
const forgetPassword = require("./forgetPassword");
const verifyEmail = require("./verifyEmail");
const checkOTP = require("./checkOTP");

module.exports = {
  "/auth/login": {
    ...login
  },
  "/auth/signUp": {
    ...signup
  },
  "/auth/check-email-otp": {
    ...checkEmailOTP
  },
  "/auth/refresh-token": {
    ...refreshToken
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
};