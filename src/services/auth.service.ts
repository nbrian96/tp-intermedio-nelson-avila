import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';
import { generateToken } from '../utils/token.util';
import { ValidationError, AuthenticationError } from '../utils/errors.util';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';

export class AuthService {

    async register(userData: Partial<IUser>): Promise<AuthResponse> {
        const { email, username, password } = userData as RegisterCredentials;

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ValidationError('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });

        if (!user) {
            throw new ValidationError('User not created');
        }

        return {
            success: true,
            token: generateToken(user.id),
            data: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        };
    }

    async login(userData: Partial<IUser>): Promise<AuthResponse> {
        const { email, password } = userData as LoginCredentials;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                success: true,
                token: generateToken(user.id),
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
            };
        } else {
            throw new AuthenticationError('Invalid credentials');
        }
    }
}
