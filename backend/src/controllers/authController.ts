import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../models/User.js';

interface CustomRequest extends Request {
    user?: IUserDocument;
}

const getSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');
    return secret;
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, interests } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ email, password, interests });
        
        const token = jwt.sign({ userId: user._id.toString() }, getSecret(), { expiresIn: '1h' });

        res.status(201).json({ token, user: { email: user.email, role: user.role } });
    } catch (err: any) {
        console.error('REGISTRATION ERROR:', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await (user as any).comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET is not defined');

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.json({ token, user: { email: user.email, role: user.role } });
    } catch (err: any) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

export const getMe = async (req: CustomRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err: any) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateInterests = async (req: CustomRequest, res: Response) => {
    try {
        const { interests } = req.body;
        if (!Array.isArray(interests)) {
            return res.status(400).json({ message: 'Interests must be an array' });
        }

        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.interests = interests;
        await user.save();

        res.status(200).json({ message: 'Interests updated', interests: user.interests });
    } catch (err: any) {
        console.error('Update interests error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
