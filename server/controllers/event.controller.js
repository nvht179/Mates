const EventService = require("../services/event.service")

class EventController {
  createEvent = async (req, res) => {
    try {
      const { title, description, repeatTime, startTime, endTime, classID, personID } = req.body;

      // Validate and parse dates
      const parsedStartTime = new Date(startTime);
      const parsedEndTime = new Date(endTime);

      if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
        throw new Error("Invalid date format. Please use ISO 8601 format (e.g., '2024-12-25T10:00:00Z').");
      }

      const { event, event_person } = await EventService.createEvent(title, description, repeatTime, parsedStartTime, parsedEndTime, classID, personID);
      const message = "Successful";
      res.status(200).json({ message, event, event_person });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  viewEventByUserID = async (req, res) => {
    try {
      const { userID } = req.params;

      console.log("EventController:", userID);
      const events = await EventService.viewEventByUserID(userID);
      const message = "Successful";
      res.status(200).json({ message, events });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  updateEvent = async (req, res) => {
    try {
      const { eventID, title, description, repeatTime, startTime, endTime } = req.body;

      const parsedStartTime = new Date(startTime);
      const parsedEndTime = new Date(endTime);

      if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
        throw new Error("Invalid date format. Please use ISO 8601 format (e.g., '2024-12-25T10:00:00Z').");
      }

      const updatedEvent = await EventService.updateEvent(eventID, title, description, repeatTime, parsedStartTime, parsedEndTime);
      const message = "Successful";
      res.status(200).json({ message, updatedEvent });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };

  removeEvent = async (req, res) => {
    try {
      const { eventID } = req.params;
      await EventService.removeEvent(eventID);
      const message = "Successful";
      res.status(200).json({ message });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new EventController();