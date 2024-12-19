const pool = require("../config/db");
const { Person } = require("../entities");
const { Teacher, Student, Parent } = require("../entities/user.model");
const { ErrorHandler } = require("../helpers/error");

class UserDB {
  getAllUsersDB = async () => {
    const users = Person.findAll({});
    return users;
  };

  createUserDB = async (name, email, password, phone, avatar, role, isVerified) => {
    const newUser = await Person.create({
      name,
      email,
      password,
      phone,
      avatar,
      role,
      isVerified
    });
    return newUser;
  };

  createStudentDB = async (studentID) => {
    const student = await Student.create({
      studentID
    });
    return student;
  };

  createTeacherDB = async (teacherID) => {
    const teacher = await Teacher.create({
      teacherID
    });
    return teacher;
  };

  createParentDB = async (parentID, studentID) => {
    const parent = await Parent.create({
      parentID,
      studentID
    });
    return parent;
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
  };

  verifyUserDB = async (id) => {
    const user = await Person.findByPk(id);
    user.isVerified = true;
    await user.save();
    return user;
  };

  updatedResetTokenDB = async (id, OTP) => {
    const user = await Person.findByPk(id);
    user.resetToken = OTP;
    await user.save();
    return user;
  };

  updateUserInfo = async (id, email, name, phone, publicURL, linkTitle) => {
    try {
      let checkUser;
      const updatedUser = await Person.findByPk(id);
      if (email) {
        checkUser = await this.getUserByEmailDB(email);
        if (checkUser && email != updatedUser.email) {
          throw new ErrorHandler(403, "The email is exist");
        }
      }
      if (name) {
        updatedUser.name = name;
      }
      if (email) {
        updatedUser.email = email;
      }
      if (phone) {
        updatedUser.phone = phone;
      }
      if (publicURL) {
        updatedUser.avatar = publicURL;
      }
      updatedUser.save();
      return updatedUser;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new UserDB();

