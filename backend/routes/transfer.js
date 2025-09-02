import express from 'express';
import auth from '../middleware/auth.js';
import { transferToIncomeWallet, sendIncomeTransferOtp } from '../controllers/transfer.js';

const router = express.Router();

router.post('/to-income-wallet', auth, transferToIncomeWallet);
router.post('/send-otp', auth, sendIncomeTransferOtp);

export default router;
