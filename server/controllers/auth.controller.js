const AuthService = require("../services/auth.service");
const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");

class AuthController {
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token, refreshToken, user } = await AuthService.loginUser(email, password);
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
      const { role, name, email, password, phone, avatar, childEmail } = req.body;
      const { token, refreshToken, newUser, classUser } = await AuthService.signUp(
        role,
        name,
        email,
        password,
        phone,
        avatar,
        childEmail
      );
      res.header("auth-token", token);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      res.status(200).json({ token, newUser, classUser });
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  verifyEmailAndSignup = async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: "Verification token is missing" });
      }

      const message = await AuthService.verifyEmailAndSignup(token);

      res.redirect('http://localhost:5173/');

    } catch (err) {
      console.error(err);
      res.status(err.statusCode).json(err.message);
    }
  };

  checkOTP = async (req, res) => {
    try {
      const { email, OTP } = req.body;
      const result = await AuthService.checkOTP(email, OTP);
      res.status(200).json({email, OTP});
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const { email, newPassword, newPassword2 } = req.body;
      const updatedUser = await AuthService.forgetPassword(email, newPassword, newPassword2);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  };

  forgetPasswordOTPEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserService.checkUserByEmail(email);
      const updatedUser = await AuthService.forgetPasswordOTPEmail(user.id, email);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  }

  refreshToken = async (req, res) => {
    if (!req.cookies.refreshToken) {
      throw new ErrorHandler(401, "Token missing");
    }

    const tokens = await AuthService.generateRefreshToken(
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
