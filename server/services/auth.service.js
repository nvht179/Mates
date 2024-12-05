const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../helpers/error");
const {
  getAllUsersDB,
  createUserDB,
  getUserByEmailDB,
} = require("../db/user.db");

class AuthService {
  loginUser = async (email, password) => {
    try {
      const user = await getUserByEmailDB(email);
      console.log("AuthService:", user);
      if (!user) {
        throw new ErrorHandler(403, "Email is incorrect");
      }
      const { id, emailDB, password: dbPassword } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);
      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Password is incorrect");
      }
      console.log("AuthService:", user);
      return { user: id, email };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new AuthService();
