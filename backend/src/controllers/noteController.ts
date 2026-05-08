import { Request, Response, NextFunction } from 'express';
import Note, { INote } from '../models/Note';
import { IUserDocument } from '../models/User'; // Assuming IUserDocument is exported from User model

// Extend the Request interface to include the user property, if not already done in auth.ts
// This is already done globally in auth.ts, so no need for 'declare global' here again.

interface CustomRequest extends Request {
    user?: IUserDocument;
}

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req: CustomRequest, res: Response) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newNote = new Note({
            title,
            content,
            ownerId: req.user?._id, // Assign ownerId from authenticated user
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all notes (paginated)
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req: CustomRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        let query: any = {};

        // Users only see their own notes
        if (req.user?.role === 'User') {
            query.ownerId = req.user._id;
        }
        // Admins can see all notes (no additional query filter needed for role 'Admin')

        const totalNotes = await Note.countDocuments(query);
        const totalPages = Math.ceil(totalNotes / limit);

        const notes = await Note.find(query)
            .sort({ createdAt: -1 }) // Sort by creation date descending
            .skip(skip)
            .limit(limit)
            .populate('ownerId', 'email'); // Populate owner details, e.g., email

        res.status(200).json({
            data: notes,
            currentPage: page,
            totalPages: totalPages,
            totalNotes: totalNotes,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a note by ID
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check ownership or if user is Admin
        if (note.ownerId.toString() !== req.user?._id.toString() && req.user?.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: You do not own this note, or lack admin privileges' });
        }

        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a note by ID
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check ownership or if user is Admin
        if (note.ownerId.toString() !== req.user?._id.toString() && req.user?.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: You do not own this note, or lack admin privileges' });
        }

        await note.deleteOne();
        res.status(200).json({ message: 'Note removed' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
