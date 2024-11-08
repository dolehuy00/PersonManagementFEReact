import axios from 'axios';

const API_BASE_URL = 'https://localhost:7297/api/Employee';

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
