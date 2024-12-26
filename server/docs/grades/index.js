const submitAssignment = require("./submitAssignment");
const viewSubmissionStudent = require("./viewSubmissionStudent");
const viewGradeDetails = require("./viewGradeDetails");
const viewGradeAssignmentsTeacher = require("./viewGradeAssignmentsTeacher");
const gradeAssignmentTeacher = require("./gradeAssignmentTeacher");
const deleteSubmission = require("./deleteSubmission");
const viewAllGradesInClass = require("./viewAllGradesInClass");

module.exports = {
  "/grades/submit-assignment": {
    ...submitAssignment
  },
  "/grades/view-submission-student/{personID}/{classID}": {
    ...viewSubmissionStudent
  },
  "/grades/view-grade-details/{personID}/{assignmentID}": {
    ...viewGradeDetails
  },
  "/grades/view-grade-assignments-teacher/{assignmentID}": {
    ...viewGradeAssignmentsTeacher
  },
  "/grades/view-all-grades-in-class/{classID}": {
    ...viewAllGradesInClass
  },
  "/grades/grade-assignment-teacher": {
    ...gradeAssignmentTeacher
  },
  "/grades/delete-submission/{personID}/{assignmentID}": {
    ...deleteSubmission
  },
};