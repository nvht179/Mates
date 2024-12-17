const Lecture = require("../entities/lecture.model");
const { Class, TeacherClass, StudentClass } = require("../entities/class.model");
const AttachmentDB = require("./attachment.db");

class LectureDB {
  viewAllLecturesInClass = async (classID) => {
    const lectureInfo = await Lecture.findAll({
      where: {
        classID: classID
      }
    });
    return lectureInfo;
  };

  createLecture = async (title, content, classID, attachments) => {
    const lecture = await Lecture.create({
      title, content, classID
    });
    const lectureId = lecture.id;

    if (attachments && attachments.length > 0) {
      for (let attachment of attachments) {
        await AttachmentDB.addAttachment(
          {
            link: attachment.link,
            linkTitle: attachment.linkTitle,
            lectureId: lectureId,
          }
        );
      }
    }

    return lecture;
  };
}

module.exports = new LectureDB();