const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc GET all Bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  
    
    let query;
    //Copy req.query
    const reqQuery = { ...req.query };


    //fields to exclude
    const removFields = ['select','sort','page','limit']

    //loop over remove fields and delet them from query
    removFields.forEach(param => delete reqQuery[param]);

    //create query string
    let queryStr = JSON.stringify(reqQuery);
    //create operatiors ($gt, $gte,etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
    //finding resource
    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    //select fields
    if(req.query.select){
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    //sort
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
    else{
      query =  query.sort('-createdAt');
    }

    //pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 25;
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //executing query
    const bootcamps = await query;

    //Pagination result
    const pagination = {};

    if(endIndex <total){
      pagination.next = {page : page+1, limit};
    }

    if(startIndex > 0){
      pagination.prev = { page : page-1, limit};
    }

    res.status(200).json({ success: true,count : bootcamps.length , pagination,data: bootcamps });
  
});

// @desc GET a single Bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: bootcamp });
  
});

// @desc Create a new Bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  
});

// @desc UPDATE a single Bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
  
  
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body, {
      new : true,
      runValidators : true
    });
  
  
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
    }
  
    res.status(200).json({success : true, data : bootcamp});
 


});

// @desc DELETE a  Bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
  
  
    const bootcamp = await Bootcamp.findById(req.params.id);
  
  
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
    }

    bootcamp.deleteOne();
  
    res.status(200).json({success : true, data : {}});
  


});
