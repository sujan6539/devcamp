const Bootcamp = require("../models/bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let newQuery = JSON.stringify(req.query);
  newQuery = newQuery.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(newQuery));

  const bootcamps = await query;
  const limit = 1;
  let currentpage = 0;
  let pages;

  if (currentpage > 0 && currentpage < bootcamps.length) {
    pages = {
      previous: currentpage--,
      next: currentpage++,
    };
  } else if (currentpage == bootcamps.length) {
    pages = {
      previous: currentpage--,
    };
  } else {
    pages = {
      next: currentpage++,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination: pages,
    data: bootcamps,
  });
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(ErrorResponse("No such record", 401));
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = Bootcamp(req.body);
  await bootcamp.save();
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(ErrorResponse("No such record", 401));
  }
  bootcamp.save();
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse("No such record", 401));
  }
  res.status(200).json({
    success: true,
  });
});
