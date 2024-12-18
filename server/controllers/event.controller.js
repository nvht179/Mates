const EventService = require("../services/event.service")

class EventController {
  createEvent = async (req, res) => {
    try {
      const { title, description, repeatTime, startTime, endTime, classID, personID } = req.body;

      // Validate and parse dates
      const parsedRepeatTime = new Date(repeatTime);
      const parsedStartTime = new Date(startTime);
      const parsedEndTime = new Date(endTime);

      if (isNaN(parsedRepeatTime) || isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
        throw new Error("Invalid date format. Please use ISO 8601 format (e.g., '2024-12-25T10:00:00Z').");
      }

      console.log("EventController:", title, description, parsedRepeatTime, parsedStartTime, parsedEndTime, classID, personID)

      const { event, event_person } = await EventService.createEvent(title, description, parsedRepeatTime, parsedStartTime, parsedEndTime, classID, personID);
      const message = "Successful";
      res.status(200).json({ message, event, event_person });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewEventByUserID = async (req, res) => {
    try {
      const { userID } = req.body;
      const events = await EventService.viewEventByUserID(userID);
      const message = "Successful";
      res.status(200).json({ message, events });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new EventController();