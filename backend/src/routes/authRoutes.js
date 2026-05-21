const router = require("express").Router();
const authController = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.post("/logout", authController.logout);

module.exports = router;
