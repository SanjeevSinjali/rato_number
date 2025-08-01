const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { Car } = require('../models');

// @desc      Get all cars
// @route     GET /api/v1/cars
// @access    Public or Private (depending on your needs)
exports.getCars = asyncHandler(async (req, res, next) => {
  const cars = await Car.findAll();
  res.status(200).json({ success: true, data: cars });
});

// @desc      Get single car
// @route     GET /api/v1/cars/:id
// @access    Public or Private
exports.getCar = asyncHandler(async (req, res, next) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return next(new ErrorResponse('Car not found', 404));
  }

  res.status(200).json({ success: true, data: car });
});

// @desc      Create new car
// @route     POST /api/v1/cars
// @access    Private (admin)
exports.createCar = asyncHandler(async (req, res, next) => {
  let carData = req.body;

  if (req.file) {
    carData.image = `/images/${req.file.filename}`;
  }

  const car = await Car.create(carData);
  res.status(201).json({ success: true, data: car });

});

// @desc      Update car
// @route     PUT /api/v1/cars/:id
// @access    Private (admin)
exports.updateCar = asyncHandler(async (req, res, next) => {
  let car = await Car.findByPk(req.params.id);

  if (!car) {
    return next(new ErrorResponse('Car not found', 404));
  }

  await car.update(req.body);
  res.status(200).json({ success: true, data: car });
});

// @desc      Delete car
// @route     DELETE /api/v1/cars/:id
// @access    Private (admin)
exports.deleteCar = asyncHandler(async (req, res, next) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return next(new ErrorResponse('Car not found', 404));
  }

  await car.destroy();
  res.status(200).json({ success: true, data: {} });
});

