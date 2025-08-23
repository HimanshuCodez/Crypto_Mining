import express from 'express';
import { getProfile, updateProfile, updateAvatar, getUserCount, getDashboardData, getDirectReferrals, getIndirectReferrals, sendOtp, activateAccount } from '../controllers/user.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId/dashboard', auth, getDashboardData);
router.get('/profile', auth, getProfile);
router.get('/count', auth, getUserCount);
router.get('/referrals/direct', auth, getDirectReferrals);
router.get('/referrals/indirect', auth, getIndirectReferrals);
router.put('/profile', auth, updateProfile); 
router.put('/avatar', auth, updateAvatar); 
router.post('/send-otp', auth, sendOtp);
router.post('/activate', auth, activateAccount);

export default router;