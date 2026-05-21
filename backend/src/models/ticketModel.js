const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("OPEN", "IN_PROGRESS", "CLOSED"),
      defaultValue: "OPEN",
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
    tableName: "tickets",
  },
);

module.exports = Ticket;
