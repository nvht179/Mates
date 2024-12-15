const addStudentToClass = require("./addStudentToClass");
const addTeacherToClass = require("./addTeacherToClass");
const createClass = require("./createClass");
const removeStudentsInClass = require("./removeStudentsInClass");
const removeTeachersInClass = require("./removeTeachersInClass");
const viewAllClasses = require("./viewAllClasses");
const viewAllStudentsInClass = require("./viewAllStudentsInClass");
const viewAllTeachersInClass = require("./viewAllStudentsInClass");

module.exports = {
  "/classes/create-class": {
    ...createClass
  },
  "/classes/add-students-to-class": {
    ...addStudentToClass
  },
  "/classes/add-teachers-to-class": {
    ...addTeacherToClass
  },
  "/classes/view-all-classes": {
    ...viewAllClasses
  },
  "/classes/view-all-students-in-class/{classID}": {
    ...viewAllStudentsInClass
  },
  "/classes/view-all-teachers-in-class/{classID}": {
    ...viewAllTeachersInClass
  },
  "/classes/remove-students-in-class/{classID}/{studentsEmail}": {
    ...removeStudentsInClass
  },
  "/classes/remove-teachers-in-class/{classID}/{teachersEmail}": {
    ...removeTeachersInClass
  },
};