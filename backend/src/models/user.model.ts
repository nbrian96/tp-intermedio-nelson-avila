import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    deleted: boolean;
    deletedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

UserSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { deleted: false } });
UserSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { deleted: false } });

export default mongoose.model<IUser>('User', UserSchema);
