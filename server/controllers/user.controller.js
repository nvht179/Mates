const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");

class UserController {
  checkUserByEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserService.checkUserByEmail(email);
      res.status(200).json(user);
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(err.statusCode).json({ message });
    }
  };
}

module.exports = new UserController();
