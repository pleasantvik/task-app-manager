const express = require("express");

const userRoute = require("./routes/usersRoute");
const taskRoute = require("./routes/tasksRoute");

const USER_BASE_URL = "/api/v1/users";
const TASK_BASE_URL = "/api/v1/tasks";

const app = express();
app.use(express.json());

app.use(USER_BASE_URL, userRoute);
app.use(TASK_BASE_URL, taskRoute);

const bcrypt = require("bcryptjs");

const myFunc = async () => {
  const password = "red1234";
  const hashedPassword = await bcrypt.hash(password, 8);

  const isMatch = await bcrypt.compare(password, hashedPassword);

  console.log({ isMatch });

  console.log({ hashedPassword });
  console.log({ password });
};

myFunc();
module.exports = app;
