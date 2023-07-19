const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// load env vars

dotenv.config({ path: "./config/config.env" });

//Load models
const Bootcamp = require("./models/Bootcamp");
const Course = require('./models/Course')

//connect DB

mongoose.connect(process.env.MONGO_URI);


//Read JSON Files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));


//Import into DB

const importData = async()=>{
    try{
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log("data Imported..".green.inverse)
    }
    catch(err){
        console.error(err);
    }
}

//Delete Data
const deleteData = async()=>{
    try{
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log("data destroyed!!..".red.inverse)
    }
    catch(err){
        console.error(err);
    }
}


if(process.argv[2] === '-i'){
    importData();
}
else if(process.argv[2] === '-d'){
    deleteData();
}