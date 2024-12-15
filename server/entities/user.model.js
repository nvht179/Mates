"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Person = require("./person.model");

const Teacher = sequelize.define(
    "Teacher",
    {
        teacherID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            references: {
                model: Person,
                key: "id",
            },
        }
    },
    {
        tableName: "Teacher",
        timestamps: false,
    },
);

const Student = sequelize.define(
    "Student",
    {
        studentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            references: {
                model: Person,
                key: "id",
            },
        }
    },
    {
        tableName: "Student",
        timestamps: false,
    },
);

const Parent = sequelize.define(
    "Parent",
    {
        parentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: Person,
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
        }
    },
    {
        tableName: "Parent",
        timestamps: false,
    },
);

module.exports = {Teacher, Student, Parent};
