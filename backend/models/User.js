import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    transactionPassword: {
        type: String,
    },
    referralCode: {
        type: String,
    },
    avatar: { 
        type: String,
        default: '', 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    incomeWallet: {
        type: Number,
        default: 0,
    },
    packageWallet: {
        type: Number,
        default: 0,
    },
    activationLicense: {
        type: Boolean,
        default: false,
    },
    dateOfActivation: {
        type: Date,
    },
    miningInvestment: {
        type: Number,
        default: 0,
    },
    directReferrals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    indirectReferrals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    if (this.isModified('transactionPassword') && this.transactionPassword) {
        const salt = await bcrypt.genSalt(10);
        this.transactionPassword = await bcrypt.hash(this.transactionPassword, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;