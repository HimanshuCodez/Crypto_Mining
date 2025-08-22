import auth from '../middleware/auth.js';
import { getBarcode,  upload,updateBarcode, submitPayment, approvePayment, rejectPayment, getPendingPayments, getAllUsers } from '../controllers/admin.js';
import express from 'express';

const router = express.Router();

router.get('/users', auth, getAllUsers);
router.get('/barcode', getBarcode);
router.post('/barcode', auth, updateBarcode);
router.post('/payments/submit', auth, upload.single('screenshot'), submitPayment); // No isAdmin for submission
router.get('/payments/pending', auth,  getPendingPayments);
router.post('/payments/approve/:paymentId', auth,approvePayment);
router.post('/payments/reject/:paymentId', auth,  rejectPayment);

export default router;