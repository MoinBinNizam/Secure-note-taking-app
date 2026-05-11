import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, interests } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ email, password, interests });
        
        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign({ userId: user._id.toString() }, secret, { expiresIn: '1h' });

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
        
        // Use the comparePassword method defined in the model
        if (!user || !(await (user as any).comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, user: { email: user.email, role: user.role } });
    } catch (err: any) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};
