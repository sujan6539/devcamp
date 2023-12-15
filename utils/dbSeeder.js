const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const config = require("../config/config.env");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

// read json file
const readFile = fs.readFileSync(
  path.join(__dirname, "../", "data", "bootcamp.json")
);

// connect db
mongoose.connect(process.env.MONGO_DB);

// mongoose schema
const Bootcamp = require('../models/bootcamp');

const bootcamps = JSON.parse(readFile)


const importData = async () =>{
    try {
        await Bootcamp.create(bootcamps)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deleteData = async () =>{
    try {
        await Bootcamp.deleteMany();
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] == '-i'){
    importData()
}else if(process.argv[2] == '-d'){
    deleteData()
}




