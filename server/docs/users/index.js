const checkEmail = require("./checkEmail");
const getUserByID = require("./getUserByID");

module.exports = {
  "/users/checkUserByEmail": {
    ...checkEmail
  },
  "/users/getUserByID/{id}": {
    ...getUserByID
  }
};