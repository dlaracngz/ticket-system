const router = require("express").Router();
const userController = require("../controllers/userController");

const { updateUserValidation } = require("../validations/userValidation");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", updateUserValidation, userController.updateByUserId);
router.delete("/:id", userController.deleteUser);
router.get("/admins", userController.getAdmins);

module.exports = router;
