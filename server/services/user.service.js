const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");

class UserService {
  getUserByEmail = async (email) => {
    try {
      const user = await UserDB.getUserByEmailDB(email);
      return user;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new UserService();
