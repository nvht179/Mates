const { ErrorHandler } = require("../helpers/error");
const UserService = require("../services/user.service");
const supabase = require("../config/supabase")

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
  };

  updateUserInfo = async (req, res) => {
    try {
      const { id, email, name, phone } = req.body;

      const file = req.file;

      if (!file) {
        throw new ErrorHandler(403, "Please pick an image");
      }

      // Create path for Supabase Storage
      const filePath = `${Date.now()}_${file.originalname}`;
      const { data, error } = await supabase.storage
        .from("Attachments")
        .upload(filePath, file.buffer);

      if (error) {
        throw new Error(`File upload failed: ${error.message}`);
      }

      const { data: publicData } = supabase.storage
        .from("Attachments")
        .getPublicUrl(filePath);

      const publicURL = publicData.publicUrl;
      const linkTitle = file.originalname;

      const { updatedUser } = await UserService.updateUserInfo(id, email, name, phone, publicURL, linkTitle);
      const message = "Successful";
      res.status(200).json({ message, updatedUser });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new UserController();
