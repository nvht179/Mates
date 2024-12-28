const CommentDB = require("../db/comment.db");
const { ErrorHandler } = require("../helpers/error");
const ClassService = require("./class.service");
const NotificationService = require("./notification.service");
const PostDB = require("../db/post.db");

class CommentService {
  // Add a comment to a post
  async addComment({ content, postId, personId }) {
    try {
      const newComment = await CommentDB.addCommentToPostId({
        content,
        postId,
        personId,
      });

      const post = await PostDB.findPostByID(postId);
      const classID = post.classID;
      const commentID = newComment.id;
      const type = "comment";
      const notiTitle = "New title - " + content;
      const assignmentID = null;
      const postID = postId;

      // All members in class
      const studentClassInfo = await ClassService.viewAllStudentsInClass(classID);
      for (const student of studentClassInfo) {
        const userID = student.id;
        const notification = await NotificationService.notification(userID, postID, notiTitle, content, type, commentID, assignmentID);
      }

      const teacherClassInfo = await ClassService.viewAllTeachersInClass(classID);
      for (const teacher of teacherClassInfo) {
        const userID = teacher.id;
        const notification = await NotificationService.notification(userID, postID, notiTitle, content, type, commentID, assignmentID);
      }

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
      const updatedComment = await CommentDB.updateComment(commentId, content);
      return updatedComment;
    } catch (err) {
      console.error("Error in CommentService - editComment:", err);
      throw err;
    }
  }
}

module.exports = new CommentService();