"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Teacher, Student, Parent } = require("./user.model");

const Class = sequelize.define(
  "Class",
  {
    classID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Class",
    timestamps: false,
  },
);

const TeacherClass = sequelize.define(
  "Teacher_Class",
  {
    classID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key: "classID",
      },
    },
    teacherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "teacherID",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Teacher_Class",
    timestamps: false,
    uniqueKeys: {
      teacherClassUnique: {
        fields: ['classID', 'teacherID'], // Composite candidate key
      },
    },
  },
);

const StudentClass = sequelize.define(
  "Student_Class",
  {
    classID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key: "classID",
      },
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "studentID",
      },
    }
  },
  {
    tableName: "Student_Class",
    timestamps: false,
    uniqueKeys: {
      studentClassUnique: {
        fields: ['classID', 'studentID'], // Composite candidate key
      },
    },
  },
);

module.exports = { Class, TeacherClass, StudentClass };
