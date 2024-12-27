const express = require("express");
const GradeController = require("../controllers/grade.controller");
const upload = require("../middleware/upload.middleware");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.middleware");

// router.use(verifyToken);
router.post('/submit-assignment', upload, GradeController.submitAssignment);
router.get('/view-submission-student/:personID/:classID', GradeController.viewGradesInThatAssignmentStudent);
router.get('/view-grade-details/:personID/:assignmentID', GradeController.viewGradeDetailStudent);
router.get('/view-grade-assignments-teacher/:assignmentID', GradeController.viewGradeAssignmentsTeacher);
router.get('/view-all-grades-in-class/:classID', GradeController.viewAllGradesInClass);
router.put('/grade-assignment-teacher', GradeController.gradeAssignmentTeacher);
router.delete('/delete-submission/:personID/:assignmentID', GradeController.removeSubmission);

module.exports = router;