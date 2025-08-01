const express = require('express');
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} = require('../controllers/cars');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getCars)
  .post(protect, authorize("ADMIN"), createCar);

router.route('/:id')
  .get(getCar)
  .put(protect, authorize("ADMIN"), updateCar)
  .delete(protect, authorize("ADMIN"), deleteCar);

module.exports = router;

