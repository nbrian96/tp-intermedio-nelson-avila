import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';
import type {
    AuthState,
    LoginCredentials,
    RegisterCredentials,
    AuthResponse
} from '../interfaces/auth.interface';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const loadAuthFromStorage = (): Pick<AuthState, 'token' | 'user' | 'isAuthenticated'> => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const userStr = localStorage.getItem(USER_KEY);

        if (token && userStr) {
            const user = JSON.parse(userStr);
            return { token, user, isAuthenticated: true };
        }
    } catch (error) {
        console.error('Error loading auth from storage:', error);
    }

    return { token: null, user: null, isAuthenticated: false };
};

const initialState: AuthState = {
    ...loadAuthFromStorage(),
    isLoading: false,
    error: null
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            const response = await authService.register(credentials);
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const validateTokenAsync = createAsyncThunk(
    'auth/validateToken',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { auth: AuthState };
        const { token } = state.auth;

        if (!token) {
            return rejectWithValue('No token found');
        }

        const isValid = await authService.validateToken(token);

        if (!isValid) {
            return rejectWithValue('Token expired or invalid');
        }

        return true;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem(TOKEN_KEY, action.payload.token);
                localStorage.setItem(USER_KEY, JSON.stringify(action.payload.data));
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(registerAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem(TOKEN_KEY, action.payload.token);
                localStorage.setItem(USER_KEY, JSON.stringify(action.payload.data));
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(validateTokenAsync.rejected, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
