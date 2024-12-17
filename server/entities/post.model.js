"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./class.model");
const Person = require("./person.model");

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
    classID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Class,
          key: "classID",
        },
    },
    personID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person, // Tham chiếu đến Person model
        key: "personID", // Khóa chính của Person
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Tự động gán giá trị thời gian hiện tại
    },
  },
  {
    tableName: "Post",
    timestamps: false,
  },
);

module.exports = Post;
