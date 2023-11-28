const express = require("express");

const userRoute = require("./routes/usersRoute");
const taskRoute = require("./routes/tasksRoute");

const USER_BASE_URL = "/api/v1/users";
const TASK_BASE_URL = "/api/v1/tasks";

const app = express();
app.use(express.json());

app.use(USER_BASE_URL, userRoute);
app.use(TASK_BASE_URL, taskRoute);

const jwt = require("jsonwebtoken");

// myFunc();
module.exports = app;
