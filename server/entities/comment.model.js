"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Post = require("./post.model");
const Person = require("./person.model");
const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Post,
          key: "id",
        },
    },
    personId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Person,
          key: "id",
        },
    }
  },
  {
    tableName: "Comment",
    timestamps: false,
  },
);

module.exports = Comment;
