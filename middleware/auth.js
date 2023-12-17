const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return next(new ErrorResponse("not authorized", 401));
  }

  const token = auth.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err) => {
    if (err) {
      return next(new ErrorResponse("not authorized", 401));
    }
  });
  req.user = await User.findById(decoded.id);
  next();
});

module.exports = auth;
