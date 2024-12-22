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

  createEventForClass = async (title, description, repeatTime, startTime, endTime, classID) => {
    const event = await Event.create({ title, description, repeatTime, startTime, endTime, classID });
    return event;
  };

  addPersonToEvent = async (eventID, personID) => {
    try {
      const existingRecord = await Event_Person.findOne({
        where: { eventID, personID },
      });

      if (existingRecord) {
        return;
      }
      const event_person = await Event_Person.create({ eventID, personID });
      return event_person;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };

  getEventByID = async (eventID) => {
    const event = await Event.findByPk(eventID);
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

  updateEvent = async (eventID, title, description, repeatTime, startTime, endTime) => {
    const updatedEvent = await this.getEventByID(eventID);
    updatedEvent.title = title;
    updatedEvent.description = description;
    updatedEvent.repeatTime = repeatTime;
    updatedEvent.startTime = startTime;
    updatedEvent.endTime = endTime;
    updatedEvent.save();
    return updatedEvent;
  };

  getPersonEventByID = async (eventID) => {
    const event_persons = await Event_Person.findAll({
      where: {
        eventID: eventID
      }
    });
    return event_persons;
  }

  removeEvent = async (eventID) => {
    const removedEvent = await this.getEventByID(eventID);
    const event_persons = await this.getPersonEventByID(eventID);
    for (const event_person of event_persons) {
      await event_person.destroy();
    }
    await removedEvent.destroy();
  };

  removeEventByClassID = async (classID) => {
    const events = await this.getAllEventByClassID(classID);
    for (const event of events) {
      const eventID = event.eventID;
      await this.removeEvent(eventID);
    }
  };

  removePersonEvent = async (eventID, personID) => {
    const removedEvents = await Event_Person.findAll({
      where: {
        eventID: eventID,
        personID: personID
      }
    });
    for (const removedEvent of removedEvents) {
      await removedEvent.destroy();
    }
  };
}

module.exports = new EventDB();