import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import bcrypt from 'bcryptjs';
import { sendMail } from '../utils/mailer.js';




export const sendOtp = async (req, res) => {
    const { email, password } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user || user.email !== email) {
            return res.status(404).json({ message: 'User not found or email does not match' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.transactionPassword);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid transaction password' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        user.otp = otp.toString();
        user.otpExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        await sendMail(email, 'Your OTP for Account Activation', `Your OTP is ${otp}`);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error("Error in sendOtp controller:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const sendTransferOtp = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        user.otp = otp.toString();
        user.otpExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        await sendMail(user.email, 'Your OTP for Transfer', `Your OTP for transfer is ${otp}`);
        res.status(200).json({ message: 'OTP sent successfully to your registered email' });
    } catch (error) {
        console.error("Error in sendTransferOtp controller:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const activateAccount = async (req, res) => {
    const { userId, paymentMode, password, otp } = req.body;
    const activatingUserId = req.user._id;

    try {
        const activatingUser = await User.findById(activatingUserId);
        if (!activatingUser) {
            return res.status(404).json({ message: "Activating user not found" });
        }

        // 1. Verify password
        const isPasswordCorrect = await bcrypt.compare(password, activatingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid transaction password" });
        }

        // 2. Verify OTP
        if (activatingUser.otp !== otp || activatingUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // 3. Check wallet balance
        const activationCost = 111;
        if (paymentMode === 'package' && activatingUser.packageWallet < activationCost) {
            return res.status(400).json({ message: "Insufficient balance in Package Wallet. Deposit more to activate account." });
        } else if (paymentMode === 'income' && activatingUser.incomeWallet < activationCost) {
            return res.status(400).json({ message: "Insufficient balance in Income Wallet. Deposit more to activate account." });
        }

        // 4. Find user to activate
        const userToActivate = await User.findOne({ referralCode: userId });
        if (!userToActivate) {
            return res.status(404).json({ message: "User to activate not found" });
        }

        if (userToActivate.activationLicense) {
            return res.status(400).json({ message: "User is already activated" });
        }

        // Handle referral if not already set
        if (!userToActivate.referredBy) {
            userToActivate.referredBy = activatingUser._id;
            activatingUser.directReferrals.push(userToActivate._id);
        }

        // 5. Update user to activate
        userToActivate.activationLicense = true;
        userToActivate.dateOfActivation = new Date();
        await userToActivate.save();

        // 6. Deduct from activating user's wallet
        if (paymentMode === 'package') {
            activatingUser.packageWallet -= activationCost;
        } else {
            activatingUser.incomeWallet -= activationCost;
        }
        
        // Clear OTP
        activatingUser.otp = undefined;
        activatingUser.otpExpires = undefined;

        await activatingUser.save();

        // 7. Create transaction record
        const transaction = new Transaction({
            userId: activatingUserId,
            amount: activationCost,
            type: 'activation',
            status: 'completed',
        });
        await transaction.save();

        res.status(200).json({ message: "Account activated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('directReferrals').populate('indirectReferrals');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const dashboardData = {
            referralLink: `http://cryptominning.in/auth/signup?referral=${user.referralCode}`,
            incomeWallet: user.incomeWallet || 0,
            packageWallet: user.packageWallet || 0,
            totalIncome: user.incomeWallet, // This might need a more complex calculation
            totalWithdraw: 0, // This would need to be calculated from transactions
            activationLicense: user.activationLicense,
            dateOfJoining: user.createdAt,
            dateOfActivation: user.dateOfActivation,
            miningInvestment: user.miningInvestment || 0,
            directReferral: user.directReferrals.length,
            indirectReferral: user.indirectReferrals.length,
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getProfile = async (req, res) => {
    res.status(200).json(req.user);
};

export const getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error('Error getting user count:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, country, mobile, email } = req.body;
        const userId = req.user._id; // Get user ID from authenticated user

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, country, mobile, email },
            { new: true, runValidators: true } // Return the updated document and run schema validators
        ).select('-password'); 

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getDirectReferrals = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('directReferrals');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.directReferrals);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getIndirectReferrals = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('indirectReferrals');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.indirectReferrals);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getReceivedTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id, type: 'transfer_in' }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateWallet = async (req, res) => {
    const { walletType, address, otp } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const newWallet = new Wallet({
            userId,
            walletType,
            address,
        });

        await newWallet.save();
        
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(201).json({ message: 'Wallet address saved successfully' });
    } catch (error) {
        console.error("Error in updateWallet controller:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getWallets = async (req, res) => {
    const userId = req.user._id;

    try {
        const wallets = await Wallet.find({ userId });
        res.status(200).json(wallets);
    } catch (error) {
        console.error("Error in getWallets controller:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('referralCode'); // Only fetch referralCode
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};