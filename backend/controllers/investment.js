import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { sendMail } from '../utils/mailer.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendInvestmentOtp = async (req, res) => {
  const { userId, transactionPassword, amount, walletType } = req.body;
  const investingUser = await User.findById(req.user.id);

  if (!investingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Validate transaction password
  const isMatch = await bcrypt.compare(transactionPassword, investingUser.transactionPassword);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid transaction password' });
  }

  // Validate wallet balance
  const balance = walletType === 'package' ? investingUser.packageWallet : investingUser.incomeWallet;
  if (balance < parseFloat(amount)) {
    return res.status(400).json({ message: `Insufficient ${walletType} wallet balance` });
  }

  // Generate and save OTP
  const otp = generateOTP();
  investingUser.otp = otp;
  investingUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await investingUser.save();

  try {
    await sendMail(investingUser.email, 'Your Investment OTP', otp);
    res.status(200).json({ message: 'OTP sent to your registered email' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

const processInvestment = async (req, res, walletType) => {
    try {
        const { userId, amount, otp } = req.body;
        const investingUser = await User.findOne({ referralCode: userId });

        if (!investingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate OTP
        if (investingUser.otp !== otp || investingUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const investmentAmount = parseFloat(amount);

        // Validate wallet balance again as a safeguard
        const balance = walletType === 'package' ? investingUser.packageWallet : investingUser.incomeWallet;
        if (balance < investmentAmount) {
            return res.status(400).json({ message: `Insufficient ${walletType} wallet balance` });
        }

        // Update wallet and create transaction
        if (walletType === 'package') {
            investingUser.packageWallet -= investmentAmount;
        } else {
            investingUser.incomeWallet -= investmentAmount;
        }
        investingUser.miningInvestment += investmentAmount;

        const transaction = new Transaction({
            userId: investingUser._id,
            amount: investmentAmount,
            type: 'investment',
            description: `Investment from ${walletType} wallet`,
        });

        investingUser.otp = undefined;
        investingUser.otpExpires = undefined;

        await investingUser.save();
        await transaction.save();

        res.status(200).json({ message: 'Investment successful', user: investingUser });
    } catch (error) {
        console.error('Error processing investment:', error);
        res.status(500).json({ message: 'Investment failed due to server error.' });
    }
};

export const investFromPackage = (req, res) => processInvestment(req, res, 'package');
export const investFromIncome = (req, res) => processInvestment(req, res, 'income');
