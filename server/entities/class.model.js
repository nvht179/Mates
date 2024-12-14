"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    tableName: "Class",
    timestamps: false,
  },
);

module.exports = Class;
