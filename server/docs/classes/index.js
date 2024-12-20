const editClassInfo = require("./editClassInfo");
const addStudentToClass = require("./addStudentToClass");
const addTeacherToClass = require("./addTeacherToClass");
const createClass = require("./createClass");
const removeStudentsInClass = require("./removeStudentsInClass");
const removeTeachersInClass = require("./removeTeachersInClass");
const viewAllClasses = require("./viewAllClasses");
const viewAllStudentsInClass = require("./viewAllStudentsInClass");
const viewAllTeachersInClass = require("./viewAllStudentsInClass");
const viewClassInfo = require("./viewClassInfo");
const removeClass = require("./removeClass");

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
  "/classes/view-class-info/{classID}": {
    ...viewClassInfo
  },
  "/classes/view-all-classes/{email}": {
    ...viewAllClasses
  },
  "/classes/view-all-students-in-class/{classID}": {
    ...viewAllStudentsInClass
  },
  "/classes/view-all-teachers-in-class/{classID}": {
    ...viewAllTeachersInClass
  },
  "/classes/edit-class-info": {
    ...editClassInfo
  },
  "/classes/remove-students-in-class": {
    ...removeStudentsInClass
  },
  "/classes/remove-teachers-in-class": {
    ...removeTeachersInClass
  },
  "/classes/remove-class/{classID}": {
    ...removeClass
  },
};