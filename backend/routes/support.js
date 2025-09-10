import express from 'express';
import auth, { isAdmin } from '../middleware/auth.js';
import { createTicket, getAllTickets, updateTicketStatus, sendSupportOtp } from '../controllers/support.js';

const router = express.Router();

// User routes
router.post('/tickets', auth, createTicket);
router.post('/send-otp', auth, sendSupportOtp);

// Admin routes
router.get('/tickets', auth, isAdmin, getAllTickets);
router.patch('/tickets/:id/status', auth, isAdmin, updateTicketStatus);

export default router;
