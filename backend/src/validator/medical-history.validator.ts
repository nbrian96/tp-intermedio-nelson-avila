
import { body } from 'express-validator';
import { validateResult } from './validate';

export const createMedicalHistoryValidator = [
    body('petId')
        .notEmpty().withMessage('The pet is required.')
        .isMongoId().withMessage('Invalid pet ID.'),
    body('veterinarianId')
        .notEmpty().withMessage('The veterinarian is required.')
        .isMongoId().withMessage('Invalid veterinarian ID.'),
    body('description')
        .notEmpty().withMessage('The description is required.')
        .isString().withMessage('The description must be a string.'),
    validateResult
];

export const updateMedicalHistoryValidator = [
    body('petId')
        .optional()
        .isMongoId().withMessage('Invalid pet ID.'),
    body('veterinarianId')
        .optional()
        .isMongoId().withMessage('Invalid veterinarian ID.'),
    body('description')
        .optional()
        .isString().withMessage('The description must be a string.'),
    validateResult
];
