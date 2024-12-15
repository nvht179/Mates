const checkEmail = require("./checkEmail");

module.exports = {
  "/users/checkUserByEmail": {
    ...checkEmail
  }
};