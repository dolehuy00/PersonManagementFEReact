import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho useHistory
import { login, forgotPassword } from 'services/auth/AuthApi';

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
            if(error.response?.data?.status === 400){
                setError(error.response?.data?.messages[0])
            }else{
                setError(error.message);
            }      
        }
    };
    return { handleForgot, isLoading, error };
};