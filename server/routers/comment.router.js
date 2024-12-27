const express = require("express");
const CommentController = require("../controllers/comment.controller");
const commentController = require("../controllers/comment.controller");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.middleware");

router.use(verifyToken);

// Endpoint to add a comment to a post
router.post("/add", CommentController.addComment);

// Endpoint to delete a comment by commentId
router.delete("/delete/:commentId", CommentController.deleteComment);

router.get("/view-all-comments-in-post/:postId", commentController.viewCommentsByPostId);

router.put("/edit/:commentId",commentController.editComment)
module.exports = router;