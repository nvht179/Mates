const express = require("express");
const CommentController = require("../controllers/comment.controller");

const router = express.Router();

// Endpoint to add a comment to a post
router.post("/add", CommentController.addComment);

// Endpoint to delete a comment by commentId
router.delete("/delete/:commentId", CommentController.deleteComment);

module.exports = router;