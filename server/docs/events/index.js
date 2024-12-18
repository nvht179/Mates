const createEvent = require("./createEvent");
const viewEventByUserID = require("./viewEventByUserID");
const removeEvent = require("./removeEvent");
const updatedEvent = require("./updatedEvent");

module.exports = {
  "/events/create": {
    ...createEvent
  },
  "/events/view-event-by-userID/{userID}": {
    ...viewEventByUserID
  },
  "/events/update-event": {
    ...updatedEvent
  },
  "/events/delete-event/{eventID}": {
    ...removeEvent
  }
};