import mongoose, { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
    name: string;
    code: string;
    type: string;
    year: number;
    period: string;
    correlative: Array<any>;
    mandatory: boolean;
    careerId: mongoose.Types.ObjectId;
    deleted: boolean;
    deletedAt: Date;
}

const SubjectSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['Materia', 'Tesis', 'Actividad Extracurricular']
    },
    year: {
        type: Number,
        min: 1,
        max: 6
    },
    period: {
        type: String,
        trim: true
    },
    credits: {
        type: Number,
        trim: true
    },
    correlative: {
        type: Array,
        required: true,
        default: []
    },
    mandatory: {
        type: Boolean,
        default: true
    },
    careerId: {
        type: Schema.Types.ObjectId,
        ref: 'Career',
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

export default mongoose.model<ISubject>('Subject', SubjectSchema);
