import { Request, Response } from 'express';
import User from '../models/User.js';
import { IUserDocument } from '../models/User.js';
import mongoose from 'mongoose';

interface CustomRequest extends Request {
    user?: IUserDocument;
}

// @desc    Get all users (paginated)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req: CustomRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments({});
        const totalPages = Math.ceil(totalUsers / limit);

        const users = await User.find({})
            .select('-password') // Exclude passwords
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: users,
            currentPage: page,
            totalPages: totalPages,
            totalUsers: totalUsers,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent admin from deleting themselves (optional but good practice)
        if (user._id.toString() === req.user?._id.toString()) {
            return res.status(403).json({ message: 'Admin cannot delete their own account via this endpoint' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User removed' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
