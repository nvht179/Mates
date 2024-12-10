const AuthService = require("../services/auth.service");
const { ErrorHandler } = require("../helpers/error");

class AuthController {
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await AuthService.loginUser(email, password);
      res.status(200).json(user);
    }
    catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  signUp = async (req, res) => {
    try {
      const { name, email, password, phone, avatar } = req.body;
      const newUser = await AuthService.signUp(
        name,
        email,
        password,
        phone,
        avatar,
      );
      res.status(200).json(newUser);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const {email, newPassword, newPassword2} = req.body; 
      if (newPassword != newPassword2) {
        throw new ErrorHandler(404, "Password does not match");
      }
      const updatedUser = await AuthService.forgetPassword(email, newPassword);
      res.status(200).json(updatedUser);
    }
    catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };
}

module.exports = new AuthController();
