const createLectures = require("./createLectures");
const viewAllLecturesInClass = require("./viewAllLectures");

module.exports = {
  "/lectures/create": {
    ...createLectures
  },
  "/lectures/view-all-lectures-in-class/{classID}": {
    ...viewAllLecturesInClass
  }
};