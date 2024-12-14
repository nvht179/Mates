const postDB = require("../db/post.db");
const { ErrorHandler } = require("../helpers/error");

class PostService {
    addNewPost = async ({
        classId,
        title,
        content,
    }) => {
    try {
      const newPost = await Post.create(
        { classId, title, content },
        { transaction }
      );
      if (!newPost) {
        throw new ErrorHandler(403, "Not exist assignment");
      }
      return newPost;
    } catch (err) {
      throw new ErrorHandler(err.statusCode, err.message);
    }
  };
}

module.exports = new PostService();
