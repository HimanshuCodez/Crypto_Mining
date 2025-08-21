import express from 'express';
import { getProfile, updateProfile, updateAvatar, getUserCount } from '../controllers/user.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.get('/count', auth, getUserCount);
router.put('/profile', auth, updateProfile); 
router.put('/avatar', auth, updateAvatar); 

export default router;
