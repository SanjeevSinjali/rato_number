const express = require("express")
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.js');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, authorize("ADMIN"), getUsers).post(protect, authorize("ADMIN"), createUser);
router.route('/:id').get(protect, authorize("ADMIN"), getUser).put(protect, authorize("ADMIN"), updateUser).delete(protect, authorize("ADMIN"), deleteUser);

module.exports = router
