"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Class } = require("./class.model");
const Assignment = require("./assignment.model");
const { Teacher, Student, Parent } = require("./user.model");

const Grade = sequelize.define(
  "Grade",
  {
    gradeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grade100: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Not Submitted",
    },
    submittedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    assignmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Assignment,
        key: "id",
      },
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "studentID",
      },
    },
  },

  {
    tableName: "Grade",
    timestamps: false,
  },
);

module.exports = Grade;
