import mongoose, { Document, Schema } from 'mongoose';

export interface IMedicalHistory extends Document {
    petId: mongoose.Types.ObjectId;
    veterinarianId: mongoose.Types.ObjectId;
    registrationDate: Date;
    description: string;
    deleted: boolean;
    deletedAt: Date | null;
}

const MedicalHistorySchema: Schema = new Schema({
    petId: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    veterinarianId: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinarian',
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    description: {
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

export default mongoose.model<IMedicalHistory>('MedicalHistory', MedicalHistorySchema);
