const express = require('express');
const {
  getDashboardStats,
  getRecentlyRentedCars
} = require('../controllers/adminDash');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, authorize("ADMIN"), getDashboardStats)

router.route('/recentCars')
  .get(protect, authorize('ADMIN'), getRecentlyRentedCars)

module.exports = router;


