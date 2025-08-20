import express from 'express';
import { getProfile, updateProfile, updateAvatar } from '../controllers/user.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile); 
router.put('/avatar', auth, updateAvatar); 

export default router;
