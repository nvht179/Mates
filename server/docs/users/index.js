const checkEmail = require("./checkEmail");
const getUserByID = require("./getUserByID");
const updateUserInfo = require("./updateUserInfo");

module.exports = {
  "/users/checkUserByEmail": {
    ...checkEmail
  },
  "/users/getUserByID/{id}": {
    ...getUserByID
  },
  "/users/update-user-info": {
    ...updateUserInfo
  }
};