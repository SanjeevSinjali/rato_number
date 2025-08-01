const express = require('express');
const { protect } = require('../middleware/auth');
const { getMyRents } = require('../controllers/myrents');

const router = express.Router();

router.get('/', protect, getMyRents);

module.exports = router;

