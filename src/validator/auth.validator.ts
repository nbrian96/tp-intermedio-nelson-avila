import { body } from 'express-validator';
import { validateResult } from './validate';

export const registerValidator = [
    body('username')
        .isString().withMessage('Username must be a string')
        .trim()
        .notEmpty().withMessage('Username is required'),
    body('email')
        .isString().withMessage('Email must be a string')
        .trim()
        .isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString().withMessage('Password must be a string')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 12 }).withMessage('Password must be between 6 and 12 characters'),
    validateResult
];

export const loginValidator = [
    body('email')
        .isString().withMessage('Email must be a string')
        .trim()
        .isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString().withMessage('Password must be a string')
        .trim()
        .notEmpty().withMessage('Password is required'),
    validateResult
];
