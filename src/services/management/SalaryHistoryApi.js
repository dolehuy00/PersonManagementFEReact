import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = 'https://localhost:7297/api/SalaryHistory';

export const getOneSalaryHistory = async (salaryHistoryId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/get/${salaryHistoryId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        var data = response.data;
        data.results[0].date = data.results[0].date.split("T")[0];
        return data;
    } catch (error) {
        throw error;
    }
}

export const filterSalaryHistory = async (dataFilter, sortByDate, pageNumber, pageSize) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${API_BASE_URL}/filter`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                employeeId: "employeeId" in dataFilter ? dataFilter.employeeId : "",
                sortByDate: sortByDate,
                Page: pageNumber,
                PageSize: pageSize
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addSalaryHistory = async (data) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.post(`${API_BASE_URL}/add`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data;

    } catch (error) {
        throw error;
    }
};

export async function editSalaryHistory(dataRequest) {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.put(`${API_BASE_URL}/edit`, dataRequest, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        var dataResponse = response.data;
        dataResponse.results[0].date = dataResponse.results[0].date.split("T")[0];
        return dataResponse;
    } catch (error) {
        throw error;
    }
};

// // delay
///////////////////////////////////////////////////////////////////////////
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//await delay(3000);
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// const mock = new MockAdapter(axios);
// // Giả lập lỗi 400 cho một endpoint nhất định
// mock.onPost(`${API_BASE_URL}/add`).reply(400, {
//     message: "Save failed, an error occurred, please try again later!",
// });
//////////////////////////////////////////////////////////////////////////////