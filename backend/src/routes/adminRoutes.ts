import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { roleCheck } from '../middleware/roleCheck.js';
import { getAllUsers, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// Admin-specific routes
router.use(authenticate, roleCheck(['Admin'])); // Protect all admin routes

router.route('/users')
    .get(getAllUsers); // Get all users

router.route('/users/:id')
    .delete(deleteUser); // Delete user

export default router;
