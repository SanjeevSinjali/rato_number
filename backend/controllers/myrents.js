const asyncHandler = require('../middleware/async');
const { OrderCar, Car } = require('../models');

// @desc    Get all rentals for logged-in user
// @route   GET /api/v1/rentals/my
// @access  Private
exports.getMyRents = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Fetch all orders for this user with car details
  const orders = await OrderCar.findAll({
    where: { userId },
    include: [
      {
        model: Car,
        as: 'car',
        attributes: ['name', 'brand', 'price', 'image'],
      },
    ],
    order: [['rentStartDate', 'DESC']], // most recent first
  });

  // Format response
  const formattedOrders = orders.map((order) => ({
    id: order.id,
    carName: order.car.name,
    carBrand: order.car.brand,
    carPrice: order.car.price,
    rentStartDate: order.rentStartDate,
    rentEndDate: order.rentEndDate,
    totalPrice: order.totalPrice,
    status: order.status,
    image: order.car.image,
  }));

  res.status(200).json({
    success: true,
    count: formattedOrders.length,
    data: formattedOrders,
  });
});

