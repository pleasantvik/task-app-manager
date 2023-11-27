const express = require("express");

const User = require("./models/userModel");
const Task = require("./models/taskModel");
const taskController = require("../controller/taskController");
const userController = require("../controller/userController");
const app = express();

app.use(express.json());

const USER_BASE_URL = "/api/v1/users";
const TASK_BASE_URL = "/api/v1/tasks";

app.post(USER_BASE_URL, userController.createUser);
app.get(USER_BASE_URL, userController.getUsers);
app.get(`${USER_BASE_URL}/:id`, userController.getUser);
app.patch(`${USER_BASE_URL}/:id`, userController.updateUser);
app.patch(`${USER_BASE_URL}/:id`, userController.deleteUser);

//? POST REQUEST
app.post(TASK_BASE_URL, taskController.createTask);
app.get(TASK_BASE_URL, taskController.getTasks);

app.get(`${TASK_BASE_URL}/:id`, taskController.getTask);
app.patch(`${TASK_BASE_URL}/:id`, taskController.updateTask);
app.delete(`${TASK_BASE_URL}/:id`, taskController.deleteTask);

//

module.exports = app;
