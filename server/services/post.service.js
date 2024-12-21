const PostDB = require("../db/post.db");
const { ErrorHandler } = require("../helpers/error");

class PostService {
  addNewPostWithAttachments = async ({ classID, title, content, attachments, personID }) => {
    try {
      // Gọi DB để tạo post mới và các attachment, thêm personID vào
      const newPost = await PostDB.addNewPostWithAttachments({
        classID,
        title,
        content,
        attachments,
        personID, // Thêm personID vào tham số
      });

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
  
      if (!posts || posts.length === 0) {
        throw new Error(`No posts found for class ID ${classID}.`);
      }
  
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