import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho useHistory
import { login } from 'services/auth/AuthApi';

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
