import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import { generateToken } from '../utils/token.util';

export class AuthService {

    async register(userData: Partial<IUser>): Promise<any> {
        const { email, username, password } = userData;

        // Verificar si existe usuario
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('El usuario ya existe');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        // Crear usuario
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });

        if (user) {
            return {
                id: user.id,
                email: user.email,
                token: generateToken(user.id)
            };
        } else {
            throw new Error('Datos de usuario inválidos');
        }
    }

    async login(userData: Partial<IUser>): Promise<any> {
        const { email, password } = userData;

        // Buscar usuario
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password as string, user.password))) {
            return {
                id: user.id,
                email: user.email,
                token: generateToken(user.id)
            };
        } else {
            throw new Error('Credenciales inválidas');
        }
    }
}
