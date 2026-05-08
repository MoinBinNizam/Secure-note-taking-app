import express from 'express';
import { authenticate } from '../middleware/auth.js'; // Use .js extension for ESM
import { roleCheck } from '../middleware/roleCheck.js'; // Use .js extension for ESM
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController.js'; // Use .js extension for ESM

const router = express.Router();

// Routes for Note management
router.route('/')
    .post(authenticate, createNote) // Create Note - Requires authentication
    .get(authenticate, getNotes); // Get all Notes (paginated) - Requires authentication

router.route('/:id')
    .put(authenticate, updateNote) // Update Note - Requires authentication, ownership/admin check within controller
    .delete(authenticate, deleteNote); // Delete Note - Requires authentication, ownership/admin check within controller

export default router;
