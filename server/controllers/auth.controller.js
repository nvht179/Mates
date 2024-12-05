const AuthService = require("../services/auth.service");
const { ErrorHandler } = require("../helpers/error");

class AuthController {
  loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("AuthController:", email, password);
    const user = AuthService.loginUser(email, password);
    res.status(200).json(user);
  };
}

module.exports = new AuthController();
