const { Event, Event_Person } = require("../entities/event.model");
const { ErrorHandler } = require("../helpers/error");
const sequelize = require("../config/db");


class EventDB {
  createEvent = async (title, description, repeatTime, startTime, endTime, classID, personID) => {
    console.log("EventDB:", title, description, repeatTime, startTime, endTime, classID, personID)
    const event = await Event.create({ title, description, repeatTime, startTime, endTime, classID });
    const eventID = event.eventID;
    const event_person = await Event_Person.create({ eventID, personID });
    return { event, event_person };
  };

  addPersonToEvent = async (eventID, personID) => {
    const event_person = await Event_Person.create({ eventID, personID });
    return event_person;
  };

  getEventByID = async (eventID) => {
    const event = Event.findByPk(eventID);
    return event;
  };

  viewEventByID = async (eventID) => {
    const event = await Event.findByPk(eventID);
    return event;
  };

  getAllEventByUserID = async (userID) => {
    const personID = userID;
    const eventsUser = await Event_Person.findAll({
      where: {
        personID: personID
      }
    });
    return eventsUser;
  };

  getAllEventByClassID = async (classID) => {
    const events = await Event.findAll({
      where: {
        classID: classID
      }
    });
    return events;
  };
}

module.exports = new EventDB();