import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the base interface for User document properties
interface IUser {
    email: string;
    password: string;
    role: 'User' | 'Admin';
    interests: string[];
}

// Define interface for instance methods
interface IUserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the interface for the User Document, combining IUser and Document methods
type IUserDocument = IUser & Document & IUserMethods;

// Define the static methods interface for the User Model (if any, not strictly needed for this task)
interface IUserModel extends Model<IUserDocument, {}, IUserMethods> {
    // Add any static methods here if needed in the future
}

// Define the Mongoose Schema for User
const UserSchema = new Schema<IUserDocument, IUserModel>({
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
        transform: function (doc: IUserDocument, ret: Record<string, any>) {
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        transform: function (doc: IUserDocument, ret: Record<string, any>) {
            delete ret.password;
            return ret;
        }
    }
});

// Explicit Indexing
UserSchema.index({ email: 1 }, { unique: true }); // Unique index for email
UserSchema.index({ interests: 1 }); // Multikey index for interests (Mongoose handles multikey for array fields automatically)

// Pre-save hook to hash password
UserSchema.pre<IUserDocument>('save', async function (next) {
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

const User = model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
