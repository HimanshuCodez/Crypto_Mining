import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Setting from '../models/Setting.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Uploads will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to original file name
  },
});

export const upload = multer({ storage: storage });

export const getBarcode = async (req, res) => {
  try {
    const barcodeSetting = await Setting.findOne({ key: 'barcodeUrl' });
    if (barcodeSetting) {
      res.status(200).json({ barcodeUrl: barcodeSetting.value });
    } else {
      res.status(200).json({ barcodeUrl: '' });
    }
  } catch (error) {
    console.error('Error getting barcode:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateBarcode = async (req, res) => {
  try {
    const { barcodeUrl } = req.body;
    await Setting.findOneAndUpdate({ key: 'barcodeUrl' }, { value: barcodeUrl }, { upsert: true });
    res.status(200).json({ message: 'Barcode updated successfully' });
  } catch (error) {
    console.error('Error updating barcode:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const submitPayment = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { amount, userId } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;

    if (!amount || !userId || !screenshot) {
      return res.status(400).json({ message: 'Amount, user ID, and screenshot are required.' });
    }

    const newTransaction = new Transaction({
      userId,
      amount,
      type: 'deposit',
      status: 'pending',
      screenshotUrl: screenshot, // Assuming you add screenshotUrl to your Transaction model
    });

    await newTransaction.save();

    res.status(200).json({ message: 'Payment submitted successfully', transaction: newTransaction });
  } catch (error) {
    console.error('Error submitting payment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const transaction = await Transaction.findById(paymentId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not pending' });
    }

    transaction.status = 'completed';
    await transaction.save();

    const user = await User.findById(transaction.userId);
    if (user) {
      user.packageWallet += transaction.amount;
      await user.save();
    }

    res.status(200).json({ message: 'Payment approved successfully' });
  } catch (error) {
    console.error('Error approving payment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const rejectPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const transaction = await Transaction.findById(paymentId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not pending' });
    }

    transaction.status = 'rejected';
    await transaction.save();

    res.status(200).json({ message: 'Payment rejected successfully' });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await Transaction.find({ status: 'pending', type: 'deposit' }).populate('userId');
    res.status(200).json(pendingPayments);
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPendingMiningInvestments = async (req, res) => {
  try {
    const pendingInvestments = await Transaction.find({ status: 'pending', type: 'investment' }).populate('userId');
    res.status(200).json(pendingInvestments);
  } catch (error) {
    console.error('Error fetching pending mining investments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMiningInvestments = async (req, res) => {
  try {
    const investments = await Transaction.find({ type: 'investment' }).populate('userId');
    res.status(200).json(investments);
  } catch (error) {
    console.error('Error fetching mining investments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const paySingleInvestmentProfit = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const investment = await Transaction.findById(transactionId).populate('userId');

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    if (investment.status !== 'completed') {
      return res.status(400).json({ message: 'Investment is not approved' });
    }

    const user = investment.userId;
    if (!user) {
      return res.status(404).json({ message: 'User not found for this investment' });
    }

    // Check if profit has already been distributed for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDistribution = new Date(investment.lastProfitDistributionDate);
    lastDistribution.setHours(0, 0, 0, 0);

    if (lastDistribution.getTime() === today.getTime()) {
      return res.status(400).json({ message: 'Profit already distributed for today.' });
    }

    const dailyProfit = investment.amount * investment.dailyProfitRate;

    user.incomeWallet += dailyProfit;
    investment.lastProfitDistributionDate = new Date();

    const incomeTransaction = new Transaction({
      userId: user._id,
      amount: dailyProfit,
      type: 'income',
      description: `Daily mining profit for investment ${investment._id}`,
      status: 'completed',
    });

    await user.save();
    await investment.save();
    await incomeTransaction.save();

    res.status(200).json({ message: 'Daily profit paid successfully', dailyProfit });
  } catch (error) {
    console.error('Error paying single investment profit:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const payAllInvestmentsProfit = async (req, res) => {
  try {
    const approvedInvestments = await Transaction.find({ status: 'completed', type: 'investment' }).populate('userId');
    let paidCount = 0;

    for (const investment of approvedInvestments) {
      const user = investment.userId;
      if (!user) continue; // Skip if user not found

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastDistribution = new Date(investment.lastProfitDistributionDate);
      lastDistribution.setHours(0, 0, 0, 0);

      if (lastDistribution.getTime() < today.getTime()) {
        const dailyProfit = investment.amount * investment.dailyProfitRate;

        user.incomeWallet += dailyProfit;
        investment.lastProfitDistributionDate = new Date();

        const incomeTransaction = new Transaction({
          userId: user._id,
          amount: dailyProfit,
          type: 'income',
          description: `Daily mining profit for investment ${investment._id}`,
          status: 'completed',
        });

        await user.save();
        await investment.save();
        await incomeTransaction.save();
        paidCount++;
      }
    }

    res.status(200).json({ message: `Daily profit paid for ${paidCount} investments.`, paidCount });
  } catch (error) {
    console.error('Error paying all investments profit:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const approveMiningInvestment = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.type !== 'investment' || transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not a pending investment' });
    }

    transaction.status = 'completed';
    transaction.startDate = new Date();
    transaction.dailyProfitRate = 0.165;
    transaction.investmentDuration = 365; // Assuming 365 days for now
    transaction.lastProfitDistributionDate = new Date();

    await transaction.save();

    // Update user's mining investment
    const user = await User.findById(transaction.userId);
    if (user) {
      user.miningInvestment += transaction.amount;
      await user.save();
    }

    res.status(200).json({ message: 'Mining investment approved successfully' });
  } catch (error) {
    console.error('Error approving mining investment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};