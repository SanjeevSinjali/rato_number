const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { OrderCar, User, Car } = require('../models');

// @desc      Get all car orders
// @route     GET /api/v1/order-cars
// @access    Private
exports.getOrderCars = asyncHandler(async (req, res, next) => {
  const orders = await OrderCar.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Car, as: 'car' },
    ],
  });
  res.status(200).json({ success: true, data: orders });
});

// @desc      Get single car order
// @route     GET /api/v1/order-cars/:id
// @access    Private
exports.getOrderCar = asyncHandler(async (req, res, next) => {
  const order = await OrderCar.findByPk(req.params.id, {
    include: [User, Car]
  });

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  res.status(200).json({ success: true, data: order });
});

// @desc      Create new car order
// @route     POST /api/v1/order-cars
// @access    Private
exports.createOrderCar = asyncHandler(async (req, res, next) => {
  const order = await OrderCar.create(req.body);
  res.status(201).json({ success: true, data: order });
});

// @desc      Update car order
// @route     PUT /api/v1/order-cars/:id
// @access    Private
exports.updateOrderCar = asyncHandler(async (req, res, next) => {
  let order = await OrderCar.findByPk(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  await order.update(req.body);

  res.status(200).json({ success: true, data: order });
});

// @desc      Delete car order
// @route     DELETE /api/v1/order-cars/:id
// @access    Private
exports.deleteOrderCar = asyncHandler(async (req, res, next) => {
  const order = await OrderCar.findByPk(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  await order.destroy();

  res.status(200).json({ success: true, data: {} });
});

