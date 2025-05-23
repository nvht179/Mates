const auth = require("./auth");
const users = require("./users");
const posts = require("./posts");
const reactions = require("./reactions");
const classes = require("./classes");
const comments = require("./comments");
const attachments = require("./attachments");
const lectures = require("./lectures");
const assignments = require("./assignments");
const events = require("./events");
const notifications = require("./notifications");
const grades = require("./grades");

module.exports = {
  paths: {
    ...auth,
    ...users,
    ...posts,
    ...reactions,
    ...classes,
    ...comments,
    ...attachments,
    ...lectures,
    ...assignments,
    ...events,
    ...grades,
    ...notifications
  },
};