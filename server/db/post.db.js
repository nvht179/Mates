const Post = require("../entities/post.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("../db/attachment.db"); // Import AttachmentDB để xử lý việc thêm attachment
const sequelize = require("../config/db");
class PostDB {
  addNewPostWithAttachments = async ({ classId, title, content, attachments }) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const newPost = await Post.create(
        {
          classId,
          title,
          content,
        },
        { transaction } 
      );

      // Nếu có attachment, thêm từng cái một với postId mới tạo
      if (attachments && attachments.length > 0) {
        for (let attachment of attachments) {
          // Mỗi attachment sẽ được tạo với postId = newPost.id
          await AttachmentDB.addAttachment(
            {
              link: attachment.link,
              linkTitle: attachment.linkTitle,
              assignmentId: attachment.assignmentId,
              postId: newPost.id, // Liên kết postId với post mới tạo
            },
            { transaction }
          );
        }
      }

      // Commit transaction nếu không có lỗi
      await transaction.commit();
      // Trả về post đã tạo
      return newPost;

    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback nếu có lỗi

      throw new ErrorHandler("Error creating post with attachments", error);
    }
  };
  async getPostsByClassId(classId) {
    try {
      const posts = await Post.findAll({
        where: { classId }
      });
      return posts;
    } catch (error) {
      throw new ErrorHandler(500, "Error retrieving reactions", error);
    }
  }
}

module.exports = new PostDB();