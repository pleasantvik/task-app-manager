const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const checkAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    console.log(req.user, "REQUEST");
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
      status: "failed",
      errorMessage: "Please authenticate",
    });
  }
};

module.exports = checkAuth;
