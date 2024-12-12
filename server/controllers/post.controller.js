const PostService = require("../services/post.service");
class PostController {
    addNewPost = async (req, res) => {
    try {
      const {
        classId,
        title,
        content,
        attachmentId,
      } = req.body;
      const newPost = await PostService.addNewPost({
        classId,
        title,
        content,
        attachmentId,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(404).json(err.message);
    }
  };
}

module.exports = new PostController();
