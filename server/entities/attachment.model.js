"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Assignment = require("./assignment.model");
const Post = require("./post.model");
const Lecture = require("./lecture.model");

const Attachment = sequelize.define(
  "Attachment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
    },
    linkTitle: {
      type: DataTypes.STRING,
    },
    assignmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Assignment,
          key: "id",
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Post,
          key: "id",
        },
    },
    lectureId: {
      type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Lecture,
          key: "id",
        },
    }
  },
  {
    tableName: "Attachment",
    timestamps: false,
  },
);

module.exports = Attachment;
