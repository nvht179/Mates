const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../helpers/error");
const {
  getAllUsersDB,
  createUserDB,
  getUserByEmailDB,
} = require("../db/user.db");

class AuthService {
  login = async (email, password) => {
    try {
      const user = await getUserByEmailDB(email);
      if (!user) {
        throw new ErrorHandler(403, "Email is incorrect");
      }
      const { id, email, password: dbPassword } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);
      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Password is incorrect");
      }
      return { user: id, email };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new AuthService();
