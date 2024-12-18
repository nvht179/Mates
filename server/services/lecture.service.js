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

  getLectureByID = async (lectureId) => {
    try {
      const currentLecture = await LectureDB.getLectureByID(lectureId);
      if (!currentLecture) {
        throw new ErrorHandler(403, "There are not any lectures");
      }
      return currentLecture;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  editLecture = async (currentLecture, title, content, classID, attachments) => {
    try {
      const lectureId = currentLecture.id;
      const updatedLecture = await LectureDB.updatedLecture(lectureId, title, content, classID);

      if (attachments && attachments.length > 0) {
        // First, remove existing attachments for the lecture
        await AttachmentDB.removeAttachmentsByLectureId(lectureId);

        // Then, add the new attachments
        for (let attachment of attachments) {
          await AttachmentDB.addAttachment(
            {
              link: attachment.link,
              linkTitle: attachment.linkTitle,
              assignmentId: attachment.assignmentId,
              lectureId: lectureId,
            }
          );
        }
      }

      console.log("LectureService:", updatedLecture);
      return updatedLecture;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new LectureService();