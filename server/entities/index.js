const sequelize = require("../config/db");
const Person = require("./person.model");
const { logger } = require("../utils/logger");
const Assignment = require("./assignment.model");
const Attachment = require("./attachment.model");
const Reaction = require("./reaction.model");
const Post = require("./post.model");
const { Class, TeacherClass, StudentClass } = require("./class.model");
const Comment = require("./comment.model");
const { Teacher, Student, Parent } = require("./user.model");
const Lecture = require("./lecture.model");
const Grade = require("./grade.model");
const { Event, Event_Person } = require("./event.model");
const Notification = require("./notification.model");

// Assignment and Attachment
Assignment.hasMany(Attachment, { foreignKey: "assignmentId", as: "attachments", onDelete: "CASCADE", hooks: true });
Attachment.belongsTo(Assignment, { foreignKey: "assignmentId", as: "assignment" });

// Person and Reaction
Person.hasMany(Reaction, { foreignKey: "personId", as: "reactions", onDelete: "CASCADE", hooks: true });
Reaction.belongsTo(Person, { foreignKey: "personId", as: "person" });

// Post and Comment
Post.hasMany(Comment, { foreignKey: "postId", as: "comments", onDelete: "CASCADE", hooks: true });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Post and Reaction
Post.hasMany(Reaction, { foreignKey: "postId", as: "reactions", onDelete: "CASCADE", hooks: true });
Reaction.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Post and Attachment
Post.hasMany(Attachment, { foreignKey: "postId", as: "attachments", onDelete: "CASCADE", hooks: true });
Attachment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Class and Post
Class.hasMany(Post, { foreignKey: "classID", as: "posts", onDelete: "CASCADE", hooks: true });
Post.belongsTo(Class, { foreignKey: "classID", as: "class" });

// Class and Assignment
Class.hasMany(Assignment, { foreignKey: "classID", as: "assignments", onDelete: "CASCADE", hooks: true });
Assignment.belongsTo(Class, { foreignKey: "classID", as: "class" });

// Person and Comment
Person.hasMany(Comment, { foreignKey: "personId", as: "comments", onDelete: "CASCADE", hooks: true });
Comment.belongsTo(Person, { foreignKey: "personId", as: "person" });

// Notification and Post
Notification.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE", hooks: true });

// Notification and Comment
Notification.belongsTo(Comment, { foreignKey: "commentId", onDelete: "CASCADE", hooks: true });

// Notification and Assignment
Notification.belongsTo(Assignment, { foreignKey: "assignmentId", onDelete: "CASCADE", hooks: true });

// Notification and Person
Notification.belongsTo(Person, { foreignKey: "targetId", onDelete: "CASCADE", hooks: true });

// Add CASCADE constraints to existing tables via raw SQL
const addCascadeConstraints = async () => {
  const queries = [
    `
      ALTER TABLE "Notifications"
      DROP CONSTRAINT IF EXISTS "Notifications_postId_fkey",
      ADD CONSTRAINT "Notifications_postId_fkey"
      FOREIGN KEY ("postId")
      REFERENCES "Post" ("id")
      ON DELETE CASCADE;
    `,
    `
      ALTER TABLE "Notifications"
      DROP CONSTRAINT IF EXISTS "Notifications_commentId_fkey",
      ADD CONSTRAINT "Notifications_commentId_fkey"
      FOREIGN KEY ("commentId")
      REFERENCES "Comment" ("id")
      ON DELETE CASCADE;
    `,
    `
      ALTER TABLE "Notifications"
      DROP CONSTRAINT IF EXISTS "Notifications_assignmentId_fkey",
      ADD CONSTRAINT "Notifications_assignmentId_fkey"
      FOREIGN KEY ("assignmentId")
      REFERENCES "Assignment" ("id")
      ON DELETE CASCADE;
    `,
    `
      ALTER TABLE "Notifications"
      DROP CONSTRAINT IF EXISTS "Notifications_targetId_fkey",
      ADD CONSTRAINT "Notifications_targetId_fkey"
      FOREIGN KEY ("targetId")
      REFERENCES "Person" ("id")
      ON DELETE CASCADE;
    `,
  ];

  for (const query of queries) {
    try {
      await sequelize.query(query);
    } catch (err) {
      logger.error(`Error executing query: ${query.trim()} - ${err.message}`);
    }
  }
};

// Sync models and apply raw SQL constraints
sequelize
  .sync({ force: false }) // Change to `force: true` only if you want to drop and recreate all tables
  .then(async () => {
    logger.info("Database connected and models synced.");
    await addCascadeConstraints(); // Add cascade constraints
  })
  .catch((err) => {
    logger.error("Error syncing models: ", err.message);
  });

module.exports = {
  sequelize,
  Person,
  Class,
  TeacherClass,
  StudentClass,
  Assignment,
  Attachment,
  Post,
  Reaction,
  Comment,
  Teacher,
  Student,
  Parent,
  Lecture,
  Event,
  Event_Person,
  Grade,
  Notification,
};