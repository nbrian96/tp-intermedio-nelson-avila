import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.util';
import { AuthenticationError } from '../utils/errors.util';
import { AuthUser } from '../types/express';

interface JwtPayload {
    id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new AuthenticationError('Unauthorized, no token');
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token) as JwtPayload;

        req.user = { id: decoded.id } as AuthUser;

        next();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            next(error);
        } else {
            next(new AuthenticationError('Unauthorized, token failed'));
        }
    }
};
