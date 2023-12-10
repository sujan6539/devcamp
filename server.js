const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const app = express();
const PORTL = process.env.PORT || 3000;
const bootcamps = require("./routes/bootcamps");

dotenv.config({ path: "./config/config.env" });

//logging middleware
if(NODE_ENV = 'development'){
    app.use(morgan('dev'))
}

//mount router
app.use("/api/v1/bootcamps", bootcamps);

app.listen(
  PORTL,
  console.log(`Server running on ${process.env.NODE_ENV} : ${PORTL}`)
);
