import { Schema, model, Document, Types } from 'mongoose';

// Define the interface for a Post document
export interface IPost extends Document {
    title: string;
    content: string;
    authorId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Mongoose Schema for Post
const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const Post = model<IPost>('Post', PostSchema);

export default Post;
