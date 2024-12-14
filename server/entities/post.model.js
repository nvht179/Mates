"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./class.model");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Class,
          key: "id",
        },
    },
  },
  {
    tableName: "Post",
    timestamps: false,
  },
);

module.exports = Post;
