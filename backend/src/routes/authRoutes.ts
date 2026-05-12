import { Router } from 'express';
import { register, login, updateInterests } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/interests', authenticate, updateInterests);

export default router;
