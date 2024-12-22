const createPost = require("./createPost");
const postClass = require("./postClass");
const postEdit = require("./postEdit");
const postDelete = require("./postDelete");

module.exports = {
  "/posts/create": {
    ...createPost
  },
  "/posts/classID/{classID}": {  
    ...postClass
  },
  "/posts/edit/": {
    ...postEdit
  },
  "/posts/remove/{postId}": {
    ...postDelete
  },
};