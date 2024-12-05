const { ErrorHandler } = require("../helpers/error");
const { getUserByEmailDB } = require("../db/user.db");

class UserService {
  getUserByEmail = async (email) => {
    console.log("UserService:", email);
    try {
      const user = await getUserByEmailDB(email);
      return user;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new UserService();
