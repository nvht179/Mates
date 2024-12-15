const checkEmailOTP = require("./checkEmailOTP");
const login = require("./login");
const signup = require("./signup");
const refreshToken = require("./refreshToken");
const forgetPassword = require("./forgetPassword");
const verifyEmail = require("./verifyEmail");

module.exports = {
  "/auth/login": {
    ...login
  },
  "/auth/signUp": {
    ...signup
  },
  "/auth/forgetPassword": {
    ...forgetPassword
  },
  "/auth/verify-email": {
    ...verifyEmail
  },
  "/auth/check-email-otp": {
    ...checkEmailOTP
  },
  "/auth/refresh-token": {
    ...refreshToken
  },
};