import { Schema, model, Document, Types } from 'mongoose';

// Define the interface for a Note document
export interface INote extends Document {
    title: string;
    content: string;
    ownerId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Mongoose Schema for Note
const NoteSchema = new Schema<INote>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Explicit Indexing (CRITICAL)
// Compound index on ownerId and createdAt for efficient "list my notes" operations.
// When a user requests their notes, the query will filter by ownerId
// and then sort by createdAt in descending order. This index allows MongoDB
// to find the user's notes and return them in the desired order quickly,
// avoiding a full collection scan and improving query performance significantly.
NoteSchema.index({ ownerId: 1, createdAt: -1 });

const Note = model<INote>('Note', NoteSchema);

export default Note;
