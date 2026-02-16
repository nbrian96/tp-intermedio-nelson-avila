import { check } from 'express-validator';
import { validateResult } from './validate';

export const createOwnerValidator = [
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
    check('surname')
        .exists().withMessage('Surname is required')
        .isString().withMessage('Surname must be a string')
        .trim()
        .notEmpty().withMessage('Surname cannot be empty')
        .isLength({ max: 50 }).withMessage('Surname must be at most 50 characters'),
    check('dni')
        .exists().withMessage('DNI is required')
        .isNumeric().withMessage('DNI must be numeric')
        .isLength({ min: 7, max: 8 }).withMessage('DNI must be between 7 and 8 digits'),
    check('phone')
        .exists().withMessage('Phone is required')
        .isString().withMessage('Phone must be a string')
        .trim()
        .notEmpty().withMessage('Phone cannot be empty')
        .isLength({ max: 20 }).withMessage('Phone must be at most 20 characters'),
    check('address')
        .optional()
        .isString().withMessage('Address must be a string')
        .trim()
        .notEmpty().withMessage('Address cannot be empty')
        .isLength({ max: 100 }).withMessage('Address must be at most 100 characters'),
    (req: any, res: any, next: any) => validateResult(req, res, next)
];

export const updateOwnerValidator = [
    check('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
    check('surname')
        .optional()
        .isString().withMessage('Surname must be a string')
        .trim()
        .notEmpty().withMessage('Surname cannot be empty')
        .isLength({ max: 50 }).withMessage('Surname must be at most 50 characters'),
    check('dni')
        .optional()
        .isNumeric().withMessage('DNI must be numeric')
        .isLength({ min: 7, max: 8 }).withMessage('DNI must be between 7 and 8 digits'),
    check('phone')
        .optional()
        .isString().withMessage('Phone must be a string')
        .trim()
        .notEmpty().withMessage('Phone cannot be empty')
        .isLength({ max: 20 }).withMessage('Phone must be at most 20 characters'),
    check('address')
        .optional()
        .isString().withMessage('Address must be a string')
        .trim()
        .notEmpty().withMessage('Address cannot be empty')
        .isLength({ max: 100 }).withMessage('Address must be at most 100 characters'),
    (req: any, res: any, next: any) => validateResult(req, res, next)
];
