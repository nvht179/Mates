const router = require("express").Router();
const PostController = require('../controllers/post.controller')

router.post("/create", PostController.addNewPost);
router.get("/classID=:classID", PostController.getPostsByClassId);
router.put("/edit/:postId", PostController.editPost); // Edit an existing post
router.delete("/remove/:postId", PostController.removePost); // Remove a post

module.exports = router;
