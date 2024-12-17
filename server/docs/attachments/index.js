const createAttachment = require("./createAttachment");
const getAttachmentByID = require("./getAttachmentByID");
const getAttachmentByPostID = require("./getAttachmentByPostID");

module.exports = {
  "/attachments/create": {
    ...createAttachment
  },
  "/attachments/{id}":{
    ...getAttachmentByID
  },
};