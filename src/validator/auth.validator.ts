import { body } from 'express-validator';
import { validateResult } from './validate';

export const registerValidator = [
    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isString(),
    body('email')
        .isEmail()
        .withMessage('Debe proporcionar un email válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isLength({ min: 6, max: 12 })
        .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    validateResult
];

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Debe proporcionar un email válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),
    validateResult
];
