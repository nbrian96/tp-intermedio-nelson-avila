import jwt from 'jsonwebtoken';

export const validateJWTConfig = (): void => {
    if (!process.env.JWT_SECRET) {
        throw new Error('FATAL ERROR: JWT_SECRET is not defined in environment variables. Application cannot start without this security configuration.');
    }
    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error('FATAL ERROR: JWT_EXPIRES_IN is not defined in environment variables.');
    }
};

export const generateToken = (id: string): string => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN! } as jwt.SignOptions
    );
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, process.env.JWT_SECRET!);
};
