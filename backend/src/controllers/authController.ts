import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../models/User.js';

interface CustomRequest extends Request {
    user?: IUserDocument;
}

import jwt from 'jsonwebtoken';
import { IUserDocument } from '../models/User.js';
import { SHARED_JWT_SECRET } from '../config/secret.js';

interface CustomRequest extends Request {
    user?: IUserDocument;
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, interests, name } = req.body;
        console.log('DEBUG - Raw Request Body:', JSON.stringify(req.body, null, 2));
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ 
            email, 
            password, 
            interests: Array.isArray(interests) ? interests : [],
            role: 'User'
        });
        
        console.log('DEBUG - Saved User interests:', user.interests);
        
        const token = jwt.sign({ userId: user._id.toString() }, SHARED_JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { email: user.email, role: user.role, interests: user.interests } });
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

        const token = jwt.sign({ userId: user._id }, SHARED_JWT_SECRET, { expiresIn: '1h' });
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
        console.log('DEBUG - Interests received:', interests);
        console.log('DEBUG - Authenticated user:', req.user?._id);

        if (!Array.isArray(interests)) {
            return res.status(400).json({ message: 'Interests must be an array' });
        }

        const user = await User.findById(req.user?._id);
        if (!user) {
            console.log('DEBUG - User not found in DB');
            return res.status(404).json({ message: 'User not found' });
        }

        user.interests = interests;
        await user.save();
        console.log('DEBUG - Interests saved successfully:', user.interests);

        res.status(200).json({ message: 'Interests updated', interests: user.interests });
    } catch (err: any) {
        console.error('Update interests error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
