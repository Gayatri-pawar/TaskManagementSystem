const BASE_URL = "http://localhost:3001/api/tasks";


const getToken = () => {
    return (
        localStorage.getItem("token") ||
        sessionStorage.getItem("token")
    );
};

// Get All Tasks
export const getTasks = async () => {
    const token = getToken();
    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return await response.json();
};

// Get Single Task
export const getTaskById = async (id) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch task");
    }

    return await response.json();
};
export const createTask = async (task) => {
    const token = getToken();

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// Update Task
export const updateTask = async (id, task) => {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// Delete Task
export const deleteTask = async (id) => {
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