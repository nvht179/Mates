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
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
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
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  }

  async viewCommentsByPostId(req, res) {
    try {
      const { postId } = req.params;

      // Validate postId
      if (!postId) {
        return res.status(400).json({
          message: "Post ID is required.",
        });
      }

      const comments = await CommentService.getCommentsByPostId(postId);

      if (!comments || comments.length === 0) {
        return res.status(404).json({
          message: "No comments found for this post.",
          data: [],
        });
      };

      return res.status(200).json({
        message: "Comments retrieved successfully.",
        data: comments,
      });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(500).json({ message });
    }
  }

  async editComment(req, res) {
    try {
      const { commentId } = req.params; // Lấy commentId từ params
      const { content } = req.body; // Nội dung chỉnh sửa
  
      // Kiểm tra đầu vào
      if (!commentId || !content) {
        return res.status(403).json({
          message: "Missing required fields: commentId or content.",
        });
      }
  
      // Gọi service để chỉnh sửa comment
      const updatedComment = await CommentService.editComment(commentId, content);
  
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found." });
      }
  
      return res.status(200).json({
        message: "Comment updated successfully.",
        data: updatedComment,
      });
    } catch (err) {
      const message = err.message || "An error occurred";
      res.status(403).json({ message });
    }
  }
}

module.exports = new CommentController();