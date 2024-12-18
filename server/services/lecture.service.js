const { ErrorHandler } = require("../helpers/error");
const LectureDB = require("../db/lecture.db")
const AttachmentDB = require("../db/attachment.db");
const { P } = require("pino");

class LectureService {
  viewAllLecturesInClass = async (classID) => {
    try {
      const allLectures = await LectureDB.viewAllLecturesInClass(classID);

      if (!allLectures) {
        throw new ErrorHandler(403, "There are not any lectures");
      }

      const allLecturesAttachments = [];
      for (const lecture of allLectures) {
        const lectureId = lecture.id;
        const lectureAttachment = await AttachmentDB.findAttachmentsByLectureId(lectureId);
        // Only add attachments if they exist and are not empty
        if (lectureAttachment && lectureAttachment.length > 0) {
          allLecturesAttachments.push(lectureAttachment);
        }
      }

      return allLecturesAttachments;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  createLecture = async (title, content, classID, attachments) => {
    try {
      const lecture = await LectureDB.createLecture(title, content, classID, attachments);
      if (!lecture) {
        throw new ErrorHandler(403, "Can not create lecture");
      }
      return lecture;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  removeLecture = async (lectureId) => {
    try {
      const result = await LectureDB.removeLecture(lectureId);
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new LectureService();