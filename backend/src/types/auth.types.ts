export interface AuthResponse {
    success: boolean;
    token: string;
    data: {
        id: string;
        email: string;
        username: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    username: string;
}
