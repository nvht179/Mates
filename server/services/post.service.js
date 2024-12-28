const PostDB = require("../db/post.db");
const { ErrorHandler } = require("../helpers/error");
const NotificationService = require("./notification.service");
const ClassService = require("./class.service");

class PostService {
  addNewPostWithAttachments = async ({ classID, title, content, attachments, personID }) => {
    try {
      const newPost = await PostDB.addNewPostWithAttachments({
        classID,
        title,
        content,
        attachments,
        personID, 
      });

      const postID = newPost.id;
      const type = "post";
      const notiTitle = "New post - " + title;
      const commentID = null;
      const assignmentID = null;

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

      return newPost;
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(
        500,
        `Error in creating post with attachments in service: ${err.message}`
      );
    }
  };

  getPostsByClassId = async (classID) => {
    try {
      const posts = await PostDB.getPostsByClassId(classID);
      return posts;
    } catch (error) {
      throw new Error(
        `Error in PostService - getPostsByClassId: ${error.message}`
      );
    }
  };

  // Edit a post
  async editPost({ postId, title, content, attachments }) {
    try {
      const updatedPost = await PostDB.editPost({
        postId,
        title,
        content,
        attachments,
      });
      return updatedPost;
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Error editing post in service: ${error.message}`
      );
    }
  }

  // Remove a post
  async removePost(postId) {
    try {
      const result = await PostDB.removePost(postId);
      return result;
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Error removing post in service: ${error.message}`
      );
    }
  }

  getPostById = async (postId) => {
    try {
      const post = await PostDB.getPostById(postId);

      if (!post) {
        throw new Error(`Post with ID ${postId} not found.`);
      }

      return post;
    } catch (err) {
      throw new Error(`Error in PostService - getPostById: ${err.message}`);
    }
  };
}

module.exports = new PostService();