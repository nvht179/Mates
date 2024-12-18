const express = require("express");
const EventController = require("../controllers/event.controller");

const router = express.Router();

router.post('/create', EventController.createEvent);
router.get('/view-event-by-userID/:userID', EventController.viewEventByUserID);
router.put('/update-event', EventController.updateEvent);
router.delete('/delete-event/:eventID', EventController.removeEvent);

module.exports = router;