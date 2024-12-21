const CommentDB = require("../db/comment.db");
const { ErrorHandler } = require("../helpers/error");

class CommentService {
  // Add a comment to a post
  async addComment({ content, postId, personId }) {
    try {
      const newComment = await CommentDB.addCommentToPostId({
        content,
        postId,
        personId,
      });
      return newComment;
    } catch (err) {
      throw new ErrorHandler(500, `Error in CommentService - addComment: ${err.message}`);
    }
  }

  // Delete a comment by commentId
  async deleteComment(commentId) {
    try {
      const result = await CommentDB.deleteComment(commentId);
      return result;
    } catch (err) {
      throw new ErrorHandler(500, `Error in CommentService - deleteComment: ${err.message}`);
    }
  }

  async getCommentsByPostId(postId) {
    try {
      return await CommentDB.getCommentsByPostId(postId);
    } catch (err) {
      console.error("Error in CommentService - getCommentsByPostId:", err);
      throw err;
    }
  }

  async editComment(commentId, content) {
    try {
      // Gọi DB để cập nhật comment
      const updatedComment = await CommentDB.updateComment(commentId, content);
      return updatedComment;
    } catch (err) {
      console.error("Error in CommentService - editComment:", err);
      throw err;
    }
  }
}

module.exports = new CommentService();