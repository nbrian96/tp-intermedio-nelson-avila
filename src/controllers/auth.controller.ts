import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Helper para generar token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secretdefault', {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Por favor ingrese todos los campos' });
            return;
        }

        // Verificar si existe usuario
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = await User.create({
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Por favor ingrese email y contraseña' });
            return;
        }

        // Buscar usuario
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
