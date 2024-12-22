const pool = require("../config/db");
const { Attachment } = require("../entities");

class AttachmentDB {
  findAttachmentByID = async ({ id }) => {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) return null;
    return attachment;
  };

  addAttachment = async ({ link, linkTitle, assignmentId, postId, lectureId, gradeID }, options) => {
    try {
      if (options?.transaction) {
        console.log("Transaction passed to addAttachment:", options.transaction.id); // Log transaction
      } else {
        console.warn("No transaction passed to addAttachment");
      }

      const newAttachment = await Attachment.create(
        {
          link,
          linkTitle,
          assignmentId,
          postId,
          lectureId,
          gradeID
        },
        options
      );

      return newAttachment;
    } catch (err) {
      throw new Error("Error adding new attachment: " + err.message);
    }
  };
  // New method to remove attachments by postId
  removeAttachmentsByPostId = async (postId, options) => {
    try {
      if (options?.transaction) {
        console.log("Transaction passed to removeAttachmentsByPostId:", options.transaction.id); // Log transaction
      } else {
        console.warn("No transaction passed to removeAttachmentsByPostId");
      }

      // Find and delete all attachments that match the postId
      const deletedAttachments = await Attachment.destroy({
        where: { postId },
        transaction: options?.transaction, // Use the passed transaction, if any
      });

      // Return the number of deleted attachments
      return deletedAttachments;
    } catch (err) {
      throw new Error("Error removing attachments by postId: " + err.message);
    }
  };
  removeAttachmentsByAssignmentId = async (assignmentId, options) => {
    try {
      if (options?.transaction) {
        console.log("Transaction passed to removeAttachmentsByPostId:", options.transaction.id); // Log transaction
      } else {
        console.warn("No transaction passed to removeAttachmentsByPostId");
      }

      // Find and delete all attachments that match the postId
      const deletedAttachments = await Attachment.destroy({
        where: { assignmentId },
        transaction: options?.transaction, // Use the passed transaction, if any
      });

      // Return the number of deleted attachments
      return deletedAttachments;
    } catch (err) {
      throw new Error("Error removing attachments by postId: " + err.message);
    }
  };
  
  async findAttachmentsByPostId(postId) {
    try {
      const attachments = await Attachment.findAll({
        where: { postId }, // Điều kiện lọc theo postId
      });

      return attachments;
    } catch (error) {
      console.error("Error in AttachmentDB:", error);
      throw new Error(`Error fetching attachments by postId: ${error.message}`);
    }
  };

  findAttachmentsByLectureId = async (lectureId) => {
    try {
      const attachments = await Attachment.findAll({
        where: { lectureId },
      });

      return attachments;
    } catch (error) {
      console.error("Error in AttachmentDB:", error);
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  findAttachmentsByGradeId = async (gradeID) => {
    try {
      const attachments = await Attachment.findAll({
        where: { gradeID },
      });

      return attachments;
    } catch (error) {
      console.error("Error in AttachmentDB:", error);
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeAttachmentsByLectureId = async (lectureId) => {
    const deletedAttachments = await Attachment.destroy({
      where: {
        lectureId: lectureId 
      }
    });
    return deletedAttachments;
  };

  removeAttachmentsByGradeId = async (gradeID) => {
    const deletedAttachments = await Attachment.destroy({
      where: {
        gradeID: gradeID 
      }
    });
    return deletedAttachments;
  };
}

module.exports = new AttachmentDB();