const submitAssignment = require("./submitAssignment");
const viewSubmissionStudent = require("./viewSubmissionStudent");
const viewGradeDetails = require("./viewGradeDetails");
const viewGradeAssignmentsTeacher = require("./viewGradeAssignmentsTeacher");
const gradeAssignmentTeacher = require("./gradeAssignmentTeacher");

module.exports = {
  "/grades/submit-assignment": {
    ...submitAssignment
  },
  "/grades/view-submission-student/{personID}": {
    ...viewSubmissionStudent
  },
  "/grades/view-grade-details/{personID}/{assignmentID}": {
    ...viewGradeDetails
  },
  "/grades/view-grade-assignments-teacher/{assignmentID}": {
    ...viewGradeAssignmentsTeacher
  },
  "/grades/grade-assignment-teacher": {
    ...gradeAssignmentTeacher
  },
};