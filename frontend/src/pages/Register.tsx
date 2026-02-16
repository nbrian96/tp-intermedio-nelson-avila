import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Container
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerAsync, clearError } from '../store/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setValidationError('');
    };

    const validateForm = (): boolean => {
        if (!formData.email || !formData.username || !formData.password) {
            setValidationError('Todos los campos son obligatorios');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError('Las contraseñas no coinciden');
            return false;
        }

        if (formData.password.length < 6) {
            setValidationError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setValidationError('Email inválido');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const { confirmPassword, ...registerData } = formData;
        await dispatch(registerAsync(registerData));
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4
                }}
            >
                <Card sx={{ width: '100%', maxWidth: 450 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
                            Crear Cuenta
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                            Únete a Patitas Felices
                        </Typography>

                        {(error || validationError) && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error || validationError}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                margin="normal"
                                autoComplete="email"
                                autoFocus
                                disabled={isLoading}
                            />

                            <TextField
                                fullWidth
                                label="Nombre de Usuario"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                margin="normal"
                                autoComplete="username"
                                disabled={isLoading}
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                margin="normal"
                                autoComplete="new-password"
                                disabled={isLoading}
                                helperText="Mínimo 6 caracteres"
                            />

                            <TextField
                                fullWidth
                                label="Confirmar Contraseña"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                margin="normal"
                                autoComplete="new-password"
                                disabled={isLoading}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Registrarse'}
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    ¿Ya tienes una cuenta?{' '}
                                    <Link
                                        to="/login"
                                        style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}
                                    >
                                        Inicia sesión aquí
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Register;
