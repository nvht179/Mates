const PostService = require("../services/post.service");
const supabase = require("../config/supabase")
class PostController {
  addNewPost = async (req, res) => {
    try {
      const { classID, title, content, personID } = req.body;
  
      if (!personID) {
        throw new Error("Person ID is required");
      }
      if (!classID) {
        throw new Error("Class ID is required");
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
  
          const { data: publicData } = supabase.storage
            .from("Attachments")
            .getPublicUrl(filePath);
  
          const publicURL = publicData.publicUrl;
  
          attachments.push({
            link: publicURL,
            linkTitle: file.originalname,
          });
        }
      }
  
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
  
      if (!classID) {
        return res.status(400).json({ message: "classID is required." });
      }
  
      let posts = await PostService.getPostsByClassId(classID);
      
      if (!posts || posts.length === 0) {
        return res.status(200).json({ message: "No posts found", data: [] });
      }
  
      return res.status(200).json({ message: "Success", data: posts });
    } catch (error) {
      console.error("Error fetching posts by class ID:", error);
      return res.status(500).json({ message: "Error fetching posts." });
    }
  };
}

module.exports = new PostController();
