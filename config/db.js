const mongoose = require("mongoose");
const key = require('./config.env')

const connectDB = () => {
    console.log(process.env.MONGO_DB)
    mongoose.connect(process.env.MONGO_DB)
};


module.exports = connectDB