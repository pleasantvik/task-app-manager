const Task = require("../src/models/taskModel");
const createTask = async (req, res) => {
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
};
const getTasks = async (req, res) => {
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
};

const getTask = async (req, res) => {
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
};
const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid Update",
    });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
};
