const express = require("express");
const userController = require("../controller/userController");

const authMiddleware = require("../controller/middleware/checkAuth");

const router = express.Router();

router.route("/me").get(authMiddleware, userController.getMe);

router
  .route("/")
  .get(authMiddleware, userController.getUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(authMiddleware, userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Logging in user route

router.route("/login").post(userController.login);

module.exports = router;
