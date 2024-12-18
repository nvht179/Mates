const { Event, Event_Person } = require("../entities/event.model");
const { ErrorHandler } = require("../helpers/error");
const sequelize = require("../config/db");


class EventDB {
  createEvent = async (title, description, repeatTime, startTime, endTime, classID, personID) => {
    const event = await Event.create({ title, description, repeatTime, startTime, endTime, classID });
    const eventID = event.eventID;
    const event_person = await Event_Person.create({ eventID, personID });
    return { event, event_person };
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
}

module.exports = new EventDB();