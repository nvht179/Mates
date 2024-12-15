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
      const { classId } = req.params;
      const posts = await PostService.getPostsByClassId(classId);

      if (posts.length === 0) {
        throw new ErrorHandler(404, "No reactions found for this post");
      }

      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json(err.message);
    }
  }

  // Edit a post
   // Edit a post
   editPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, content, attachments } = req.body;

      // Call PostService to retrieve the current post
      const currentPost = await PostService.getPostById(postId);

      // If the post doesn't exist, return an error
      if (!currentPost) {
        throw new ErrorHandler(404, "Post not found");
      }

      // Prepare the data to update, only include values that are not undefined
      const updatedPostData = {
        title: title || currentPost.title, // Use current title if no new title provided
        content: content || currentPost.content, // Use current content if no new content provided
        attachments: attachments || currentPost.attachments, // Use current attachments if no new attachments provided
      };

      // Call PostService to update the post
      const updatedPost = await PostService.editPost({
        postId,
        ...updatedPostData
      });

      res.status(200).json({
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


  // Remove a post
  removePost = async (req, res) => {
    try {
      const { postId } = req.params;

      // Call PostService to remove the post
      await PostService.removePost(postId);

      res.status(200).json({
        message: "Post removed successfully",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getPostById = async (req, res) => {
    try {
      const { postId } = req.params;

      // Gọi service để tìm post theo ID
      const post = await PostService.getPostById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        message: "Post found",
        data: post,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}

module.exports = new PostController();
