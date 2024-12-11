const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");
const AttachmentService = require('./attachment.service');
const assignmentDB = require("../db/assignment.db");

class AssignmentService {
    addNewAssignment = async ({
        title,
        startTime,
        endTime,
        attachmentIDs,
        description,
    }) => {
    try {
        const attachments = [];
        for (const attachmentID in attachmentIDs){
            const attachment = await AttachmentService.checkAttachmentByID({attachmentID});
            if (!attachment){
                throw new ErrorHandler(403, "not exist attachment");
            }
            attachments.append(attachment);
        }

        const assignment = await assignmentDB.addNewAssignment({
            title,
            startTime,
            endTime,
            attachments,
            description,
        });
      if (!assignment) {
        throw new ErrorHandler(403, "Not exist assignment");
      }
      return assignment;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new AssignmentService();
