import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
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
    const settings = await Setting.find({});
    const depositBarcodeUrl = settings.find(s => s.key === 'depositBarcodeUrl')?.value || '';
    const tre20BarcodeUrl = settings.find(s => s.key === 'tre20BarcodeUrl')?.value || '';
    const depositWalletAddress = settings.find(s => s.key === 'depositWalletAddress')?.value || '';
    const tre20WalletAddress = settings.find(s => s.key === 'tre20WalletAddress')?.value || '';

    res.status(200).json({
      depositBarcodeUrl,
      tre20BarcodeUrl,
      depositWalletAddress,
      tre20WalletAddress
    });
  } catch (error) {
    console.error('Error getting barcode:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateBarcode = async (req, res) => {
  try {
    const { deposit, tre20, depositAddress, tre20Address } = req.body;

    await Setting.findOneAndUpdate({ key: 'depositBarcodeUrl' }, { value: deposit }, { upsert: true });
    await Setting.findOneAndUpdate({ key: 'tre20BarcodeUrl' }, { value: tre20 }, { upsert: true });
    await Setting.findOneAndUpdate({ key: 'depositWalletAddress' }, { value: depositAddress }, { upsert: true });
    await Setting.findOneAndUpdate({ key: 'tre20WalletAddress' }, { value: tre20Address }, { upsert: true });

    res.status(200).json({ message: 'Barcodes and addresses updated successfully' });
  } catch (error) {
    console.error('Error updating barcode:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const submitPayment = async (req, res) => {
  try {
    const { amount, userId, password } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;

    if (!amount || !userId || !screenshot || !password) {
      return res.status(400).json({ message: 'Amount, user ID, screenshot, and password are required.' });
    }

    const user = await User.findById(userId).select('+transactionPassword');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.transactionPassword);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid transaction password" });
    }

    const newTransaction = new Transaction({
      userId,
      amount,
      type: 'deposit',
      status: 'pending',
      screenshotUrl: screenshot,
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

export const payAllInvestmentsProfit = async (req, res) => {
  try {
    console.log('payAllInvestmentsProfit function called.');
    const approvedInvestments = await Transaction.find({ status: 'completed', type: 'investment' }).populate('userId');
    console.log(`Found ${approvedInvestments.length} approved investments.`);
    let totalPaidCount = 0;
    let totalProfitDistributed = 0;

    for (const investment of approvedInvestments) {
      console.log(`Processing investment: ${investment._id}`);
      const user = investment.userId;
      if (!user) {
        console.log(`User not found for investment ${investment._id}. Skipping.`);
        continue; // Skip if user not found
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastDistributionDate = new Date(investment.lastProfitDistributionDate);
      lastDistributionDate.setHours(0, 0, 0, 0);

      console.log(`Investment ${investment._id}: lastDistributionDate = ${lastDistributionDate}, today = ${today}`);

      // Calculate days to pay
      const timeDiff = today.getTime() - lastDistributionDate.getTime();
      const daysToPay = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      console.log(`Investment ${investment._id}: daysToPay = ${daysToPay}`);

      if (daysToPay > 0) {
        const dailyProfit = investment.amount * (investment.dailyProfitRate / 100);
        const totalProfitForPeriod = dailyProfit * daysToPay;

        console.log(`Investment ${investment._id}: dailyProfit = ${dailyProfit}, totalProfitForPeriod = ${totalProfitForPeriod}`);
        console.log(`User ${user._id}: incomeWallet before = ${user.incomeWallet}`);

        user.incomeWallet += totalProfitForPeriod;
        investment.lastProfitDistributionDate = today; // Reset to today (00:00:00)

        console.log(`User ${user._id}: incomeWallet after = ${user.incomeWallet}`);

        const incomeTransaction = new Transaction({
          userId: user._id,
          amount: totalProfitForPeriod,
          type: 'income',
          description: `Mining profit for ${daysToPay} days for investment ${investment._id}`,
          status: 'completed',
        });

        await user.save();
        await investment.save();
        await incomeTransaction.save();
        console.log(`Investment ${investment._id}: User, Investment, and Income Transaction saved.`);
        totalPaidCount++;
        totalProfitDistributed += totalProfitForPeriod;
      } else {
        console.log(`Investment ${investment._id}: No days to pay (daysToPay <= 0).`);
      }
    }

    res.status(200).json({ message: `Profit distributed for ${totalPaidCount} investments. Total profit: ${totalProfitDistributed.toFixed(2)}`, totalPaidCount, totalProfitDistributed });
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

export const getPaymentStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        const pendingDeposit = await Transaction.findOne({ userId, type: 'deposit', status: 'pending' }).sort({ createdAt: -1 });
        if (pendingDeposit) {
            res.status(200).json({ status: 'pending' });
        } else {
            res.status(200).json({ status: 'idle' });
        }
    } catch (error) {
        console.error('Error fetching payment status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};