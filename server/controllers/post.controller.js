const PostService = require("../services/post.service");
class PostController {
  addNewPost = async (req, res) => {
    try {
      const { classId, title, content, attachments } = req.body;
      // Gọi PostService để tạo post mới với các attachment
      const newPost = await PostService.addNewPostWithAttachments({ 
        classId, 
        title, 
        content, 
        attachments 
      });

      // Trả về post đã tạo và các attachment liên quan
      res.status(201).json({
        message: "Post and attachments created successfully",
        data: newPost,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  async getPostsByClassId(req, res) {
    try {
      const { classId } = req.body;
      const posts = await PostService.getPostsByClassId(classId);

      if (posts.length === 0) {
        throw new ErrorHandler(404, "No reactions found for this post");
      }

      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json(err.message);
    }
  }
}

module.exports = new PostController();
