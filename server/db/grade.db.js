const Grade = require("../entities/grade.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("./attachment.db");
const sequelize = require("../config/db");


class GradeDB {
  submitAssignment = async (studentID, assignmentID, attachments) => {
    try {
      const submissionDetail = await this.getSubmissionByAssignmentIDAndStudentID(assignmentID, studentID);
      if (submissionDetail) {
        throw new ErrorHandler(403, "You have already submitted this assignment");
      }
      const status = "Submitted";
      const submission = await Grade.create({
        studentID, assignmentID, status
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
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  findAllSubmissions = async (studentID) => {
    const allSubmissions = await Grade.findAll({
      where: {
        studentID: studentID
      }
    });
    return allSubmissions;
  };

  findAllSubmissionsAssignment = async (assignmentID) => {
    const allSubmissions = await Grade.findAll({
      where: { assignmentID }
    });
    return allSubmissions;
  };

  getAllSubmissionsAssignment = async (assignmentID) => {
    const allSubmissions = await Grade.findAll({
      where: { assignmentID }
    });
    return allSubmissions[0];
  };

  getSubmissionByAssignmentIDAndStudentID = async (assignmentID, studentID) => {
    const submissionDetail = await Grade.findAll({
      where: { assignmentID, studentID }
    });
    return submissionDetail[0];
  };

  gradeAssignmentTeacher = async (assignmentID, personID, grade100, comment) => {
    const studentID = personID;
    const submissionDetail = await this.getSubmissionByAssignmentIDAndStudentID(assignmentID, studentID);
    submissionDetail.grade100 = grade100;
    submissionDetail.comment = comment;
    submissionDetail.save();
    return submissionDetail;
  };

  removeSubmission = async (assignmentID, personID) => {
    try {
      const studentID = personID;
      const submissionDetail = await this.getSubmissionByAssignmentIDAndStudentID(assignmentID, studentID);
      const grade100 = submissionDetail.grade100;
      if (grade100 != null) {
        throw new ErrorHandler(403, "You can not delete the submission because your teacher has been graded");
      }
      const gradeID = submissionDetail.gradeId;
      await AttachmentDB.removeAttachmentsByGradeId(gradeID);
      await submissionDetail.destroy();
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new GradeDB();