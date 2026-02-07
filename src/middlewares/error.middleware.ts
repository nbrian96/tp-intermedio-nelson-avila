import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.util';

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
        return;
    }

    console.error('Unexpected error:', err);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

