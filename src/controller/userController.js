const User = require("../models/userModel");

const getUsers = async (req, res) => {
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
};

const getMe = async (req, res) => {
  // res.status(200).json({
  //   data: {
  //     user: req.user,
  //   },
  // });

  res.send(req.user);
};

const getUser = async (req, res) => {
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
};
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await newUser.generateAuthToken();

    res.status(201).json({
      status: "success",
      data: {
        users: newUser,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const updatesKey = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "password", "email"];

  const isValidOperation = updatesKey.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid Update",
    });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "No user with the Id",
      });
    }
    updatesKey.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    //? Can't use  findByIdAndUpdate because it skips the pre middleware on schema
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

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
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "No user with the Id",
      });
    }

    // console.log(req.user);
    // await req.user.remove();

    res.status(200).json({
      status: "user deleted successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.status(200).json({
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  console.log(req.user.tokens);
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};
const logoutAll = async (req, res) => {
  console.log(req.user.tokens);
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).json({
      message: "Logout successful from all devices",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  createUser,
  login,
  deleteUser,
  getMe,
  logout,
  logoutAll,
};
