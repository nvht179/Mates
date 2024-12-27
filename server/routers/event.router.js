const express = require("express");
const EventController = require("../controllers/event.controller");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.middleware");

// router.use(verifyToken);

router.post('/create', EventController.createEvent);
router.get('/view-event-by-userID/:userID', EventController.viewEventByUserID);
router.put('/update-event', EventController.updateEvent);
router.delete('/delete-event/:eventID', EventController.removeEvent);

module.exports = router;