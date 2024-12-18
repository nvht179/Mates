const EventService = require("../services/event.service")

class EventController {
  createEvent = async (req, res) => {
    try {
      const { title, description, repeatTime, startTime, endTime, classID } = req.body;
      const { event, event_person } = await EventService.createEvent(title, description, repeatTime, startTime, endTime, classID);
      const message = "Successful";
      res.status(200).json({ message, event, event_person });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  };
}

module.exports = new EventController();