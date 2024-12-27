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
      res.status(200).json({ message  });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewGradesInThatAssignmentStudent = async (req, res) => {
    try {
      const { personID, classID } = req.params;
      const allSubmissionsStudent = await GradeService.viewGradesInThatAssignmentStudent(personID, classID);
      const message = "Successful";
      res.status(200).json({ message, allSubmissionsStudent });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewGradeDetailStudent = async (req, res) => {
    try {
      const { assignmentID, personID } = req.params;
      const { submissionDetail, attachments } = await GradeService.viewGradeDetailStudent(assignmentID, personID);
      const message = "Successful";
      res.status(200).json({ message, submissionDetail, attachments });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewGradeAssignmentsTeacher = async (req, res) => {
    try {
      const { assignmentID } = req.params;
      const allSubmissionAssignment = await GradeService.viewGradeAssignmentsTeacher(assignmentID);
      const message = "Successful";
      res.status(200).json({ message, allSubmissionAssignment });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  gradeAssignmentTeacher = async (req, res) => {
    try {
      const { assignmentID, personID, grade100, comment } = req.body;
      const submissionDetail = await GradeService.gradeAssignmentTeacher(assignmentID, personID, grade100, comment);
      const message = "Successful";
      res.status(200).json({ message, submissionDetail });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  removeSubmission = async (req, res) => {
    try {
      const { assignmentID, personID } = req.params;
      await GradeService.removeSubmission(assignmentID, personID);
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewAllGradesInClass = async (req, res) => {
    try {
      const { classID } = req.params;
      const allSubmissionInClass = await GradeService.viewAllGradesInClass(classID);
      const message = "Successful";
      res.status(200).json({ message, allSubmissionInClass });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new GradeController();