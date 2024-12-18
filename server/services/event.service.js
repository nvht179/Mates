const { ErrorHandler } = require("../helpers/error");
const EventDB = require("../db/event.db");

class EventService {
  createEvent = async (title, description, repeatTime, startTime, endTime, classID) => {
    try {
      const { event, event_person } = EventDB.createEvent(title, description, repeatTime, startTime, endTime, classID);
      if (!event || !event_person) {
        throw new ErrorHandler(403, "Can not create event");
      }
      return { event, event_person };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  
}

module.exports = new EventService();