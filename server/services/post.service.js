const PostDB = require("../db/post.db");
const { ErrorHandler } = require("../helpers/error");

class PostService {
  addNewPostWithAttachments = async ({ classID, title, content, attachments }) => {
    try {
      // Gọi DB để tạo post mới và các attachment
      const newPost = await PostDB.addNewPostWithAttachments({
        classID,
        title,
        content,
        attachments,
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

  async getPostsByClassId(classID) {
    try {
      const posts = await PostDB.getPostsByClassId(classID);
      return posts;
    } catch (error) {
      throw new ErrorHandler(
        500,
        "Error in service layer while retrieving reactions",
        error
      );
    }
  }

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
      return post;
    } catch (err) {
      throw new Error("Error in PostService: " + err.message);
    }
  };
}

module.exports = new PostService();