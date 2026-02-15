import { body } from 'express-validator';
import { validateResult } from './validate';

export const createAppointmentValidator = [
    body('veterinarianId')
        .notEmpty()
        .withMessage('Veterinarian ID is required')
        .isMongoId()
        .withMessage('Veterinarian ID must be a valid MongoDB ID'),
    body('petName')
        .isString().withMessage('Pet name must be a string')
        .trim()
        .notEmpty().withMessage('Pet name cannot be empty'),
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 date'),
    body('reason')
        .isString().withMessage('Reason must be a string')
        .trim()
        .notEmpty().withMessage('Reason cannot be empty'),
    body('status')
        .optional()
        .isString().withMessage('Status must be a string')
        .trim()
        .isIn(['scheduled', 'completed', 'cancelled'])
        .withMessage('Status must be one of: scheduled, completed, cancelled'),
    validateResult
];

export const updateAppointmentValidator = [
    body('veterinarianId')
        .optional()
        .isMongoId()
        .withMessage('Veterinarian ID must be a valid MongoDB ID'),
    body('petName')
        .optional()
        .isString().withMessage('Pet name must be a string')
        .trim()
        .notEmpty().withMessage('Pet name cannot be empty'),
    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 date'),
    body('reason')
        .optional()
        .isString().withMessage('Reason must be a string')
        .trim()
        .notEmpty().withMessage('Reason cannot be empty'),
    body('status')
        .optional()
        .isString().withMessage('Status must be a string')
        .trim()
        .isIn(['scheduled', 'completed', 'cancelled'])
        .withMessage('Status must be one of: scheduled, completed, cancelled'),
    validateResult
];

