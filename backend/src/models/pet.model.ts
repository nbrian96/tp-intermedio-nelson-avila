import mongoose, { Document, Schema } from 'mongoose';

export interface IPet extends Document {
    name: string;
    species: string;
    birthdate: Date;
    ownerId: mongoose.Types.ObjectId;
    deleted: boolean;
    deletedAt: Date | null;
}

const PetSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    species: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true,
    },
    birthdate: {
        type: Date,
        default: null
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
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

export default mongoose.model<IPet>('Pet', PetSchema);
