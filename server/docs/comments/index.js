const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const editComment = require("./editComment");
const viewAllComments = require("./viewAllComments");

module.exports = {
  "/comments/add": {
    ...addComment
  },
  "/comments/delete/{commentId}":{
    ...deleteComment
  },
  "/comments/view-all-comments-in-post/{postId}": {
      ...viewAllComments
  },
  "/comments/edit/{id}":{
    ...editComment
  }
};