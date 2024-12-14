"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime:{
        type: DataTypes.DATE,
    },
    endTime:{
        type: DataTypes.DATE,
    }
  },
  {
    tableName: "Assignment",
    timestamps: false,
  },
);

module.exports = Assignment;
