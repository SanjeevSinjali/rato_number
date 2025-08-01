import express from 'express';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, authorize("ADMIN"), getUsers).post(protect, authorize("ADMIN"), createUser);
router.route('/:id').get(protect, authorize("ADMIN"), getUser).put(protect, authorize("ADMIN"), updateUser).delete(protect, authorize("ADMIN"), deleteUser);

export default router;

