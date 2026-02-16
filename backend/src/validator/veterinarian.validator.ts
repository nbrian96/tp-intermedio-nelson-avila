import { body } from 'express-validator';
import { validateResult } from './validate';

export const createVeterinarianValidator = [
    body('name')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name is required'),
    body('surname')
        .isString().withMessage('Surname must be a string')
        .trim()
        .notEmpty().withMessage('Surname is required'),
    body('medicalLicense')
        .isString().withMessage('Medical license must be a string')
        .trim()
        .notEmpty().withMessage('Medical license is required'),
    body('specialty')
        .isString().withMessage('Specialty must be a string')
        .trim()
        .notEmpty().withMessage('Specialty is required'),
    validateResult
];

export const updateVeterinarianValidator = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty'),
    body('surname')
        .optional()
        .isString().withMessage('Surname must be a string')
        .trim()
        .notEmpty().withMessage('Surname cannot be empty'),
    body('medicalLicense')
        .optional()
        .isString().withMessage('Medical license must be a string')
        .trim()
        .notEmpty().withMessage('Medical license cannot be empty'),
    body('specialty')
        .optional()
        .isString().withMessage('Specialty must be a string')
        .trim()
        .notEmpty().withMessage('Specialty cannot be empty'),
    validateResult
];
