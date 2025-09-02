
import express from 'express';
import auth from '../middleware/auth.js';
import { transferToPackageWallet, sendTransferOtp } from '../controllers/packageTransfer.js';

const router = express.Router();

router.post('/send-otp', auth, sendTransferOtp);
router.post('/to-package-wallet', auth, transferToPackageWallet);

export default router;
