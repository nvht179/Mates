const { ErrorHandler } = require("../helpers/error");
const LectureService = require("../services/lecture.service")
const supabase = require("../config/supabase");

class LectureController {
  viewAllLecturesInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const allLecturesAttachments = await LectureService.viewAllLecturesInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, allLecturesAttachments });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  createLectureWithAttachments = async (req, res) => {
    try {
      const { title, content, classID } = req.body;

      const attachments = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          // Tạo đường dẫn file trên Supabase Storage
          const filePath = `${Date.now()}_${file.originalname}`;
          const { data, error } = await supabase.storage
            .from("Attachments")
            .upload(filePath, file.buffer);

          if (error) {
            throw new Error(`File upload failed: ${error.message}`);
          }

          const { data: publicData } = supabase.storage
            .from("Attachments")
            .getPublicUrl(filePath);

          const publicURL = publicData.publicUrl;

          attachments.push({
            link: publicURL,
            linkTitle: file.originalname, // Tên file làm linkTitle
          });
        }
      }

      const lecture = await LectureService.createLecture(title, content, classID, attachments);
      const message = "Successful";
      res.status(200).json({ message, lecture });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  removeLecture = async (lectureId) => {
    try {
      const { lectureId } = req.params;
      await LectureService.removeLecture(lectureId);
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new LectureController();