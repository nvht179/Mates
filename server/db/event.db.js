const { Event, Event_Person } = require("../entities/event.model");
const { ErrorHandler } = require("../helpers/error");
const sequelize = require("../config/db");


class EventDB {
  createEvent = async (title, description, repeatTime, startTime, endTime, classID, personID) => {
    const event = Event.create({ title, description, repeatTime, startTime, endTime, classID });
    const eventID = event.eventID;
    const event_person = Event_Person.create({ eventID, personID });
    return { event, event_person };
  };

  viewEventByID = async (eventID) => {
    const event = Event.findByPk(eventID);
    return event;
  };
}

module.exports = new EventDB();