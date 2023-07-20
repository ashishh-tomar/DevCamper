const User = require("../models/User");
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const sendEmail = require('../utils/sendEmail');

// @desc Get All Users
// @route GET /api/v1/auth/users
// @access Private/admin

exports.getUsers = asyncHandler( async(req,res)=>{
    res.status(200).json(res.advancedResults);
});




// @desc Get a single Users
// @route GET /api/v1/auth/users/:id
// @access Private/admin

exports.getUser = asyncHandler( async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success : true,
        data : user
    });
});



// @desc Create User
// @route POST /api/v1/auth/users
// @access Private/admin

exports.createUser = asyncHandler( async(req,res)=>{
    const user = await User.create(req.body);
    res.status(201).json({
        success : true,
        data : user
    });
});




// @desc Update User
// @route PUT /api/v1/auth/users/:id
// @access Private/admin

exports.updateUser = asyncHandler( async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    });


    res.status(200).json({
        success : true,
        data : user
    });
});



// @desc Delete User
// @route DELETE /api/v1/auth/users/:id
// @access Private/admin

exports.deleteUser = asyncHandler( async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);


    res.status(200).json({
        success : true,
        data : {}
    });
});









