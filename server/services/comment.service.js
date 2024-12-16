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
}

module.exports = new CommentService();