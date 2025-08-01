const express = require('express');
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} = require('../controllers/cars');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(getCars)
  .post(upload.single("image"), protect, authorize("ADMIN"), createCar);

router.route('/:id')
  .get(getCar)
  .put(protect, updateCar)
  .delete(protect, authorize("ADMIN"), deleteCar);

module.exports = router;

