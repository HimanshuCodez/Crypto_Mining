import express from 'express';
import { sendOtp, activateAccount, getDashboardData, getProfile, updateProfile, updateAvatar, getDirectReferrals, getIndirectReferrals, getTransactions, getAllTransactions, getReceivedTransactions, getUserCount, sendTransferOtp, updateWallet, getWallets } from '../controllers/user.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId/dashboard', auth, getDashboardData);
router.get('/profile', auth, getProfile);
router.get('/count', auth, getUserCount);
router.get('/referrals/direct', auth, getDirectReferrals);
router.get('/indirect-referrals', auth, getIndirectReferrals);
router.get('/transactions', auth, getTransactions);
router.get('/all-transactions', auth, getAllTransactions);
router.get('/received-transactions', auth, getReceivedTransactions);
router.put('/profile', auth, updateProfile); 
router.put('/avatar', auth, updateAvatar); 
router.post('/send-otp', auth, sendOtp);
router.post('/send-transfer-otp', auth, sendTransferOtp);
router.post('/activate', auth, activateAccount);
router.post('/wallet', auth, updateWallet);
router.get('/wallets', auth, getWallets);

export default router;