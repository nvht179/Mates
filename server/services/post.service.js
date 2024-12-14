const PostDB = require("../db/post.db");
const { ErrorHandler } = require("../helpers/error");

class PostService {
  addNewPostWithAttachments = async ({ classId, title, content, attachments }) => {
    try {
      // Gọi DB để tạo post mới và các attachment
      const newPost = await PostDB.addNewPostWithAttachments({
        classId,
        title,
        content,
        attachments,
      });

      return newPost;
    } catch (err) {
      console.log(err)
      throw new ErrorHandler(500, `Error in creating post with attachments in service: ${err.message}`);
    }
  };
}

module.exports = new PostService();
