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

  forgetPassword = async (email, newPassword, newPassword2) => {
    try {
      const user = await UserDB.getUserByEmailDB(email);
      
      if (newPassword != newPassword2) {
        throw new ErrorHandler(404, "Password does not match");
      }

      if (!user) {
        throw new ErrorHandler(404, "Email does not exist");
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await UserDB.updatedUserDB(
        user.id,
        email,
        hashPassword
      );
      return { updatedUser };
    }
    catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new AuthService();
