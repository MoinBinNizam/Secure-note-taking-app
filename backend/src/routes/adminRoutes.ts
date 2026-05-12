import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { roleCheck } from '../middleware/roleCheck.js';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/adminController.js';

const router = express.Router();

// Admin-specific routes
router.use(authenticate, roleCheck(['Admin'])); // Protect all admin routes

router.route('/users')
    .get(getAllUsers); // Get all users

router.route('/users/:id')
    .delete(deleteUser)
    .put(updateUserRole); // Add update route

export default router;
