const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tickets",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "comments",
  },
);

module.exports = Comment;
