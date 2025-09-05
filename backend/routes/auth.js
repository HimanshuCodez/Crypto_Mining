import express from 'express';
import { signup, login, logout, getReferrerName } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/referrer/:referralCode', getReferrerName);

export default router;
