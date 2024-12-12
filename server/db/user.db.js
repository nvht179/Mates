const pool = require("../config/db");
const { Person } = require("../entities");

class UserDB {
  getAllUsersDB = async () => {
    const users = Person.findAll({});
    return users;
  };

  createUserDB = async (name, email, password, phone, avatar, isVerified) => {
    const newUser = await Person.create({
      name,
      email,
      password,
      phone,
      avatar,
      isVerified
    });
    return newUser;
  };

  getUserByEmailDB = async (email) => {
    const user = await Person.findAll({
      where: {
        email: email,
      },
    });
    return user[0];
  };

  getUserByIdDB = async (id) => {
    const user = await Person.findAll({
      where: {
        id: id,
      },
    });
    return user[0];
  };

  updatedUserDB = async (id, email, newPassword) => {
    const user = await Person.findByPk(id);
    user.password = newPassword;
    await user.save();
    return user;
  }

  verifyUserDB = async (id) => {
    const user = await Person.findByPk(id);
    user.isVerified = true;
    await user.save();
    return user;
  }
}

module.exports = new UserDB();

