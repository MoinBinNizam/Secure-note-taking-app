import { Request, Response } from 'express';
import User from '../models/User.js'; // Use .js extension for ESM
import Post from '../models/Post.js'; // Use .js extension for ESM
import { IUserDocument } from '../models/User.js'; // Use .js extension for ESM
import mongoose from 'mongoose';

interface CustomRequest extends Request {
    user?: IUserDocument;
}

// @desc    Group users by interests
// @route   GET /api/aggregations/interests
// @access  Private
export const getUsersByInterests = async (req: CustomRequest, res: Response) => {
    try {
        const usersByInterest = await User.aggregate([
            {
                $unwind: '$interests' // Deconstructs the interests array into individual documents
            },
            {
                $group: {
                    _id: '$interests', // Group by each unique interest string
                    users: {
                        $push: { // Push relevant user details into an array
                            _id: '$_id',
                            email: '$email',
                            role: '$role'
                        }
                    },
                    count: { $sum: 1 } // Count how many users have this interest
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the root output
                    interest: '$_id', // Rename _id to interest
                    users: 1, // Include the users array
                    count: 1 // Include the count
                }
            },
            {
                $sort: { interest: 1 } // Optional: Sort by interest name
            }
        ]);

        res.status(200).json(usersByInterest);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all posts for a specific user using $lookup
// @route   GET /api/aggregations/user-posts/:userId
// @access  Private
export const getUserPosts = async (req: CustomRequest, res: Response) => {
    try {
        const { userId } = req.params;

        // Validate userId as a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const userPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId) // Match the specific user
                }
            },
            {
                $lookup: {
                    from: 'posts', // The collection to join with (Post model's collection name is 'posts')
                    localField: '_id', // Field from the input documents (User's _id)
                    foreignField: 'authorId', // Field from the documents of the "from" collection (Post's authorId)
                    as: 'posts' // The name of the new array field to add to the input documents
                }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    role: 1,
                    posts: {
                        _id: 1,
                        title: 1,
                        content: 1,
                        createdAt: 1
                    }
                }
            }
        ]);

        if (!userPosts || userPosts.length === 0) {
            return res.status(404).json({ message: 'User not found or no posts' });
        }

        res.status(200).json(userPosts[0]); // Return the first (and only) matched user with their posts
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
