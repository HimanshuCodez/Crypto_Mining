
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import bcrypt from 'bcryptjs';
import { sendMail } from '../utils/mailer.js';

export const sendIncomeTransferOtp = async (req, res) => {
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

        if (sender.incomeWallet < amount) {
            return res.status(400).json({ message: 'Insufficient balance in your income wallet' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        sender.otp = otp;
        sender.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await sender.save();

        await sendMail(sender.email, 'Your OTP for Income Wallet Transfer', otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const transferToIncomeWallet = async (req, res) => {
  const { recipientReferralId, amount, transactionPassword, otp } = req.body;
  const senderId = req.user._id;

  try {
    const sender = await User.findById(senderId);

    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // 1. Validate sender's transaction password
    const isPasswordCorrect = await bcrypt.compare(transactionPassword, sender.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid transaction password' });
    }

    // 2. Validate OTP
    if (sender.otp !== otp || sender.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // 3. Find recipient by referral ID
    const recipient = await User.findOne({ referralCode: recipientReferralId });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found with this referral ID' });
    }

    // Prevent transfer to self
    if (sender._id.equals(recipient._id)) {
      return res.status(400).json({ message: 'Cannot transfer to your own wallet' });
    }

    // 4. Validate sender's income wallet balance
    if (sender.incomeWallet < amount) {
      return res.status(400).json({ message: 'Insufficient balance in your income wallet' });
    }

    // 5. Perform the transfer
    sender.incomeWallet -= amount;
    recipient.incomeWallet += amount;

    // Clear OTP after successful use
    sender.otp = undefined;
    sender.otpExpires = undefined;

    await sender.save();
    await recipient.save();

    // 6. Create transaction records
    const senderTransaction = new Transaction({
      userId: sender._id,
      amount,
      type: 'transfer_out',
      status: 'completed',
      mode: 'Income Wallet Transfer',
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

    res.status(200).json({ message: `Successfully transferred ${amount} to ${recipient.name}. Your new income wallet balance is ${sender.incomeWallet.toFixed(2)}` });
  } catch (error) {
    console.error('Error in transferToIncomeWallet controller:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};