import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyTurnstile } from '../utils/verifyTurnstile.js';
import crypto from 'crypto';
import { sendWelcomeEmail } from '../utils/mailer.js';


const generateReferralCode = async () => {
    let referralCode;
    let isUnique = false;
    while (!isUnique) {
        const randomDigits = Math.floor(1000000 + Math.random() * 9000000).toString();
        referralCode = `CM${randomDigits}`;
        const existingUser = await User.findOne({ referralCode });
        if (!existingUser) {
            isUnique = true;
        }
    }
    return referralCode;
};

export const signup = async (req, res) => {
    const { name, country, mobile, email, password, referralCode, turnstileToken, rememberMe } = req.body;

    try {
        // Verify Turnstile token
        const turnstileResponse = await verifyTurnstile(turnstileToken);
        if (!turnstileResponse.success) {
            return res.status(400).json({ message: 'CAPTCHA verification failed' });
        }

        // Check if referral code is provided
        if (!referralCode) {
            return res.status(400).json({ message: 'Referral code is required' });
        }

        // Check if referring user exists
        const referringUser = await User.findOne({ referralCode: referralCode });
        if (!referringUser) {
            return res.status(400).json({ message: 'Invalid referral code' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user (password and transactionPassword will be hashed by the pre-save hook in the model)
        const newReferralCode = await generateReferralCode();
        const newUser = new User({ name, country, mobile, email, password, transactionPassword: password, referralCode: newReferralCode });

        // Handle referral
        newUser.referredBy = referringUser._id;
        referringUser.directReferrals.push(newUser._id);
        await referringUser.save();

        // Handle indirect referrals
        if (referringUser.referredBy) {
            const grandParentReferrer = await User.findById(referringUser.referredBy);
            if (grandParentReferrer) {
                grandParentReferrer.indirectReferrals.push(newUser._id);
                await grandParentReferrer.save();
            }
        }

        await newUser.save();

        // Send welcome email
        await sendWelcomeEmail(email, name, email, password);

        // Generate JWT token
        const expiresIn = rememberMe ? '7d' : '10h';
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn });

        // Set cookie
        res.cookie('token', token, { httpOnly: true,sameSite: "none", secure: process.env.NODE_ENV === 'production', maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined }).status(201).json({ result: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const login = async (req, res) => {
    const { email, password, turnstileToken, rememberMe } = req.body;

    try {
        // Verify Turnstile token
        const turnstileResponse = await verifyTurnstile(turnstileToken);
        if (!turnstileResponse.success) {
            return res.status(400).json({ message: 'CAPTCHA verification failed' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const expiresIn = rememberMe ? '7d' : '10h';
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn });

        // Set cookie
        res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: process.env.NODE_ENV === 'production', maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined }).status(200).json({ result: existingUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).send();
};

export const getReferrerName = async (req, res) => {
    const { referralCode } = req.params;
    try {
        const user = await User.findOne({ referralCode });
        if (user) {
            res.status(200).json({ name: user.name });
        } else {
            res.status(404).json({ message: 'Referrer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
