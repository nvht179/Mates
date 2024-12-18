const createEvent = require("./createEvent");
const viewEventByUserID = require("./viewEventByUserID");

module.exports = {
  "/events/create": {
    ...createEvent
  },
  "/events/view-event-by-userID/{userID}": {
    ...viewEventByUserID
  }
};