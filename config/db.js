const mongoose = require("mongoose");
const key = require("./config.env");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_DB);
};

module.exports = connectDB;
