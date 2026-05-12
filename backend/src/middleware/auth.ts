import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUserDocument } from '../models/User';

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
console.log('RUNTIME JWT_SECRET:', JWT_SECRET);

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    console.log('AUTH HEADER:', req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('EXTRACTED TOKEN:', token);

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
            console.log('DECODED TOKEN:', decoded);

            // Find user by ID and attach to request, excluding password
            req.user = await User.findById(decoded.userId).select('-password') as IUserDocument;
            console.log('FOUND USER:', req.user ? req.user._id : 'null');

            if (!req.user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }

            next();
        } catch (error: any) {
            console.error('AUTH ERROR:', error.message);
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Not authorized, token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                res.status(401).json({ message: 'Not authorized, token failed' });
            } else {
                res.status(401).json({ message: 'Not authorized, invalid token' });
            }
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
