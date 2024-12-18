const Lecture = require("../entities/lecture.model");
const { Class, TeacherClass, StudentClass } = require("../entities/class.model");
const AttachmentDB = require("./attachment.db");
const { getLectureByID } = require("../services/lecture.service");

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

  removeLecture = async (lectureId) => {
    const lecture = await Lecture.findByPk(lectureId);
    await AttachmentDB.removeAttachmentsByLectureId(lectureId);
  };

  getLectureByID = async (lectureId) => {
    const lecture = await Lecture.findByPk(lectureId);
    return lecture;
  };

  updatedLecture = async (lectureId, title, content, classID) => {
    const updatedLecture = await this.getLectureByID(lectureId);
    updatedLecture.title = title;
    updatedLecture.content = content;
    updatedLecture.save();
    return updatedLecture;
  };
}

module.exports = new LectureDB();