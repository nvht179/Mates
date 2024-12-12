const AuthService = require("../services/auth.service");
const { ErrorHandler } = require("../helpers/error");

class AuthController {
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const {token, refreshToken, user} = await AuthService.loginUser(email, password);
      res.header("auth-token", token);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      res.status(200).json({
        token,
        user,
      }); 
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
      const updatedUser = await AuthService.forgetPassword(email, newPassword, newPassword2);
      res.status(200).json(updatedUser);
    }
    catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  refreshToken = async (req, res) => {
    if (!req.cookies.refreshToken) {
      throw new ErrorHandler(401, "Token missing");
    }
    const tokens = await authService.generateRefreshToken(
      req.cookies.refreshToken
    );
    res.header("auth-token", tokens.token);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
    });
    res.json(tokens);
  };
}

module.exports = new AuthController();
