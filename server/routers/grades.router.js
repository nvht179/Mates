const express = require("express");
const GradeController = require("../controllers/grade.controller");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post('/submit-assignment', upload, GradeController.submitAssignment);
router.get('/view-submission-student/:personID', GradeController.viewGradesInThatAssignmentStudent);
router.get('/view-grade-details/:personID/:assignmentID', GradeController.viewGradeDetailStudent);
router.get('/view-grade-assignments-teacher/:assignmentID', GradeController.viewGradeAssignmentsTeacher);
router.put('/grade-assignment-teacher', GradeController.gradeAssignmentTeacher);
// router.delete('/delete-event/:eventID', EventController.removeEvent);

module.exports = router;