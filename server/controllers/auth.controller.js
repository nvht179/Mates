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
      const message = "Successful";
      res.status(200).json({ message, token, user, });
    }
    catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
      });
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
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
      const message = "Successful";
      res.status(200).json({ message, token, newUser, classUser });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  resendVerificationLink = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await AuthService.resendVerificationLink(email);
      const message = "Successful";
      res.status(200).json({ message, user });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  }

  verifyEmailAndSignup = async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: "Verification token is missing" });
      }

      const message = await AuthService.verifyEmailAndSignup(token);

      res.redirect('http://localhost:5173/');

    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  checkOTP = async (req, res) => {
    try {
      const { email, OTP } = req.body;
      const result = await AuthService.checkOTP(email, OTP);
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const { email, newPassword, newPassword2 } = req.body;
      const { updatedUser } = await AuthService.forgetPassword(email, newPassword, newPassword2);
      const message = "Successful";
      res.status(200).json({ message, updatedUser });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  forgetPasswordOTPEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const { user } = await UserService.checkUserByEmail(email);
      const { updatedUser } = await AuthService.forgetPasswordOTPEmail(user.id, email);
      console.log("AuthController", updatedUser)
      const message = "Successful";
      res.status(200).json({ message, updatedUser });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  refreshToken = async (req, res) => {
    try {
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
      console.log("auth-service: ", tokens)
      res.json(tokens);
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new AuthController();