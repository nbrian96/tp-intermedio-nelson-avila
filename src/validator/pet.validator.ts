import { check } from 'express-validator';
import { validateResult } from './validate';

export const createPetValidator = [
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
    check('species')
        .exists().withMessage('Species is required')
        .isString().withMessage('Species must be a string')
        .trim()
        .notEmpty().withMessage('Species cannot be empty')
        .isLength({ max: 30 }).withMessage('Species must be at most 30 characters'),
    check('birthdate')
        .optional()
        .isISO8601().toDate().withMessage('Birthdate must be a valid date'),
    check('ownerId')
        .exists().withMessage('Owner ID is required')
        .isMongoId().withMessage('Invalid Owner ID format'),
    (req: any, res: any, next: any) => validateResult(req, res, next)
];

export const updatePetValidator = [
    check('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
    check('species')
        .optional()
        .isString().withMessage('Species must be a string')
        .trim()
        .notEmpty().withMessage('Species cannot be empty')
        .isLength({ max: 30 }).withMessage('Species must be at most 30 characters'),
    check('birthdate')
        .optional()
        .isISO8601().toDate().withMessage('Birthdate must be a valid date'),
    check('ownerId')
        .optional()
        .isMongoId().withMessage('Invalid Owner ID format'),
    (req: any, res: any, next: any) => validateResult(req, res, next)
];
