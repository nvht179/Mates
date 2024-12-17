const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");
const ClassDB = require("../db/class.db");

class UserService {
  checkUserByEmail = async (email) => {
    try {
      const user = await UserDB.getUserByEmailDB(email);
      if (!user) {
        throw new ErrorHandler(403, "Email does not exist");
      }
      const { id, name, phone, role, avatar } = user;

      let childEmail;
      if (role == "Parent") {
        const childID = await ClassDB.findChildID(id);
        const child = await UserDB.getUserByIdDB(childID);
        childEmail = child.email;
      }
      else {
        childEmail = ""
      }

      return { user: { id, email, name, phone, role, avatar, childEmail } };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  getUserByID = async (id) => {
    try {
      const user = await UserDB.getUserByIdDB(id);
      if (!user) {
        throw new ErrorHandler(403, "There are not any users");
      }
      const { email, name, phone, role, avatar } = user;

      let childEmail;
      if (role == "Parent") {
        const childID = await ClassDB.findChildID(id);
        const child = await UserDB.getUserByIdDB(childID);
        childEmail = child.email;
      }
      else {
        childEmail = ""
      }

      return { user: { id, email, name, phone, role, avatar, childEmail } };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new UserService();
