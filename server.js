const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors');
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp')
const cors = require('cors')

//load env vars
dotenv.config({path:'./config/config.env'});

//Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
//connect to DB
connectDB();


const app = express();

//Body Parser
app.use(express.json())


//cookie Parser
app.use(cookieParser());

// Dev Loging middlewar
if(process.env.NODE_ENV === 'developement')
{
    app.use(morgan('dev'))
}


//File uploading
app.use(fileupload());

//Sanitize data 
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//Prevent cross site scripting attacks (xss)
app.use(xss());

//Rate limiting
const limiter = rateLimit({
    windowMs : 10 *60 * 100, // 10 minutes
    max : 100
});

app.use(limiter);

//Prevent http param polution
app.use(hpp());

//Enable CORS
app.use(cors());







//set static folder
app.use(express.static(path.join(__dirname,'public')));



//Mount router
app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses)
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/reviews',reviews);
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