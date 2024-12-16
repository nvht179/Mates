const { Comment } = require("../entities");

class CommentDB {
  // Add a new comment to a post
  async addCommentToPostId({ content, postId, personId }) {
    try {
      // Tạo comment mới
      const newComment = await Comment.create({
        content,
        postId,
        personId,
      });

      return newComment;
    } catch (err) {
      console.error("Error in CommentDB - addCommentToPostId:", err);
      throw new Error(`Error adding comment to postId ${postId}: ${err.message}`);
    }
  }

  // Delete a comment by commentId
  async deleteComment(commentId) {
    try {
      // Xóa comment theo id
      const deletedCount = await Comment.destroy({
        where: { id: commentId },
      });

      if (deletedCount === 0) {
        throw new Error(`Comment with ID ${commentId} does not exist.`);
      }

      return { message: `Comment with ID ${commentId} deleted successfully.` };
    } catch (err) {
      console.error("Error in CommentDB - deleteComment:", err);
      throw new Error(`Error deleting comment with ID ${commentId}: ${err.message}`);
    }
  }
}

module.exports = new CommentDB();