
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import bcrypt from 'bcryptjs';
import { sendMail } from '../utils/mailer.js';

export const sendTransferOtp = async (req, res) => {
    const { recipientReferralId, amount } = req.body;
    const senderId = req.user._id;

    try {
        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        const recipient = await User.findOne({ referralCode: recipientReferralId });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found with this referral ID' });
        }

        if (sender.packageWallet < amount) {
            return res.status(400).json({ message: 'Insufficient balance in your package wallet' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        sender.otp = otp;
        sender.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await sender.save();

        await sendMail(sender.email, 'Your OTP for Package Wallet Transfer', otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const transferToPackageWallet = async (req, res) => {
    const { recipientReferralId, amount, transactionPassword, otp } = req.body;
    const senderId = req.user._id;

    try {
        const sender = await User.findById(senderId);

        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(transactionPassword, sender.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid transaction password' });
        }

        if (sender.otp !== otp || sender.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const recipient = await User.findOne({ referralCode: recipientReferralId });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found with this referral ID' });
        }

        if (sender._id.equals(recipient._id)) {
            return res.status(400).json({ message: 'Cannot transfer to your own wallet' });
        }

        if (sender.packageWallet < amount) {
            return res.status(400).json({ message: 'Insufficient balance in your package wallet' });
        }

        sender.packageWallet -= amount;
        recipient.packageWallet += amount;

        sender.otp = undefined;
        sender.otpExpires = undefined;

        await sender.save();
        await recipient.save();

        const senderTransaction = new Transaction({
            userId: sender._id,
            amount,
            type: 'transfer_out',
            status: 'completed',
            mode: 'Package Wallet Transfer',
            counterparty: `${recipient.name} (${recipient.referralCode})`,
        });
        await senderTransaction.save();

        const recipientTransaction = new Transaction({
            userId: recipient._id,
            amount,
            type: 'transfer_in',
            status: 'completed',
            mode: 'Received',
            counterparty: `${sender.name} (${sender.referralCode})`,
        });
        await recipientTransaction.save();

        res.status(200).json({ message: `Successfully transferred ${amount} to ${recipient.name}. Your new package wallet balance is ${sender.packageWallet.toFixed(2)}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
