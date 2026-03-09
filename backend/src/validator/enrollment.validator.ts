import { body, param, query } from 'express-validator';
import { validateResult } from './validate';

export const enrollmentCreateValidator = [
    body('subjectId')
        .isMongoId().withMessage('Invalid subjectId'),
    body('status')
        .isIn(['Aprobado', 'En Curso', 'Examen Final Pendiente']).withMessage('Invalid status'),
    body('grade')
        .optional({ nullable: true })
        .isNumeric().withMessage('Grade must be a number')
        .custom((value) => {
            if (value !== null && (value < 1 || value > 10)) {
                throw new Error('Grade must be between 1 and 10');
            }
            return true;
        }),
    validateResult
];

export const enrollmentUpdateValidator = [
    param('id').isMongoId().withMessage('Invalid enrollment ID'),
    body('status')
        .optional()
        .isIn(['Aprobado', 'En Curso', 'Examen Final Pendiente']).withMessage('Invalid status'),
    body('grade')
        .optional({ nullable: true })
        .isNumeric().withMessage('Grade must be a number')
        .custom((value) => {
            if (value !== null && (value < 1 || value > 10)) {
                throw new Error('Grade must be between 1 and 10');
            }
            return true;
        }),
    validateResult
];

export const statusQueryValidator = [
    query('status')
        .isIn(['Aprobado', 'En Curso', 'Examen Final Pendiente']).withMessage('Invalid status query'),
    validateResult
];

export const enrollmentIdValidator = [
    param('id').isMongoId().withMessage('Invalid enrollment ID'),
    validateResult
];

export const enrollmentBulkValidator = [
    body().isArray().withMessage('Request body must be an array'),
    body('*.code')
        .isString().withMessage('Code must be a string')
        .notEmpty().withMessage('Code is required'),
    body('*.status')
        .isIn(['Aprobado', 'En Curso', 'Examen Final Pendiente']).withMessage('Invalid status'),
    body('*.grade')
        .optional({ nullable: true })
        .isNumeric().withMessage('Grade must be a number')
        .custom((value) => {
            if (value !== null && (value < 1 || value > 10)) {
                throw new Error('Grade must be between 1 and 10');
            }
            return true;
        }),
    validateResult
];

