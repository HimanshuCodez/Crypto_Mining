import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import investmentRoutes from './routes/investment.js';
import withdrawalRoutes from './routes/withdrawal.js';
import transferRoutes from './routes/transfer.js';
import packageTransferRoutes from './routes/packageTransfer.js';
import otpRoutes from './routes/otp.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: [
    process.env.CLIENT_URL, 
    'https://cryptominning.in'
  ],
}));
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

// app.use('/api/auth', authRoutes);
// // app.use('/api/user', userRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/investment', investmentRoutes);
// // app.use('/api/withdrawals', withdrawalRoutes);
// // app.use('/api/transfer', transferRoutes);
// // app.use('/api/package-transfer', packageTransferRoutes);
// // app.use('/api/otp', otpRoutes);

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });