const asyncHandler = require("../middleware/async");
const { OrderCar, Car } = require("../models")

exports.rentCar = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'User not logged in'
    });
  }
  const userId = req.user.id;
  const { carId, rentStartDate, rentEndDate, pickupLocation, dropLocation, totalPrice } = req.body;
  const car = await Car.findByPk(carId);

  if (!car) throw new Error('Car not found');

  if (car.status !== 'AVAILABLE') {
    throw new Error('Car is not available for rent');
  }

  // Create rental order
  const order = await OrderCar.create({
    userId,
    carId,
    rentStartDate,
    rentEndDate,
    totalPrice,
    pickupLocation,
    dropLocation,
    status: 'RENTED'
  });

  // Update car status
  car.status = 'RENTED';
  await car.save();

  return res.status(200).json({ success: true, data: order });
})

