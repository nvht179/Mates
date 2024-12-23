const GradeDB = require("../db/grade.db");
const AssignmentDB = require("../db/assignment.db");
const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");
const AttachmentDB = require("../db/attachment.db");

class GradeService {
  submitAssignment = async (studentID, assignmentID, attachments) => {
    try {
      const assignment = await AssignmentDB.getAssignmentById(assignmentID);
      const classID = assignment.classID;
      const checkStudent = await UserDB.checkStudentInClass(classID, studentID);
      if (!checkStudent) {
        throw new ErrorHandler(403, "The student is not in that class");
      }
      const submission = await GradeDB.submitAssignment(studentID, assignmentID, attachments);
      if (!submission) {
        throw new ErrorHandler(403, "Can not submit the assignment");
      }
      return submission;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewGradesInThatAssignmentStudent = async (personID) => {
    try {
      const user = await UserDB.getUserByIdDB(personID);
      if (!user) {
        throw new ErrorHandler(403, "The account is not exist");
      }
      const role = user.role;
      let email;
      if (role == "Parent") {
        const childID = await ClassDB.findChildID(id);
        const child = await UserDB.getUserByIdDB(childID);
        email = child.email;
      }
      else {
        email = user.email;
      }

      const student = await UserDB.getUserByEmailDB(email);
      const studentID = student.id;
      const allSubmissions = await GradeDB.findAllSubmissions(studentID);

      const allSubmissionsStudent = [];
      for (const submission of allSubmissions) {
        const assignmentID = submission.assignmentID;
        const assignment = await AssignmentDB.getAssignmentById(assignmentID);

        const assignmentTitle = assignment.title;
        const status = submission.status;
        const submittedOn = submission.submittedOn;
        const comment = submission.comment;
        const weight = assignment.weight;
        const grade = submission.grade100;
        const assignmentWeight = assignment.weight;

        allSubmissionsStudent.push({ assignmentTitle, status, submittedOn, comment, assignmentWeight, grade });
      }
      return allSubmissionsStudent;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewGradeDetailStudent = async (assignmentID, personID) => {
    try {
      const user = await UserDB.getUserByIdDB(personID);
      if (!user) {
        throw new ErrorHandler(403, "The account is not exist");
      }
      const role = user.role;
      let studentID;
      if (role == "Parent") {
        studentID = await ClassDB.findChildID(id);
      }
      else {
        studentID = personID;
      }

      const submissionDetail = await GradeDB.getSubmissionByAssignmentIDAndStudentID(assignmentID, studentID);
      if (!submissionDetail) {
        throw new ErrorHandler(403, "You haven't submitted this assignment");
      }
      const gradeID = submissionDetail.gradeId;
      const attachments = await AttachmentDB.findAttachmentsByGradeId(gradeID);

      return { submissionDetail, attachments };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewGradeAssignmentsTeacher = async (assignmentID) => {
    try {
      const allSubmissions = await GradeDB.findAllSubmissionsAssignment(assignmentID);

      const allSubmissionAssignment = [];
      for (const submission of allSubmissions) {
        const assignmentID = submission.assignmentID;
        const assignment = await AssignmentDB.getAssignmentById(assignmentID);

        const id = submission.studentID;
        const user = await UserDB.getUserByIdDB(id);
        const name = user.name;
        const avatar = user.avatar

        const assignmentTitle = assignment.title;
        const status = submission.status;
        const submittedOn = submission.submittedOn;
        const comment = submission.comment;
        const weight = assignment.weight;
        const grade = submission.grade100;
        const assignmentWeight = assignment.weight;

        allSubmissionAssignment.push({ id, avatar, name, assignmentTitle, status, submittedOn, comment, assignmentWeight, grade });
      }
      return allSubmissionAssignment;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  gradeAssignmentTeacher = async (assignmentID, personID, grade100, comment) => {
    try {
      const submissionDetail = await GradeDB.gradeAssignmentTeacher(assignmentID, personID, grade100, comment);
      return submissionDetail;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeSubmission = async (assignmentID, personID) => {
    try {
      await GradeDB.removeSubmission(assignmentID, personID);
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new GradeService();