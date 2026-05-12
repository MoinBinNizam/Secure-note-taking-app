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
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        const userRole = req.user.role;

        // Admins automatically have access to everything
        if (userRole === 'Admin') {
            return next();
        }

        // Check if the user's role is in the allowed list
        if (allowedRoles.includes(userRole)) {
            return next();
        }

        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    };
};
