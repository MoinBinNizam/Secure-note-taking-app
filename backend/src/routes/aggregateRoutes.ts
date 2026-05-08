import express from 'express';
import { authenticate } from '../middleware/auth.js'; // Use .js extension for ESM
import { getUsersByInterests, getUserPosts } from '../controllers/aggregateController.js'; // Use .js extension for ESM

const router = express.Router();

// Routes for Aggregation Scenarios
router.route('/interests')
    .get(authenticate, getUsersByInterests); // Group users by interests - Requires authentication

router.route('/user-posts/:userId')
    .get(authenticate, getUserPosts); // Get posts for a specific user using $lookup - Requires authentication

export default router;
