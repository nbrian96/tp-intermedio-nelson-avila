import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
    subjectId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    grade: number | null;
    status: 'Aprobado' | 'En Curso' | 'Examen Final Pendiente';
    deleted: boolean;
    deletedAt: Date | null;
}

const EnrollmentSchema: Schema = new Schema({
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grade: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['Aprobado', 'En Curso', 'Examen Final Pendiente'],
        trim: true
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

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
