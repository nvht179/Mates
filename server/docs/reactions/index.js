const createReactions = require("./createReactions");
const reactionDelete = require("./reactionDelete");
const reactionPost = require("./reactionPost");
const reactionUpdate = require("./reactionUpdate");

module.exports = {
  "/reactions/create": {
    ...createReactions
  },
  "/reactions/postId={postId}": {
    ...reactionPost
  },
  "/reactions/update": {
    ...reactionUpdate
  },
  "/reactions/delete": {
    ...reactionDelete
  }
};