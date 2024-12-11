const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");

class UserController {
  checkUserByEmail = async (req, res) => {
    try {
      const {email} = req.body;
      const user = await UserService.checkUserByEmail(email);
      res.status(200).json(user);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };
}

module.exports = new UserController();
