const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors');
const errorHandler = require('./middleware/error')
//load env vars
dotenv.config({path:'./config/config.env'});

//Route Files
const bootcamps = require('./routes/bootcamps')

//connect to DB
connectDB();


const app = express();

//Body Parser
app.use(express.json())

// Dev Loging middlewar
if(process.env.NODE_ENV === 'developement')
{
    app.use(morgan('dev'))
}



//Mount router
app.use('/api/v1/bootcamps',bootcamps)
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    );


    // Handle unhandeled promise rejections

    process.on('unhandledRejection', (err,promise) =>{
        console.log(`Error : ${err.message}`.red);
        //close server & exit process
        server.close(()=> process.exit(1));
    })