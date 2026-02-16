import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { validateTokenAsync } from '../store/authSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { isAuthenticated, token, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (token && isAuthenticated) {
            dispatch(validateTokenAsync());
        }
    }, [dispatch, token, isAuthenticated]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh'
                }}
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
