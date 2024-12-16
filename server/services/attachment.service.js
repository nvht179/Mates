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
  
  async getAttachmentsByPostId(postId) {
    try {
      const attachments = await AttachmentDB.findAttachmentsByPostId(postId);

      // Nếu không tìm thấy, trả về mảng rỗng
      if (!attachments) {
        return [];
      }

      return attachments;
    } catch (error) {
      console.error("Error in AttachmentService:", error);
      throw new Error(`Error retrieving attachments: ${error.message}`);
    }
  }

  async editAttachmentsByPostId({ postId, attachments }) {
    try {
      // Xóa tất cả attachment cũ theo postId
      await AttachmentDB.removeAttachmentsByPostId(postId);

      // Thêm từng attachment mới vào
      const newAttachments = [];
      for (const attachment of attachments) {
        const { link, linkTitle } = attachment;
        const newAttachment = await AttachmentDB.addAttachment({ link, linkTitle, postId });
        newAttachments.push(newAttachment);
      }

      return newAttachments;
    } catch (error) {
      console.error("Error in AttachmentService:", error);
      throw new Error(`Error editing attachments: ${error.message}`);
    }
  };
}

module.exports = new AttachmentService();