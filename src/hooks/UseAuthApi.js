import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho useHistory
import {
    login,
    forgotPassword,
    forgotPasswordChangePassword,
    forgotPasswordVertifyCode
} from 'services/auth/AuthApi';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await login(email, password);
            setIsLoading(false);
            if (data.results[0].role === 'Admin') {
                navigate('/admin');
            } else if (data.results[0].role === 'User') {
                navigate('/user');
            } else {
                throw new Error('Role invalid.');
            }
            return data;
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };
    return { handleLogin, isLoading, error };
};

export const useForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleForgot = async (email) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await forgotPassword(email);
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data?.status === 400) {
                setError(error.response?.data?.messages[0])
            } else {
                setError(error.message);
            }
        }
    };
    return { handleForgot, isLoading, error };
};

export const useForgotPasswordVertifyCode = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleForgotPasswordVertifyCode = async (email, code) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await forgotPasswordVertifyCode(email, code);
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data?.status === 400) {
                setError(error.response?.data?.messages[0])
            } else {
                setError(error.message);
            }
        }
    };
    return { handleForgotPasswordVertifyCode, isLoading, error };
};

export const useForgotPasswordChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleForgotPasswordChangePassword = async (email, code, password, passwordConfirm) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await forgotPasswordChangePassword(email, code, password, passwordConfirm);
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data?.status === 400) {
                setError(error.response?.data?.messages[0])
            } else {
                setError(error.message);
            }
        }
    };
    return { handleForgotPasswordChangePassword, isLoading, error };
};