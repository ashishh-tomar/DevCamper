// @desc GET all Bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, mgs: "show all bootcamps", hello : req.hello });
};

// @desc GET a single Bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mgs: `Show Bootcamp ${req.params.id}` });
};

// @desc Create a new Bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, mgs: "Create a bootcamps" });
};

// @desc UPDATE a single Bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mgs: `Update Bootcamp ${req.params.id}` });
};

// @desc DELETE a  Bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mgs: `Delete Bootcamp ${req.params.id}` });
};
