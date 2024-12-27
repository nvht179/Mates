const Grade = require("../entities/grade.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("./attachment.db");
const sequelize = require("../config/db");


class GradeDB {
  updateSubmission = async (studentID, assignmentID, attachments) => {
    try {
      const submissionDetail = await this.getSubmissionByAssignmentIDAndStudentID(assignmentID, studentID);
      if (!submissionDetail) {
        submissionDetail = await Grade.create({
          studentID: studentID,
          assignmentID: assignmentID, 
        })
      }
      const gradeID = submissionDetail.gradeId;

      const status = "Submitted";
      await Grade.update(
        { status }, 
        { where: { studentID, assignmentID } }
      );
  
      await AttachmentDB.removeAttachmentsByGradeId(gradeID);

      if (attachments && attachments.length > 0) {
        for (let attachment of attachments) {
          await AttachmentDB.addAttachment(
            {
              link: attachment.link,
              linkTitle: attachment.linkTitle,
              gradeID: submissionDetail.gradeId, 
            }
          );
        }
      }
  
      return { message: "Submission updated successfully" };
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
    return allSubmissions;
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

  removeGradeByAssignmentID = async (assignmentID) => {
    const grades = await this.findAllSubmissionsAssignment(assignmentID);
    for (const grade of grades) {
      await grade.destroy();
    }
  };
}

module.exports = new GradeDB();