import { Router } from 'express';
import { register, login, updateInterests, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.patch('/interests', authenticate, updateInterests);

export default router;
