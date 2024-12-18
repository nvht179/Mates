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

// Class and Assignment
Class.hasMany(Assignment, { foreignKey: "classID", as: "assignments" });
Assignment.belongsTo(Class, { foreignKey: "classID", as: "class" });


// Person and Comment
Person.hasMany(Comment, { foreignKey: "personId", as: "comments" });
Comment.belongsTo(Person, { foreignKey: "personId", as: "person" });


// Sync all models with the database
sequelize
  .sync()
  .then(async () => {
    logger.info("Database connected and models synced.");

    // Seed initial data for Person
    const initialPersons = [
      {
        "role": "Student",
        "password": "123",
        "email": "mates@gmail.com",
        "name": "Mates",
        "username": "Mates",
        "phone": "113",
        "avatar": "",
        "isVerified": true
      }
    ];

    await Person.bulkCreate(initialPersons);
    logger.info("Initial Person data has been added.");
  })
  .catch((err) => {
    logger.error("Error syncing models: ", err);
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
  Grade
};
