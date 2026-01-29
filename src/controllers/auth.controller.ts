import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await authService.register(req.body);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        const message = (error as Error).message;
        const status = message === 'El usuario ya existe' ? 400 : 500;
        res.status(status).json({ message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await authService.login(req.body);
        res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
        const message = (error as Error).message;
        const status = message === 'Credenciales inválidas' ? 401 : 500;
        res.status(status).json({ message });
    }
};
