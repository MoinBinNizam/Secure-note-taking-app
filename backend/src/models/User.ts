import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the interface for the User Document
interface IUser extends Document {
    email: string;
    password: string;
    role: 'User' | 'Admin';
    interests: string[];
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// Define the Mongoose Schema for User
const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    },
    interests: {
        type: [String],
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

// Explicit Indexing
UserSchema.index({ email: 1 }, { unique: true }); // Unique index for email
UserSchema.index({ interests: 1 }); // Multikey index for interests (Mongoose handles multikey for array fields automatically)

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;
