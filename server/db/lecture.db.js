const Lecture = require("../entities/lecture.model");
const { Class, TeacherClass, StudentClass } = require("../entities/class.model");
const { Attachment } = require("../entities");
const AttachmentDB = require("../db/attachment.db");

class LectureDB {
  viewAllLecturesInClass = async (classID) => {
    const lectureInfo = await Lecture.findAll({
      where: {
        classID: classID
      }
    });
    return lectureInfo;
  };

  createLecture = async (title, attachment, content, classID) => {
    const attachmentID = 1;
    const lecture = await Lecture.create({
      title, content, classID 
    });
    return lecture;
  };
}

module.exports = new LectureDB();