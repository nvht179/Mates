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
  
}

module.exports = new AttachmentService();