const BASE_URL = "http://localhost:3001/api/dashboard";

const getToken = () => {
    return (
        sessionStorage.getItem("token") ||
        localStorage.getItem("token")
    );
};



export const getDashboardSummary = async () => {
    try {
        const res = await fetch(`${BASE_URL}/summary`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch dashboard summary");
        }

        return await res.json();

    } catch (error) {
        throw new Error(error.message);
    }
};

export const getRecentTasks = async () => {
    try {
        const res = await fetch(`${BASE_URL}/recent-tasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch recent tasks");
        }

        return await res.json();

    } catch (error) {
        throw new Error(error.message);
    }
};