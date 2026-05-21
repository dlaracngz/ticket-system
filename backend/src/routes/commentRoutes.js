const router = require("express").Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCommentValidation,
  updateCommentValidation,
} = require("../validations/commentValidation");

router.get("/", commentController.getAllComments);
router.post(
  "/createComment",
  authMiddleware,
  createCommentValidation,
  commentController.createComment,
);
router.get("/:id", commentController.getCommentsByTicketId);
router.put(
  "/:id",
  authMiddleware,
  updateCommentValidation,
  commentController.updateComment,
);
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
