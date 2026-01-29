import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import { generateToken } from '../utils/token.util';

export class AuthService {

    async register(userData: Partial<IUser>): Promise<any> {
        const { email, username, password } = userData;

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('El usuario ya existe');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });

        return {
            success: user?.id ? true : false,
            message: user?.id ? 'Usuario creado exitosamente' : 'Usuario no creado'
        };
    }

    async login(userData: Partial<IUser>): Promise<any> {
        const { email, password } = userData;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password as string, user.password))) {
            return {
                success: true,
                token: generateToken(user.id)
            };
        } else {
            throw new Error('Credenciales inválidas');
        }
    }
}
