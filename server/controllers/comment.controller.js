const CommentService = require("../services/comment.service");

class CommentController {
  // Add a new comment to a post
  async addComment(req, res) {
    try {
      const { content, postId, personId } = req.body;

      // Validate the input
      if (!content || !postId || !personId) {
        return res.status(403).json({
          message: "Missing required fields: content, postId, or personId.",
        });
      }

      const newComment = await CommentService.addComment({
        content,
        postId,
        personId,
      });

      return res.status(200).json({
        message: "Comment added successfully.",
        data: newComment,
      });
    } catch (err) {
      console.error("Error in CommentController - addComment:", err);
      return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
      });
    }
  }

  // Delete a comment by commentId
  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;

      if (!commentId) {
        return res.status(400).json({
          message: "Comment ID is required.",
        });
      }

      const result = await CommentService.deleteComment(commentId);

      return res.status(200).json({
        message: result.message,
      });
    } catch (err) {
      console.error("Error in CommentController - deleteComment:", err);
      return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
      });
    }
  }
}

module.exports = new CommentController();