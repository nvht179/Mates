const PostService = require("../services/post.service");
const supabase = require("../config/supabase")
class PostController {
  addNewPost = async (req, res) => {
    try {
      const { classID, title, content, personID } = req.body;
  
      // Kiểm tra Person ID và Class ID
      if (!personID) {
        throw new Error("Person ID is required");
      }
      if (!classID) {
        throw new Error("Class ID is required");
      }
  
      const attachments = [];
  
      // Kiểm tra xem có file đính kèm không
      if (req.files && req.files.length > 0) {
        // Duyệt qua từng file nếu có
        for (const file of req.files) {
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
  
          // Thêm thông tin file vào mảng attachments
          attachments.push({
            link: publicURL,
            linkTitle: file.originalname,
          });
        }
      }
  
      // Tạo bài đăng mới với các tệp đính kèm (nếu có)
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
      const { title, content,postId } = req.body;

  
      const currentPost = await PostService.getPostById(postId);
  
      if (!currentPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const attachments = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
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
  
      const updatedPost = await PostService.editPost({
        postId,
        title: title || currentPost.title,
        content: content || currentPost.content,
        attachments, 
      });
  
      res.status(200).json({
        message: "Post updated successfully with new attachments",
        data: {
          post: updatedPost.post,
          attachments: updatedPost.attachments, // Return full attachment details including ID
        },
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

  getPostsByClassId = async (req, res) => {
    try {
      const { classID } = req.params;
  
      // Kiểm tra classID có được truyền vào không
      if (!classID) {
        return res.status(400).json({ message: "classID is required." });
      }
  
      // Lấy danh sách bài viết từ service
      let posts = await PostService.getPostsByClassId(classID);
  
      // Kiểm tra xem có bài viết nào không
      if (!posts || posts.length === 0) {
        return res.status(200).json({ message: "No posts found", data: [] });
      }
  
      // Nếu có bài viết, trả về mảng bài viết cùng thông báo thành công
      return res.status(200).json({ message: "Success", data: posts });
    } catch (error) {
      console.error("Error fetching posts by class ID:", error);
      return res.status(500).json({ message: "Error fetching posts." });
    }
  };
}

module.exports = new PostController();
