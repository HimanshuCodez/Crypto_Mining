
import express from 'express';
import auth from '../middleware/auth.js';
import { verifyOtp } from '../controllers/otp.js';

const router = express.Router();

router.post('/verify-otp', auth, verifyOtp);

export default router;
