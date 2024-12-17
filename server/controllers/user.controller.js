const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");

class UserController {
  checkUserByEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const { user } = await UserService.checkUserByEmail(email);
      const message = "Successful";
      res.status(200).json({ message, user });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  getUserByID = async (req, res) => {
    try {
      const { id } = req.params;
      const { user } = await UserService.getUserByID(id);
      const message = "Successful";
      res.status(200).json({ message, user });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  }
}

module.exports = new UserController();
