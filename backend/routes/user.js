import express from 'express';
import { getProfile } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getProfile);

export default router;
