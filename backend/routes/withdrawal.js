import express from 'express';
import auth from '../middleware/auth.js';
import { createWithdrawal, getWithdrawals, updateWithdrawalStatus, deleteWithdrawal, withdrawFromMining, getMiningWithdrawals, getAllUserWithdrawals } from '../controllers/withdrawal.js';

const router = express.Router();

router.post('/', auth, createWithdrawal);
router.get('/', auth, getWithdrawals);
router.post('/mining', auth, withdrawFromMining);
router.get('/mining', auth, getMiningWithdrawals);
router.get('/all', auth, getAllUserWithdrawals);
router.put('/:id/status', auth, updateWithdrawalStatus);
router.delete('/:id', auth, deleteWithdrawal);

export default router;
