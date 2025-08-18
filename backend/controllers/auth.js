import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyTurnstile } from '../utils/verifyTurnstile.js';

export const signup = async (req, res) => {
    const { name, country, mobile, email, password, referralCode, turnstileToken, rememberMe } = req.body;

    try {
        // Verify Turnstile token
        const turnstileResponse = await verifyTurnstile(turnstileToken);
        if (!turnstileResponse.success) {
            return res.status(400).json({ message: 'CAPTCHA verification failed' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({ name, country, mobile, email, password: hashedPassword, referralCode });
        await newUser.save();

        // Generate JWT token
        const expiresIn = rememberMe ? '7d' : '1h';
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn });

        // Set cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined }).status(201).json({ result: newUser });

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
        const expiresIn = rememberMe ? '7d' : '1h';
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn });

        // Set cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined }).status(200).json({ result: existingUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).send();
};
