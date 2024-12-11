const pool = require("../config/db");
const { Attachment } = require("../entities");

class AttachmentDB {
  findAttachmentByID = async ({id}) => {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) return null
    return attachment;
  }
}

module.exports = new AttachmentDB();

