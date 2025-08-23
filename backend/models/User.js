import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

export default User;
