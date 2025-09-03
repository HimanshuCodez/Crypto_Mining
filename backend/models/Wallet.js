import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    walletType: {
        type: String,
        enum: ['USDT.BEP20', 'USDT.TRC20'],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;