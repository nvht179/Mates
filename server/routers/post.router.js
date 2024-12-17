const router = require("express").Router();
const PostController = require('../controllers/post.controller')
const upload = require("../middleware/upload.middleware");
router.post("/create",upload ,PostController.addNewPost);
// router.get("/classID=:classID", PostController.getPostsByClassId);
router.put("/edit/:postId", PostController.editPost); // Edit an existing post
router.delete("/remove/:postId", PostController.removePost); // Remove a post

module.exports = router;
