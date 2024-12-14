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

}

module.exports = new AttachmentController();