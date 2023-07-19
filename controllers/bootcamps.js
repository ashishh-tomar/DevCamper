const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path');

// @desc GET all Bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  
    res.status(200).json(res.advancedResults);
  
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






// @desc Upload photo for a  Bootcamps
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
exports.bootcampPhotoUpload = asyncHandler( async (req, res, next) => {
  
  const bootcamp = await Bootcamp.findById(req.params.id);

  if(!bootcamp){
    return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
  }

  
  if(!req.files)
  {
    return next(new ErrorResponse(`Please upload a file}`, 404));
  }

  const file = req.files.file;

  // Make sure that the image is a photo
  if(!file.mimetype.startsWith('image'))
  {
    return next(new ErrorResponse(`Please upload a Image file`, 404));
  }
  

  // check file size
  if(file.size > process.env.MAX_FILE_UPLOAD)
  {
    return next(new ErrorResponse(`Please upload a Image file ${process.env.MAX_FILE_UPLOAD}`, 404));
  }

  // Create custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
    if(err){
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

  await Bootcamp.findByIdAndUpdate(req.params.id, { photo : file.name});

  res.status(200).json({
    success : true,
    data : file.name
  });


  });


});