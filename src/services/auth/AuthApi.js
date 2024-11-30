import axios from 'axios';
import { saveImageToLocalStorage } from 'services/Image.js';

const API_BASE_URL = 'https://localhost:7297/api/Account';

function clearLocalStorage(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('leaderOfDepartments');
    localStorage.removeItem('email');
    localStorage.removeItem('image');
}

export const login = async (email, password) => {
    try {
        const response = await fetch(API_BASE_URL + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('email', data.results[0].email);
            localStorage.setItem('leaderOfDepartments', data.results[0].leaderOfDepartments);
            localStorage.setItem('accessToken', data.results[0].accessToken);
            localStorage.setItem('refreshToken', data.results[0].refreshToken);
            localStorage.setItem('role', data.results[0].role);
            saveImageToLocalStorage(data.results[0].employeeImage, "image")
            return data;
        } else {
            throw new Error(data.messages || 'Login failed');
        }
    } catch (error) {
        throw error;
    }
};

export const logout = async (navigate) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        await axios.post(`${API_BASE_URL}/cancel-refressh-token`, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                RefressToken: refreshToken
            },
        });
    } catch (error) {
        console.error('Logout API error:', error);
    }
    clearLocalStorage();
    navigate('/auth');
};

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
        const response = await axios.post(`${API_BASE_URL}/get-access-token`,
            null,
            {
                headers: {
                    RefressToken: refreshToken
                }
            }
        );

        const newAccessToken = response.data.results[0].newAccessToken;
        const newRefreshToken = response.data.results[0].newRefreshToken;

        // Lưu vào localStorage
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        return newAccessToken;
    } catch (error) {
        clearLocalStorage();
    }
}

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password-request`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forgotPasswordVertifyCode = async (email, code) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password-verify-code`, { email, code });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forgotPasswordChangePassword = async (email, code, password, passwordConfirm) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password-change`,
             { email, code, password, passwordConfirm });
        return response.data;
    } catch (error) {
        throw error;
    }
};

