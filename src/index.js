const express = require("express");

const User = require("./models/userModel");
const Task = require("./models/taskModel");
const app = express();

app.use(express.json());

const USER_BASE_URL = "/api/v1/users";
const TASK_BASE_URL = "/api/v1/task";

app.post(USER_BASE_URL, async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        users: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid Data",
    });
  }
});

app.get(USER_BASE_URL, async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

app.get(`${USER_BASE_URL}/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "No user with the Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

//? POST REQUEST
app.post(TASK_BASE_URL, async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tasks: newTask,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid Data",
    });
  }
});
app.get(TASK_BASE_URL, async (req, res) => {
  try {
    const task = await Task.find();

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

app.get(`${TASK_BASE_URL}/:id`, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "No user with the Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

//

module.exports = app;
