"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Class } = require("./class.model");
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
        model: Person, 
        key: "id", 
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    tableName: "Post",
    timestamps: false,
  },
);

module.exports = Post;
