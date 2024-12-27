// notification.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post.model");
const Comment = require("./comment.model");
const Assignment = require("./assignment.model");
const Person = require("./person.model");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Post,
        key: 'id',
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Comment,
        key: 'id',
      },
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Assignment,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    statusRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: "Notifications",
    timestamps: false,
  }
);

// Relations between Notification and other tables
Notification.belongsTo(Post, { foreignKey: 'postId' });
Notification.belongsTo(Comment, { foreignKey: 'commentId' });
Notification.belongsTo(Assignment, { foreignKey: 'assignmentId' });
Notification.belongsTo(Person, { foreignKey: 'targetId' });

module.exports = Notification;