const router = require("express").Router();
const AssignmentController = require('../controllers/assignment.controller')

router.post("/create", AssignmentController.addNewAssignment);

module.exports = router;
