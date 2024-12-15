const AttachmentService = require("../services/attachment.service");

class AttachmentController {
  /**
   * Add a new attachment
   */
  addAttachment = async (req, res) => {
    try {
      const { link, linkTitle, assignmentId, postId } = req.body;

      // Gọi service để thêm attachment mới
      const newAttachment = await AttachmentService.addAttachment({
        link,
        linkTitle,
        assignmentId,
        postId,
      });

      res.status(201).json({
        message: "Attachment created successfully",
        data: newAttachment,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
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

      // Gọi service để tìm attachment theo ID
      const attachment = await AttachmentService.findAttachmentByID({ id });

      if (!attachment) {
        return res.status(404).json({ message: "Attachment not found" });
      }

      res.status(200).json({
        message: "Attachment found",
        data: attachment,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
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

      // Gọi service để xóa tất cả các attachment theo postId
      const deletedAttachments = await AttachmentService.removeAttachmentsByPostId(postId);

      if (!deletedAttachments) {
        return res.status(404).json({ message: "No attachments found for this postId" });
      }

      res.status(200).json({
        message: `${deletedAttachments} attachment(s) removed successfully`,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  async getAttachmentsByPostId(req, res) {
    try {
      const { postId } = req.body;

      // Kiểm tra nếu không có postId
      if (!postId) {
        return res.status(400).json({
          message: "postId is required.",
        });
      }

      // Gọi service để lấy attachments
      const attachments = await AttachmentService.getAttachmentsByPostId(postId);

      // Trả về dữ liệu
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

      // Kiểm tra đầu vào
      if (!postId || !Array.isArray(attachments)) {
        return res.status(400).json({
          message: "postId and attachments (array) are required.",
        });
      }

      // Gọi service để chỉnh sửa
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