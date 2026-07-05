const BASE_URL = "http://localhost:3001/api/profile";

const getToken = () =>
    sessionStorage.getItem("token") ||
    localStorage.getItem("token");

// GET PROFILE
export const getProfile = async () => {
    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// UPDATE PROFILE
export const updateProfile = async (profile) => {
    const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(profile)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

// CHANGE PASSWORD
export const changePassword = async (passwordData) => {
    const response = await fetch(
        `${BASE_URL}/change-password`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify(passwordData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};