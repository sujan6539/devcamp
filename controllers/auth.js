const auth = require("../models/User");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");

// @route POST /register
// @desc  register a user
// @access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
  const user = req.body;
  const u = await User.create(user);

  const token = getToken(res, u);

  res.status(200).send({
    msg: "Success",
    data: {
      email: user.email,
    },
  });
});

// @route  GET/login
// @desc  login a user
// @access PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Authentication Failed", 204));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Authentication Failed", 204));
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse("Authentication Failed", 204));
  }
  const token = getToken(res, user);
  res.status(200).send({
    msg: "Success",
    token: token,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  // Respond with a success message
  res.json({ message: "Logout successful" });
});

function getToken(res, user) {
  const token = user.getJWT();
  res.cookie("token", token, {
    expire: 24 * 60 * 60 * 1000,
  });
  return token;
}
