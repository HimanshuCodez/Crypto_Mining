import auth, { isAdmin } from '../middleware/auth.js';
import { getBarcode,  upload,updateBarcode, submitPayment, approvePayment, rejectPayment, getPendingPayments } from '../controllers/admin.js';
import express from 'express';

const router = express.Router();

router.get('/barcode', getBarcode);
router.post('/barcode', auth, isAdmin, updateBarcode);
router.post('/payments/submit', auth, upload.single('screenshot'), submitPayment); // No isAdmin for submission
router.get('/payments/pending', auth, isAdmin, getPendingPayments);
router.post('/payments/approve/:paymentId', auth, isAdmin, approvePayment);
router.post('/payments/reject/:paymentId', auth, isAdmin, rejectPayment);

export default router;