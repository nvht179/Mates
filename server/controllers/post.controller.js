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
   editPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

  
      // Lấy thông tin bài post hiện tại
      const currentPost = await PostService.getPostById(postId);
  
      if (!currentPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      // Xử lý file upload và tạo attachments mới
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
  
          const { data: publicData, error: publicUrlError } = supabase.storage
            .from("Attachments")
            .getPublicUrl(filePath);
  
          if (publicUrlError) {
            throw new Error(`Error getting public URL: ${publicUrlError.message}`);
          }
  
          const publicURL = publicData.publicUrl;
  
          attachments.push({
            link: publicURL,
            linkTitle: file.originalname,
          });
        }
      }
  
      // Gọi service để cập nhật post và xóa các attachment cũ rồi thêm mới
      const updatedPost = await PostService.editPost({
        postId,
        title: title || currentPost.title,
        content: content || currentPost.content,
        attachments, // Danh sách attachments mới
      });
  
      res.status(200).json({
        message: "Post updated successfully with new attachments",
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
