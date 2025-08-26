import express from 'express';
import auth from '../middleware/auth.js';
import { sendInvestmentOtp, investFromPackage, investFromIncome } from '../controllers/investment.js';

const router = express.Router();

// The frontend was calling /api/investment/send-otp, so we map it here
router.post('/send-otp', auth, sendInvestmentOtp);

// The frontend was calling /api/investment/invest-from-package
router.post('/invest-from-package', auth, investFromPackage);

// We add the corresponding route for the income wallet
router.post('/invest-from-income', auth, investFromIncome);

export default router;
