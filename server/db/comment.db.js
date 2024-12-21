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

  async getCommentsByPostId(postId) {
    try {
      const comments = await Comment.findAll({
        where: { postId },
      });

      return comments;
    } catch (err) {
      console.error("Error in CommentDB - getCommentsByPostId:", err);
      throw new Error(`Error retrieving comments for postId ${postId}: ${err.message}`);
    }
  }

  async updateComment(commentId, content) {
    try {
      // Tìm và cập nhật comment theo commentId
      const [updatedRowsCount] = await Comment.update(
        { content },
        {
          where: { id: commentId },
        }
      );
  
      if (updatedRowsCount === 0) {
        throw new Error(`Comment with ID ${commentId} does not exist.`);
      }
  
      // Lấy lại comment sau khi cập nhật
      const updatedComment = await Comment.findByPk(commentId);
      return updatedComment;
    } catch (err) {
      console.error("Error in CommentDB - updateComment:", err);
      throw new Error(`Error updating comment with ID ${commentId}: ${err.message}`);
    }
  }
}

module.exports = new CommentDB();