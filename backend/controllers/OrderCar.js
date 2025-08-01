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


exports.getRentedCars = asyncHandler(async (req, res, next) => {
  try {
    // Find all orders where status is RENTED
    const rentedOrders = await OrderCar.findAll({
      where: {
        status: 'RENTED',
      },
      include: [
        {
          model: Car,
          as: 'car',
          attributes: ['name', 'price'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['fullName'],
        },
      ],
    });

    // Map to the desired response format
    const response = rentedOrders.map(order => ({
      id: order.id,
      name: order.car.name,
      totalPrice: parseFloat(order.totalPrice),
      bookedBy: order.user.fullName,
      rentStartDate: order.rentStartDate,
      rentEndDate: order.rentEndDate,
    }));

    res.json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
})
