import express from 'express';
import auth from '../middleware/auth.js';
import { verifyOtp, sendWithdrawalOtp, sendWalletOtp, sendIncomeWithdrawalOtp } from '../controllers/otp.js';

const router = express.Router();

router.post('/verify-otp', auth, verifyOtp);
router.post('/send-withdrawal-otp', auth, sendWithdrawalOtp);
router.post('/send-wallet-otp', auth, sendWalletOtp);
router.post('/send-income-withdrawal-otp', auth, sendIncomeWithdrawalOtp);

export default router;