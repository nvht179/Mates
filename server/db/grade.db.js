const Grade = require("../entities/grade.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("./attachment.db");
const sequelize = require("../config/db");


class GradeDB {
  submitAssignment = async (studentID, assignmentID, attachments) => {
    const submission = await Grade.create({
      studentID, assignmentID
    });
    const gradeID = submission.gradeId;

    if (attachments && attachments.length > 0) {
      for (let attachment of attachments) {
        await AttachmentDB.addAttachment(
          {
            link: attachment.link,
            linkTitle: attachment.linkTitle,
            gradeID: gradeID,
          }
        );
      }
    }

    return submission;
  };
}

module.exports = new GradeDB();