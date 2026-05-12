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

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUserDocument } from '../models/User.js';
import { SHARED_JWT_SECRET } from '../config/secret.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, SHARED_JWT_SECRET) as { userId: string };
            req.user = await User.findById(decoded.userId).select('-password') as IUserDocument;

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Not authorized, token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            } else {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};
