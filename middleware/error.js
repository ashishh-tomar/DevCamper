const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err,req,res,next) => {
    
    let error = {...err};
    error.message = err.message;


    //log to console dev
    console.log(err.stack.red);

   

    //Mongoose Bad ObjectId
    if(err.name === 'CastError')
    {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }


    //Mongoose duplicate key

    if(err.code === 11000)
    {
        const message = 'Duplicates Fieled Value Entered';
        error = new ErrorResponse(message,400);
    }


    // Mongoose Validation Error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success : false,
        error : error.message || 'Server Error'
    });
}


module.exports = errorHandler;