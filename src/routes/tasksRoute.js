const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const auth = require("../controller/middleware/checkAuth");

router
  .route("/")
  .get(auth, taskController.getTasks)
  .post(auth, taskController.createTask);

router
  .route("/:id")
  .get(auth, taskController.getTask)
  .patch(auth, taskController.updateTask)
  .delete(auth, taskController.deleteTask);

module.exports = router;
