const Post = require("../entities/post.model");
const { ErrorHandler } = require("../helpers/error");
const AttachmentDB = require("../db/attachment.db"); // Import AttachmentDB để xử lý việc thêm attachment
const sequelize = require("../config/db");
const { Comment, Reaction, Person, Attachment } = require("../entities");
class PostDB {
  addNewPostWithAttachments = async ({ classID, title, content, attachments, personID }) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Tạo bài viết mới, thêm personID vào
      const newPost = await Post.create(
        {
          classID,
          title,
          content,
          personID, // Thêm personID vào đây
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
      await transaction.commit();

      const addedAttachments = await Attachment.findAll({
        where: { postId: newPost.id },
        attributes: ["id", "link", "linkTitle"], // Lấy các trường cần thiết
      });

      
      // Commit transaction nếu không có lỗi
      // Trả về post đã tạo
      return {
        ...newPost.toJSON(),
        attachments: addedAttachments, // Đính kèm thông tin đầy đủ của attachments
      };

    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback nếu có lỗi

      throw new ErrorHandler("Error creating post with attachments", error);
    }
  };

  getPostsByClassId = async (classID) => {
    try {
      const posts = await Post.findAll({
        where: { classID },
        include: [
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: Person,
                as: "person",
                attributes: ["id", "name", "avatar"],
              },
            ],
          },
          {
            model: Reaction,
            as: "reactions",
            include: [
              {
                model: Person,
                as: "person",
                attributes: ["id", "name", "avatar"],
              },
            ],
          },
          {
            model: Attachment,
            as: "attachments",
            attributes: ["id", "link", "linkTitle"],

          },
        ],
      });
  
      return posts;
    } catch (error) {
      throw new Error(`Error retrieving posts by class ID: ${error.message}`);
    }
  };
  /**
   * Edit a post
   * @param {number} postId - ID of the post to edit
   * @param {object} updatedData - Updated post data (title, content, attachments)
   */
  async editPost({ postId, title, content, attachments }) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Find the post to edit
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new ErrorHandler(404, "Post not found");
      }

      // Update the post's title and content
      await post.update({ title, content }, { transaction });

      // Handle updating attachments
      if (attachments && attachments.length > 0) {
        // First, remove existing attachments for the post
        await AttachmentDB.removeAttachmentsByPostId(postId, { transaction });

        // Then, add the new attachments
        for (let attachment of attachments) {
          await AttachmentDB.addAttachment(
            {
              link: attachment.link,
              linkTitle: attachment.linkTitle,
              assignmentId: attachment.assignmentId,
              postId: postId,
            },
            { transaction }
          );
        }
      }

      

      await transaction.commit();
      const updatedAttachments = await Attachment.findAll({
        where: { postId },
        attributes: ["id", "link", "linkTitle"], // Include necessary attributes
      });
      return {
        post,
        attachments: updatedAttachments,
      };
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback transaction on error
      throw new ErrorHandler("Error editing post", error);
    }
  }

  /**
   * Remove a post by its ID
   * @param {number} postId - ID of the post to remove
   */
  async removePost(postId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      // Find the post to remove
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new ErrorHandler(404, "Post not found");
      }

      // Remove associated attachments
      await AttachmentDB.removeAttachmentsByPostId(postId, { transaction });

      // Remove the post itself
      await post.destroy({ transaction });

      await transaction.commit();
      return { message: "Post deleted successfully" };
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback transaction on error
      throw new ErrorHandler("Error removing post", error);
    }
  }
  getPostById = async (postId) => {
    try {
      const post = await Post.findByPk(postId, {
        include: [
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: Person,
                as: "person",
                attributes: ["id", "name", "avatar"],
              },
            ],
          },
          {
            model: Reaction,
            as: "reactions",
            include: [
              {
                model: Person,
                as: "person",
                attributes: ["id", "name", "avatar"],
              },
            ],
          },
          {
            model: Attachment,
            as: "attachments",
            attributes: ["id", "link", "linkTitle"],

          },
        ],
      });
  
      return post;
    } catch (error) {
      throw new Error(`Error retrieving post with ID ${postId}: ${error.message}`);
    }
  };
}

module.exports = new PostDB();