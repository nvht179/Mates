const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");

class UserController {
  getUserByEmail = async (req, res) => {
    const email = req.params.email;
    const user = await UserService.getUserByEmail(email);
    res.status(200).json(user);
  };
}

module.exports = new UserController();
