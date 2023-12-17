const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const blackListedToken = new Set();

const auth = asyncHandler(async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return next(new ErrorResponse("not authorized", 401));
  }

  const token = auth.split(" ")[1];

  if (blackListedToken.has(token)) {
    return next(new ErrorResponse("not authorized. Outdated token.", 401));
  }
  console.log(req._parsedUrl.pathname)
  if (req._parsedUrl.pathname.includes('/logout')) {
    console.log("logout called.");
    blackListedToken.add(token);
    console.log(blackListedToken.size)
    return next()
  }

  const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  console.log(decoded);
  req.user = await User.findById(decoded.id);
  next();
});

module.exports = auth;
