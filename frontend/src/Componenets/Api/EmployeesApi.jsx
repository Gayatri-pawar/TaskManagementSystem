const BASE_URL = "http://localhost:3001/api/employees";

const getToken = () =>
    sessionStorage.getItem("token") ||
    localStorage.getItem("token");

export const getMyTasks = async () => {
    const response = await fetch(`${BASE_URL}/my-tasks`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};

export const updateTaskStatus = async (taskId, status) => {
    const response = await fetch(
        `http://localhost:3001/api/tasks/status/${taskId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ status }),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};