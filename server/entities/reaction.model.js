"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Person = require("./person.model");
const Post = require("./post.model");
const Reaction = sequelize.define(
  "Reaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: "id",
      },
    },
    type: {
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
  },
  {
    tableName: "Reaction",
    timestamps: false,
  },
);

module.exports = Reaction;
