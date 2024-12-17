const createAttachment = require("./createAttachment");
const getAttachmentByID = require("./getAttachmentByID");

module.exports = {
  "/attachments/create": {
    ...createAttachment
  },
  "/attachments/{id}":{
    ...getAttachmentByID
  },
};