const express = require('express');
const {
  rentCar
} = require('../controllers/rent.js');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, rentCar);

module.exports = router;


