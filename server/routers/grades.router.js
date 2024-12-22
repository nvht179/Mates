const express = require("express");
const GradeController = require("../controllers/grade.controller");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post('/submit-assignment', upload, GradeController.submitAssignment);
// router.get('/view-event-by-userID/:userID', EventController.viewEventByUserID);
// router.put('/update-event', EventController.updateEvent);
// router.delete('/delete-event/:eventID', EventController.removeEvent);

module.exports = router;