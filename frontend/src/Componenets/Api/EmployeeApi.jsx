const BASE_URL = "http://localhost:3001/api/employees";

const getToken = () => {
    return (
        localStorage.getItem("token") ||
        sessionStorage.getItem("token")
    );
};

// Get Employees
export const getEmployees = async () => {
    const token = getToken();

    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// Get Employee
export const getEmployeeById = async (id) => {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// Create Employee
export const createEmployee = async (employee) => {
    const token = getToken();

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// Update Employee
export const updateEmployee = async (id, employee) => {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};