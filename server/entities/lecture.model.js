"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Class, TeacherClass, StudentClass } = require("./class.model");

const Lecture = sequelize.define(
  "Lecture",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }
  },
  {
    tableName: "Lecture",
    timestamps: false,
  },
);

module.exports = Lecture;
