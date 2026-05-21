const router = require("express").Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createTicketValidation,
  updateTicketValidation,
} = require("../validations/ticketValidation");

router.get("/", ticketController.getAllTickets);
router.post(
  "/createTicket",
  authMiddleware,
  createTicketValidation,
  ticketController.createTicket,
);
router.get("/:id", ticketController.getTicketById);
router.put(
  "/:id",
  updateTicketValidation,
  authMiddleware,
  ticketController.updateTicketById,
);

router.put("/updateTicketState/:id", ticketController.updateTicketStateById);

router.delete("/:id", authMiddleware, ticketController.deleteTicketById);

module.exports = router;
