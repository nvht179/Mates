const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("../db/attachment.db");

class AttachmentService {
  findAttachmentByID = async ({ id }) => {
    const attachment = await AttachmentDB.findAttachmentByID({ id });
    return attachment;
  };

  addAttachment = async ({ link, linkTitle, postId, assignmentId }) => {
    try {
      const newAttachment = await AttachmentDB.addAttachment({
        link,
        linkTitle,
        postId,
        assignmentId,
      });
      return newAttachment;
    } catch (err) {
      throw new Error("Error in AttachmentService: " + err.message);
    }
  };
  /**
   * Remove all attachments associated with a specific postId
   * @param {string} postId - ID of the post whose attachments need to be removed
   */
  removeAttachmentsByPostId = async (postId) => {
    try {
      // Remove attachments from the database by postId
      const deletedAttachments = await AttachmentDB.removeAttachmentsByPostId(postId);

      if (deletedAttachments === 0) {
        throw new Error("No attachments found for the provided postId");
      }

      return deletedAttachments;
    } catch (err) {
      throw new Error("Error in AttachmentService: " + err.message);
    }
  };
  
}

module.exports = new AttachmentService();