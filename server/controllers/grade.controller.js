const GradeService = require("../services/grade.service");
const supabase = require("../config/supabase");

class GradeController {
  submitAssignment = async (req, res) => {
    try {
      const { studentID, assignmentID } = req.body;

      const attachments = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          // Create path for Supabase Storage
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
            linkTitle: file.originalname,
          });
        }
      }

      const submission = await GradeService.submitAssignment(studentID, assignmentID, attachments);
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewGradesInThatAssignmentStudent = async (req, res) => {
    try {
      const { assignmentID, personID } = req.params;
      const submission = await GradeService.viewGradesInThatAssignmentStudent(assignmentID, personID);
      const message = "Successful";
      res.status(200).json({ message, submission });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new GradeController();