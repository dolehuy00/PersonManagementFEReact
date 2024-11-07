import axios from 'axios';

const API_BASE_URL = 'https://localhost:7297/api/Employee';

export const getPageEmployee = async (pageNumber, pageSize) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${API_BASE_URL}/get/${pageNumber}/${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
