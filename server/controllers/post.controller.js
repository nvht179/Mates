const PostService = require("../services/post.service");
class PostController {
  addNewPost = async (req, res) => {
    try {
      const { classId, title, content, attachments } = req.body;

      // Tạo post mới trước
      const newPost = await PostService.addNewPost({ classId, title, content });

      // Kiểm tra nếu có attachments, duyệt và tạo từng cái
      if (attachments && attachments.length > 0) {
        const createdAttachments = [];
        for (let attachment of attachments) {
          const newAttachment = await AttachmentService.addAttachment({
            ...attachment,
            postId: newPost.id // Gắn attachment với post vừa tạo
          });
          createdAttachments.push(newAttachment);
        }
        newPost.attachments = createdAttachments; // Thêm thông tin attachment vào post
      }

      // Trả về post đã được tạo và các attachment liên quan
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

module.exports = new PostController();
