import { Request, Response, NextFunction } from 'express';
import { IUserDocument } from '../models/User';

// Extend the Request interface for req.user if it hasn't been done elsewhere
// This is already done in auth.ts, but good to ensure if this file is used independently
declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
        }
    }
}

export const roleCheck = (allowedRoles: Array<'User' | 'Admin'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, no user found in request' });
        }

        // Check if the user's role is included in the allowed roles
        // Admin inherently has all 'User' capabilities, but for explicit checks,
        // we need to ensure the allowedRoles array is inclusive.
        const userRole: 'User' | 'Admin' = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden, insufficient role' });
        }
        
        next();
    };
};
