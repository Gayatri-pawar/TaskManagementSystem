const BASE_URL = "http://localhost:3001/api/reports";

const getToken = () =>
    sessionStorage.getItem("token") || localStorage.getItem("token");

export const getAllTasksForReports = async (status, employeeId) => {
    try {
        const params = new URLSearchParams();

        if (status && status !== "All") {
            params.append("status", status);
        }

        if (employeeId && employeeId !== "All") {
            params.append("employeeId", employeeId);
        }

        const res = await fetch(
            `${BASE_URL}/tasks?${params.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );

        if (!res.ok) throw new Error("Failed to fetch reports");

        return await res.json();

    } catch (error) {
        throw new Error(error.message);
    }
};

// SUMMARY COUNTS
export const getReportSummary = async () => {
    try {
        const res = await fetch(`${BASE_URL}/summary`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
};