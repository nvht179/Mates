const pool = require("../config/db");
const { Attachment } = require("../entities");

class AttachmentDB {
  findAttachmentByID = async ({ id }) => {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) return null;
    return attachment;
  };

  addAttachment = async ({ link, linkTitle, assignmentId, postId }, options) => {
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
  
  
}

module.exports = new AttachmentDB();