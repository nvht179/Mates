const postDB = require("../db/post.db");
const { ErrorHandler } = require("../helpers/error");

class PostService {
    addNewPost = async ({
        classId,
        title,
        content,
        attachmentId,
    }) => {
    try {
        const newPost = await postDB.addNewPost({
            classId,
            title,
            content,
            attachmentId,
        });
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
