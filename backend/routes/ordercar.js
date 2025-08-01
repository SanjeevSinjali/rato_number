const express = require('express');
const {
  getOrderCars,
  getOrderCar,
  createOrderCar,
  updateOrderCar,
  deleteOrderCar,
  getRentedCars
} = require('../controllers/OrderCar');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getOrderCars)
  .post(protect, createOrderCar);

router.route('/rentedAll').get(protect, getRentedCars)

router.route('/:id')
  .get(protect, getOrderCar)
  .put(protect, updateOrderCar)
  .delete(protect, deleteOrderCar);

module.exports = router;

