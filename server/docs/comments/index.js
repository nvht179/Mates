const addComment = require("./addComment");
const deleteComment = require("./deleteComment");

module.exports = {
  "/comments/add": {
    ...addComment
  },
  "/comments/delete/{commentId}":{
    ...deleteComment
  }
};