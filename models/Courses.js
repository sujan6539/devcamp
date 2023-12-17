const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, " title is required"],
  },
  weeks: {
    type: Number,
    required: [true, " weeks is required"],
  },
  tuition: {
    type: Number,
    required: [true, " tuition is required"],
  },
  scholarshipsAvailable:{
    type: Boolean,
  default: false,
  enum: [true, false]},
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref : 'user'
  }, 
  bootcampId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref : 'bootcamp'
  }
});

module.exports = mongoose.model("courses", CourseSchema);
