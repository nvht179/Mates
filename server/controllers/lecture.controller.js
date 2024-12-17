const { ErrorHandler } = require("../helpers/error");
const LectureService = require("../services/lecture.service")

class LectureController {
  viewAllLecturesInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const allLectures = await LectureService.viewAllLecturesInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, allLectures });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  createLecture = async (req, res) => {
    try {
      const { title, attachments, content, classID } = req.body;
      const lecture = await LectureService.createLecture(title, attachments, content, classID);
      const message = "Successful";
      res.status(200).json({ message, lecture });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new LectureController();