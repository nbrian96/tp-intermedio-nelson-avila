import mongoose, { Document, Schema } from 'mongoose';

export interface IOwner extends Document {
    name: string;
    surname: string;
    dni: number;
    phone: string;
    address: string | null;
    deleted: boolean;
    deletedAt: Date | null;
}

const OwnerSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    dni: {
        type: Number,
        required: true,
        minlength: 7,
        maxlength: 8,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    address: {
        type: String,
        default: null,
        maxlength: 100,
        trim: true,
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

OwnerSchema.index({ dni: 1 }, { unique: true, partialFilterExpression: { deleted: false } });

export default mongoose.model<IOwner>('Owner', OwnerSchema);
