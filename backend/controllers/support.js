import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { sendMail } from '../utils/mailer.js';

// Function to generate a unique ticket ID
const generateTicketId = async () => {
    const count = await Ticket.countDocuments({});
    const ticketId = `#TK${(count + 1).toString().padStart(3, '0')}`;
    return ticketId;
};

// Controller to send OTP for support actions
export const sendSupportOtp = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendMail(user.email, 'Your Support Action OTP', `Your OTP is ${otp}`);
        res.status(200).json({ message: 'OTP sent successfully to your email.' });
    } catch (error) {
        console.error('Error sending support OTP:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to create a new ticket
export const createTicket = async (req, res) => {
    const { category, subject, message, transactionPassword, otp } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).select('+transactionPassword');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 1. Validate transaction password
        const isPasswordCorrect = await bcrypt.compare(transactionPassword, user.transactionPassword);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid transaction password' });
        }

        // 2. Validate OTP
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // 3. Generate a unique ticket ID
        const ticketId = await generateTicketId();

        // 4. Create and save the new ticket
        const newTicket = new Ticket({
            userId,
            ticketId,
            category,
            subject,
            message,
        });

        // Clear OTP after use
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        await newTicket.save();
        res.status(201).json({ message: 'Support ticket created successfully', ticket: newTicket });

    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for admins to get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for admins to update a ticket's status
export const updateTicketStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket status updated successfully', ticket });
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
