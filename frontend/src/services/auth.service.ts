import { BACKEND_API_BASE_URL } from '../constants';
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials
} from '../interfaces/auth.interface';

const API_URL = `${BACKEND_API_BASE_URL}auth`;

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al iniciar sesión');
        }

        return response.json();
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al registrarse');
        }

        return response.json();
    },

    async validateToken(token: string): Promise<boolean> {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000;
            return Date.now() < expirationTime;
        } catch {
            return false;
        }
    }
};
