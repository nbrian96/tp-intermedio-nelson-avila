import mongoose, { Document, Schema } from 'mongoose';

export interface ICareer extends Document {
    name: string;
    plan: string;
    deleted: boolean;
    deletedAt: Date;
}

const CareerSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    plan: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

export default mongoose.model<ICareer>('Career', CareerSchema);
