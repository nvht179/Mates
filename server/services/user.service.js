const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");

class UserService {
  checkUserByEmail = async (email) => {
    try {
      const user = await UserDB.getUserByEmailDB(email);
      if (!user) {
        throw new ErrorHandler(403, "Email does not exist");
      }
      return user;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new UserService();
