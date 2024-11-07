
import { useState, useEffect } from 'react';
import { getPageEmployee } from 'services/management/EmployeeApi.js';
import { useNavigate } from "react-router-dom";

export const useGetPageEmployee = (page, pageSize) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const result = await getPageEmployee(page, pageSize);
                setData(result);
                setLoading(false);
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/auth');
                } else {
                    setLoading(false);
                    setError(error);
                }
            }
        };
        getData();
    }, [page, pageSize, navigate]);

    return { data, loading, error };
};
