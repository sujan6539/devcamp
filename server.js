const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
const PORTL = process.env.PORT || 3000;
const db = require("./config/db");
const connectDB = require("./config/db");
const logError = require("./middleware/logging");

dotenv.config({ path: "./config/config.env" });

// connect db
connectDB();

const bootcamps = require("./routes/bootcamps");
const user = require('./routes/auth')

app.use(express.json());

//logging middleware
if ((NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

//mount router
app.use("/api/v1/bootcamps", bootcamps);
app.use('/api/v1/user', user)

// mount error logging middleware
app.use(logError);

app.listen(
  PORTL,
  console.log(`Server running on ${process.env.NODE_ENV} : ${PORTL}`)
);
