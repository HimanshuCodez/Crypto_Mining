import auth, { isAdmin } from '../middleware/auth.js';
import { getBarcode,  upload,updateBarcode, submitPayment, approvePayment, rejectPayment, getPendingPayments, getAllUsers, approveMiningInvestment, getPendingMiningInvestments, getMiningInvestments, payAllInvestmentsProfit, getPaymentStatus } from '../controllers/admin.js';
import express from 'express';

const router = express.Router();

router.get('/users', auth, isAdmin, getAllUsers);
router.get('/barcode', auth, isAdmin, getBarcode);
router.post('/barcode', auth, isAdmin, updateBarcode);
router.post('/payments/submit', auth, upload.single('screenshot'), submitPayment);
router.get('/payments/pending', auth, isAdmin,  getPendingPayments);
router.get('/payments/status/:userId', auth, isAdmin, getPaymentStatus);
router.get('/mining-investments/pending', auth, isAdmin, getPendingMiningInvestments);
router.get('/mining-investments', auth, isAdmin, getMiningInvestments);
router.post('/payments/approve/:paymentId', auth, isAdmin,approvePayment);
router.post('/payments/reject/:paymentId', auth, isAdmin,  rejectPayment);
router.post('/mining-investments/approve/:transactionId', auth, isAdmin, approveMiningInvestment);
router.post('/mining-investments/pay-all', auth, isAdmin, payAllInvestmentsProfit);

export default router;

