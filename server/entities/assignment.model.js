"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Class } = require("./class.model");

const Assignment = sequelize.define(
  "Assignment",
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    weight: {
      type: DataTypes.INTEGER,
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
  },

  {
    tableName: "Assignment",
    timestamps: false,
  },
);

module.exports = Assignment;
