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

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Fallback for development, use .env in production

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

            // Find user by ID and attach to request, excluding password
            req.user = await User.findById(decoded.id).select('-password') as IUserDocument;

            if (!req.user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }

            next();
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Not authorized, token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                res.status(401).json({ message: 'Not authorized, token failed' });
            } else {
                console.error(error);
                res.status(401).json({ message: 'Not authorized, invalid token' });
            }
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
