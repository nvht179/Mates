const AuthService = require("../services/auth.service");
const { ErrorHandler } = require("../helpers/error");

class AuthController {
  loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthService.loginUser(email, password);
    res.status(200).json(user);
  };

  signUp = async (req, res) => {
    const { name, email, password, phone, avatar } = req.body;
    const newUser = await AuthService.signUp(
      name,
      email,
      password,
      phone,
      avatar,
    );
    res.status(200).json(newUser);
  };
}

module.exports = new AuthController();
