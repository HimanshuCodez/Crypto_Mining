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