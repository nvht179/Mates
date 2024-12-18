const { ErrorHandler } = require("../helpers/error");
const EventDB = require("../db/event.db");
const { Event_Person } = require("../entities");

class EventService {
  createEvent = async (title, description, repeatTime, startTime, endTime, classID, personID) => {
    try {
      const { event, event_person } = await EventDB.createEvent(title, description, repeatTime, startTime, endTime, classID, personID);

      if (!event || !event_person) {
        throw new ErrorHandler(403, "Can not create event");
      }
      return { event, event_person };
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  viewEventByUserID = async (userID) => {
    try {
      const eventsUser = await EventDB.getAllEventByUserID(userID);
      const events = [];
      for (const eventUser of eventsUser) {
        const eventID = eventUser.eventID;
        const event = await EventDB.viewEventByID(eventID);
        if (!event) {
          throw new ErrorHandler(403, "No Event");
        }
        events.push(event);
      }
      return events;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new EventService();