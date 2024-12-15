const auth = require("./auth");
const users = require("./users");
const posts = require("./posts");
const reactions = require("./reactions");
const classes = require("./classes");

module.exports = {
  paths: {
    ...auth,
    ...users,
    ...posts,
    ...reactions,
    ...classes,
  },
};