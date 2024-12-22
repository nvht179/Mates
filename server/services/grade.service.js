const GradeDB = require("../db/grade.db");
const AssignmentDB = require("../db/assignment.db");
const { ErrorHandler } = require("../helpers/error");
const UserDB = require("../db/user.db");

class GradeService {
  submitAssignment = async (studentID, assignmentID, attachments) => {
    try {
      const submission = await GradeDB.submitAssignment(studentID, assignmentID, attachments);
      if (!submission) {
        throw new ErrorHandler(403, "Can not submit the assignment");
      }
      return submission;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewGradesInThatAssignmentStudent = async (assignmentID, personID) => {
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
      

    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new GradeService();