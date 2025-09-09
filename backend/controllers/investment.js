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
        const payer = await User.findById(req.user.id).populate('directReferrals');
        const beneficiary = await User.findOne({ referralCode: userId });

        if (!payer) {
            return res.status(404).json({ message: 'Payer not found' });
        }
        if (!beneficiary) {
            return res.status(404).json({ message: 'Beneficiary user not found' });
        }

        // --- DEBUG LOGGING ---
        console.log('--- OTP Validation Debug ---');
        console.log('Time:', new Date());
        console.log('Payer OTP from DB:', payer.otp);
        console.log('OTP from Request:', otp);
        console.log('Payer OTP Expires At:', payer.otpExpires);
        console.log('Is OTP expired?:', payer.otpExpires < Date.now());
        console.log('--- End Debug ---');
        // --- END DEBUG LOGGING ---

        // Security Check: Ensure beneficiary is the user themselves or a direct referral
        const isOwnUser = payer._id.equals(beneficiary._id);
        const isDirectReferral = payer.directReferrals.some(ref => ref._id.equals(beneficiary._id));

        if (!isOwnUser && !isDirectReferral) {
            return res.status(403).json({ message: 'You can only invest for yourself or your direct referrals.' });
        }

        // Validate OTP (against the payer)
        if (payer.otp !== otp || payer.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // --- Perform Transaction ---
        // 1. Debit payer's wallet
        const investmentAmount = parseFloat(amount);
        const walletProperty = walletType === 'package' ? 'packageWallet' : 'incomeWallet';
        payer[walletProperty] -= investmentAmount;
        payer.otp = undefined;
        payer.otpExpires = undefined;

        // 2. Credit beneficiary's investment
        beneficiary.miningInvestment += investmentAmount;

        // 3. Create transaction record for the beneficiary
        const transaction = new Transaction({
            userId: beneficiary._id,
            amount: investmentAmount,
            type: 'investment',
            description: `Investment from ${walletType} wallet by ${payer.name} (${payer.referralCode})`,
        });

        await payer.save();
        await beneficiary.save();
        await transaction.save();

        res.status(200).json({ message: 'Investment successful', user: payer }); // Return the updated payer object
    } catch (error) {
        console.error('Error processing investment:', error);
        res.status(500).json({ message: 'Investment failed due to server error.' });
    }
};

export const investFromPackage = (req, res) => processInvestment(req, res, 'package');
export const investFromIncome = (req, res) => processInvestment(req, res, 'income');
