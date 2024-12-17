const PostService = require("../services/post.service");
const supabase = require("../config/supabase")
class PostController {
  addNewPost = async (req, res) => {
    try {
      const { classID, title, content, personID } = req.body;

      if (!personID) {
        throw new Error("Person ID is required");
      }
      if (!classID){
        throw new Error("class ID is required");
      }

      // Kiểm tra và xử lý các file upload
      const attachments = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          // Tạo đường dẫn file trên Supabase Storage
          const filePath = `${Date.now()}_${file.originalname}`;
          const { data, error } = await supabase.storage
            .from("Attachments")
            .upload(filePath, file.buffer);

          if (error) {
            throw new Error(`File upload failed: ${error.message}`);
          }

          const { data: publicData } = supabase.storage
            .from("Attachments")
            .getPublicUrl(filePath);

          const publicURL = publicData.publicUrl;

          attachments.push({
            link: publicURL,
            linkTitle: file.originalname, // Tên file làm linkTitle
          });
        }
      }

      // Gọi service để tạo post cùng với attachments
      const newPost = await PostService.addNewPostWithAttachments({
        classID,
        title,
        content,
        attachments,
        personID,
      });

      res.status(200).json({
        message: "Post and attachments created successfully",
        data: newPost,
      });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  };

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
        throw new ErrorHandler(403, "Post not found");
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
      res.status(403).json({ error: err.message });
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
      res.status(403).json({ error: err.message });
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
      res.status(403).json({ message: err.message });
    }
  };
}

module.exports = new PostController();
