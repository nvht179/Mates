const sequelize = require("../config/db");
const Person = require("./person.model");
const { logger } = require("../utils/logger");
const Assignment = require("./assignment.model");
const Attachment = require("./attachment.model");
const Reaction = require("./reaction.model");
const Post = require("./post.model");
const {Class, TeacherClass, StudentClass} = require("./class.model");
const Comment = require("./comment.model");
const { Teacher, Student, Parent } = require("./user.model");

// Assignment and Attachment
Assignment.hasMany(Attachment, { foreignKey: "assignmentId", as: "attachments" });
Attachment.belongsTo(Assignment, { foreignKey: "assignmentId", as: "assignment" });

// Person and Reaction
Person.hasMany(Reaction, { foreignKey: "personId", as: "reactions" });
Reaction.belongsTo(Person, { foreignKey: "personId", as: "person" });

// Post and Comment
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Post and Reaction
Post.hasMany(Reaction, { foreignKey: "postId", as: "reactions" });
Reaction.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Post and attachment
Post.hasMany(Attachment, { foreignKey: "postId", as: "attachments" });
Attachment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Class and Post
Class.hasMany(Post, { foreignKey: "classID", as: "posts" });
Post.belongsTo(Class, { foreignKey: "classID", as: "class" });

// Person and Comment
Person.hasMany(Comment, { foreignKey: "personId", as: "comments" });
Comment.belongsTo(Person, { foreignKey: "personId", as: "person" });


// Sync all models with the database
sequelize
  .sync()
  .then(() => {
    logger.info("Database connected and models synced.");
  })
  .catch((err) => {
    logger.error("Error syncing models: ", err);
  });

module.exports = {
  sequelize,
  Person,
  Assignment,
  Attachment,
  Post,
  Reaction,
  Comment,
  Class,
  Teacher,
  Student,
  Parent
};
