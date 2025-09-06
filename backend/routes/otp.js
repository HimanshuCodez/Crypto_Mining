import express from 'express';
import auth from '../middleware/auth.js';
import { verifyOtp, sendWithdrawalOtp, sendWalletOtp } from '../controllers/otp.js';

const router = express.Router();

router.post('/verify-otp', auth, verifyOtp);
router.post('/send-withdrawal-otp', auth, sendWithdrawalOtp);
router.post('/send-wallet-otp', auth, sendWalletOtp);

export default router;