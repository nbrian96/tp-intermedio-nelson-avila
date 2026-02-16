import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { validateTokenAsync } from '../store/authSlice';

export const useAuthValidation = () => {
    const dispatch = useAppDispatch();
    const { token, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (token && isAuthenticated) {
            dispatch(validateTokenAsync());
        }
    }, [dispatch, token, isAuthenticated]);
};
