const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");

class AuthService {
  loginUser = async (email, password) => {
    try {
      const user = await UserDB.getUserByEmailDB(email);
      if (!user) {
        throw new ErrorHandler(403, "Email is incorrect");
      }
      const { id, emailDB, password: dbPassword } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);
      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Password is incorrect");
      }
      return { user: id, email };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  signUp = async (name, email, password, phone, avatar) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const userByEmail = await UserDB.getUserByEmailDB(email);
      if (userByEmail) {
        throw new ErrorHandler(401, "Email is taken already !");
      }

      const newUser = await UserDB.createUserDB(
        name,
        email,
        hashPassword,
        phone,
        avatar,
      );
      return { newUser };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new AuthService();
