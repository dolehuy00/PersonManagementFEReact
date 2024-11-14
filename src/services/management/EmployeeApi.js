import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = 'https://localhost:7297/api/Employee';

export const getOneEmployee = async (employeeId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/get/${employeeId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        var data = response.data;
        data.results[0].startDate = data.results[0].startDate.split("T")[0];
        data.results[0].dateOfBirth = data.results[0].dateOfBirth.split("T")[0];
        
        return data;
    } catch (error) {
        throw error;
    }
}


export const filterEmployee = async (dataFilter, sortBy, pageNumber, pageSize) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${API_BASE_URL}/filter`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                NameOrId: "nameOrId" in dataFilter ? dataFilter.nameOrId : "",
                Address: "address" in dataFilter ? dataFilter.address : "",
                Position: "position" in dataFilter ? dataFilter.address : "",
                DepartmentId: "departmentId" in dataFilter ? dataFilter.departmentId : "",
                Status: "status" in dataFilter ? dataFilter.status : "",
                FromSalary: "fromSalary" in dataFilter ? dataFilter.fromSalary : "",
                ToSalary: "toSalary" in dataFilter ? dataFilter.toSalary : "",
                FromDoB: "fromDoB" in dataFilter ? dataFilter.fromDoB.format("YYYY-MM-DD") + "T00:00:00" : "",
                ToDoB: "toDoB" in dataFilter ? dataFilter.toDoB.format("YYYY-MM-DD") + "T00:00:00" : "",
                FromStartDate: "fromStartDate" in dataFilter ? dataFilter.fromStartDate.format("YYYY-MM-DD") + "T00:00:00" : "",
                ToStartDate: "tostartDate" in dataFilter ? dataFilter.tostartDate.format("YYYY-MM-DD") + "T00:00:00" : "",
                SortBy: sortBy,
                Page: pageNumber,
                PageSize: pageSize
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addEmployee = async (data) => {
    try {

        const token = localStorage.getItem('accessToken');

        data.dateOfBirth += "T00:00:00";
        data.startDate += "T00:00:00";

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

export async function editEmployee(dataRequest){
    try {
        // delay
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(3000);
        
        const token = localStorage.getItem('accessToken');

        dataRequest.dateOfBirth += "T00:00:00";
        dataRequest.startDate += "T00:00:00";

        const response = await axios.put(`${API_BASE_URL}/edit`, dataRequest, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        var dataResponse = response.data;
        dataResponse.results[0].startDate = dataResponse.results[0].startDate.split("T")[0];
        dataResponse.results[0].dateOfBirth = dataResponse.results[0].dateOfBirth.split("T")[0];
        
        return dataResponse;

    } catch (error) {
        throw error;
    }
};


// // delay
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//await delay(3000);

// const mock = new MockAdapter(axios);
// // Giả lập lỗi 400 cho một endpoint nhất định
// mock.onPost(`${API_BASE_URL}/add`).reply(400, {
//     message: "Save failed, an error occurred, please try again later!",
// });