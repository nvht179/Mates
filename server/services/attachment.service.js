const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("../db/attachment.db");

class AttachmentService {
    findAttachmentByID = async ({id}) => {
        const attachment = await AttachmentDB.findAttachmentByID({id});
        return attachment;
    }
}

module.exports = new AttachmentService();
