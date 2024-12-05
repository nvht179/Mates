const authService = require("../services/auth.service");
const { ErrorHandler } = require("../helpers/error");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { user } = await authService.login(email, password);

  res.status(200).json({ user });
};

module.exports = {
  loginUser,
};
