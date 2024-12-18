const createLectures = require("./createLectures");
const viewAllLecturesInClass = require("./viewAllLectures");
const removeLecture = require("./removeLecture");
const editLecture = require("./editLecture");

module.exports = {
  "/lectures/create": {
    ...createLectures
  },
  "/lectures/view-all-lectures-in-class/{classID}": {
    ...viewAllLecturesInClass
  },
  "/lectures/edit": {
    ...editLecture
  },
  "/lectures/remove-lecture/{lectureId}": {
    ...removeLecture
  }
};