const router = require("express").Router();
const AssignmentController = require('../controllers/assignment.controller');
const upload = require("../middleware/upload.middleware");

// Create a new assignment with attachments
router.post("/create", upload, AssignmentController.addNewAssignment);

// Edit an existing assignment
router.put("/edit/:assignmentId", upload, AssignmentController.editAssignment);

// Remove an assignment
router.delete("/remove/:assignmentId", AssignmentController.removeAssignment);

// Get assignment by ID
router.get("/:assignmentId", AssignmentController.getAssignmentById);


router.get("/class/:classID", AssignmentController.viewAllAssignmentsInClass);

module.exports = router;