const AttachmentService = require("../services/attachment.service");
const supabase = require("../config/supabase")

class AttachmentController {
  /**
   * Add a new attachment
   */
  addAttachment = async (req, res) => {
    try {
      const { assignmentId, postId, lectureId } = req.body;
      
      if (!req.file) {
        return res.status(404).json({ message: "No file uploaded" });
      }

      const file = req.file; 

      const linkTitle = file.originalname

      const filePath = `${Date.now()}_${file.originalname}`;
      const { data, error } = await supabase.storage
        .from("Attachments")
        .upload(filePath, file.buffer);

      if (error) {
        throw new Error("File upload failed: " + error.message);
      }

      const { data: publicData } = supabase.storage
        .from("Attachments")
        .getPublicUrl(filePath);

      const publicURL = publicData.publicUrl;

      const newAttachment = await AttachmentService.addAttachment({
        link: publicURL,
        linkTitle,
        assignmentId,
        postId,
        lectureId
      });

      res.status(200).json({
        message: "Attachment created successfully",
        data: newAttachment,
      });
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  };

  /**
   * Find attachment by ID
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  getAttachmentById = async (req, res) => {
    try {
      const { id } = req.params;

      const attachment = await AttachmentService.findAttachmentByID({ id });

      if (!attachment) {
        return res.status(404).json({ message: "Attachment not found" });
      }

      res.status(200).json({
        message: "Attachment found",
        data: attachment,
      });
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  };

  /**
   * Remove attachments by postId
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  removeAttachmentsByPostId = async (req, res) => {
    try {
      const { postId } = req.params;

      const deletedAttachments = await AttachmentService.removeAttachmentsByPostId(postId);

      if (!deletedAttachments) {
        return res.status(404).json({ message: "No attachments found for this postId" });
      }

      res.status(200).json({
        message: `${deletedAttachments} attachment(s) removed successfully`,
      });
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  };

  async getAttachmentsByPostId(req, res) {
    try {
      const { postId } = req.body;

      if (!postId) {
        return res.status(403).json({
          message: "postId is required.",
        });
      }

      const attachments = await AttachmentService.getAttachmentsByPostId(postId);

      return res.status(200).json({
        message: "Attachments fetched successfully.",
        data: attachments,
      });
    } catch (error) {
      console.error("Error fetching attachments:", error);
      return res.status(500).json({
        message: "Error fetching attachments.",
        details: error.message,
      });
    }
  };

  async editAttachments(req, res) {
    try {
      const { postId, attachments } = req.body;

      if (!postId || !Array.isArray(attachments)) {
        return res.status(400).json({
          message: "postId and attachments (array) are required.",
        });
      }

      const updatedAttachments = await AttachmentService.editAttachmentsByPostId({ postId, attachments });

      return res.status(200).json({
        message: "Attachments updated successfully.",
        data: updatedAttachments,
      });
    } catch (error) {
      console.error("Error editing attachments:", error);
      return res.status(500).json({
        message: "Error editing attachments.",
        details: error.message,
      });
    }
  };
}

module.exports = new AttachmentController();