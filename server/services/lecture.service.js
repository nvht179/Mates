const { ErrorHandler } = require("../helpers/error");
const LectureDB = require("../db/lecture.db")

class LectureService {
  viewAllLecturesInClass = async (classID) => {
    try {
      const allLectures = await LectureDB.viewAllLecturesInClass(classID);
      if (!allLectures) {
        throw new ErrorHandler(403, "There are not any lectures");
      }
      return allLectures;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  createLecture = async (title, attachments, content, classID) => {
    try {
      const lecture = await LectureDB.createLecture(title, attachments, content, classID);
      if (!lecture) {
        throw new ErrorHandler(403, "Can not create lecture");
      }
      return lecture;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new LectureService();