"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { Class } = require("./class.model");
const Person = require("./person.model");

const Event = sequelize.define(
  "Event",
  {
    eventID: {
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
      allowNull: true,
    },
    repeatTime: {
      type: DataTypes.DATE,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
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
    tableName: "Event",
    timestamps: false,
  },
);

const Event_Person = sequelize.define(
  "Event_Person",
  {
    eventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "eventID",
      },
    },
    personID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: "id",
      },
    }
  },
  {
    tableName: "Event_Person",
    timestamps: false,
    uniqueKeys: {
      studentClassUnique: {
        fields: ['eventID', 'personID'], // Composite candidate key
      },
    },
  },
);

module.exports = { Event, Event_Person };
