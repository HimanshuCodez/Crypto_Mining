
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'investment', 'income', 'activation', 'transfer_in', 'transfer_out', 'commission'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending',
  },
  mode: {
    type: String,
  },
  counterparty: {
    type: String,
  },
  screenshotUrl: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  dailyProfitRate: {
    type: Number,
  },
  investmentDuration: {
    type: Number, // in days
  },
  lastProfitDistributionDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
