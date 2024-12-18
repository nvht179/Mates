const createAssignment = require("./createAssignment");
const editAssignment = require("./editAssignment");
const fetchAssignmentInClass = require("./fetchAssignmentInClass");
const removeAssignment = require("./removeAssignment");

module.exports = {
  "/assignments/create": {
    ...createAssignment
  },
  "/assignments/edit/{assignmentId}":{
    ...editAssignment
  },
  "/assignments/remove/{assignmentId}":{
    ...removeAssignment
  },
  "/assignments/class/{classID}":{
    ...fetchAssignmentInClass
  }
};