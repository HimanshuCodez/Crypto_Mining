import auth from '../middleware/auth.js';
import { getBarcode,  upload,updateBarcode, submitPayment, approvePayment, rejectPayment, getPendingPayments, getAllUsers, approveMiningInvestment, getPendingMiningInvestments, getMiningInvestments, payAllInvestmentsProfit } from '../controllers/admin.js';
import express from 'express';

const router = express.Router();

router.get('/users', auth, getAllUsers);
router.get('/barcode', getBarcode);
router.post('/barcode', auth, updateBarcode);
router.post('/payments/submit', auth, upload.single('screenshot'), submitPayment); // No isAdmin for submission
router.get('/payments/pending', auth,  getPendingPayments);
router.get('/mining-investments/pending', auth, getPendingMiningInvestments);
router.get('/mining-investments', auth, getMiningInvestments);
router.post('/payments/approve/:paymentId', auth,approvePayment);
router.post('/payments/reject/:paymentId', auth,  rejectPayment);
router.post('/mining-investments/approve/:transactionId', auth, approveMiningInvestment);
router.post('/mining-investments/pay-all', auth, payAllInvestmentsProfit);

export default router;