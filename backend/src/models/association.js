const User = require("./userModel");
const Ticket = require("./ticketModel");
const Comment = require("./commentModel");

User.hasMany(Ticket, {
  foreignKey: "createdBy",
  as: "createdTickets",
});

Ticket.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Ticket, {
  foreignKey: "assignedTo",
  as: "assignedTickets",
});

Ticket.belongsTo(User, {
  foreignKey: "assignedTo",
  as: "assignedAdmin",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Ticket.hasMany(Comment, {
  foreignKey: "ticketId",
  as: "comments",
});

Comment.belongsTo(Ticket, {
  foreignKey: "ticketId",
  as: "ticket",
});

module.exports = { User, Ticket, Comment };
