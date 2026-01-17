const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  currentUser,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/login").post(loginUser);

router.route("/register").post(registerUser);

router.route("/current").get(validateToken, currentUser);

module.exports = router;
