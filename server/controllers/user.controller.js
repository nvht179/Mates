const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");

class UserController {
  getUserByEmail = async (req, res) => {
    console.log(req.params.email);
    const email = req.params.email;
    console.log("UserController:", email);
    const user = await UserService.getUserByEmail(email);
    res.status(200).json(user);
  };
}

module.exports = new UserController();
