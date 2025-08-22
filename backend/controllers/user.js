import User from '../models/User.js';

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