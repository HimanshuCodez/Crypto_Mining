import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const createWithdrawal = async (req, res) => {
  const { amount, walletAddress, otp } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (user.incomeWallet < amount) {
      return res.status(400).json({ message: 'Insufficient income wallet balance' });
    }

    user.incomeWallet -= amount;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const transaction = new Transaction({
      userId,
      amount,
      walletAddress,
      type: 'withdrawal',
      status: 'pending',
    });

    await transaction.save();

    res.status(201).json({ message: 'Withdrawal request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Transaction.find({ type: 'withdrawal' }).populate('userId', 'name');
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateWithdrawalStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const withdrawal = await Transaction.findById(id);

    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }

    if (status === 'rejected') {
        const user = await User.findById(withdrawal.userId);
        user.incomeWallet += withdrawal.amount;
        await user.save();
    }

    withdrawal.status = status;
    await withdrawal.save();

    res.json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteWithdrawal = async (req, res) => {
  const { id } = req.params;

  try {
    const withdrawal = await Transaction.findById(id);

    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }

    if (withdrawal.status !== 'rejected') {
        const user = await User.findById(withdrawal.userId);
        user.incomeWallet += withdrawal.amount;
        await user.save();
    }

    await withdrawal.remove();

    res.json({ message: 'Withdrawal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const withdrawFromMining = async (req, res) => {
    const { amount, walletAddress, password, otp } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.transactionPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid transaction password' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (user.miningInvestment < amount) {
            return res.status(400).json({ message: 'Insufficient mining investment balance' });
        }

        const fee = amount * 0.20;
        const finalAmount = amount - fee;

        user.miningInvestment -= amount;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const transaction = new Transaction({
            userId,
            amount: finalAmount,
            walletAddress,
            type: 'mining_withdrawal',
            status: 'completed', // As per requirement, this is a direct withdrawal
        });

        await transaction.save();

        res.status(201).json({ message: 'Withdrawal from mining investment successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMiningWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Transaction.find({ type: 'mining_withdrawal', userId: req.user.id });
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllUserWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Transaction.find({ 
            type: { $in: ['withdrawal', 'mining_withdrawal'] },
            userId: req.user.id 
        });
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
