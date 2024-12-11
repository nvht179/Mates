"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Assignment = require("./assignment.model")
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
      unique: true,
    },
    assignmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Assignment,
          key: "id",
        },
    },
  },
  {
    tableName: "Attachment",
    timestamps: false,
  },
);

module.exports = Attachment;
