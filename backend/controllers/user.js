import User from '../models/User.js'; // Import User model

export const getProfile = async (req, res) => {
    res.status(200).json(req.user);
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
