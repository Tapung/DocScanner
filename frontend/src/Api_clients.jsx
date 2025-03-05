import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true; 


export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (email, password, role) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/login/${role}`, 
            { email, password },
            { withCredentials: true } 
        );
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/auth/profile`, 
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};


export const logoutUser = async () => {
    try {
        await axios.post(
            `${API_BASE_URL}/auth/logout`, 
            {},
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
    }
};



export const uploadDocuments = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/doc/upload`, {
            method: "POST",
            body: formData,
            credentials: "include", 
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Upload failed");
        }

        return response.json();
    } catch (error) {
        console.error("Upload error:", error.message);
        throw error;
    }
};



export const scanDocument = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/doc/scan`, {
            method: "POST",
            body: formData,
            credentials: "include", 
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Scan failed");
        }

        return response.json();
    } catch (error) {
        console.error("Scan error:", error.message);
        throw error;
    }
};



export const validateToken = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/login/validate`, {
            withCredentials: true, 
        });

        return response.data; 
    } catch (error) {
        console.error("Token validation failed:", error.response?.data || error.message);
        return null;
    }
};


export const requestCredits = async (amount) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/credits/request`,
            { amount },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Credit request failed:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};





export const fetchScanStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/scan-stats`);
    return response.data;
};


export const fetchTopUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/top-users`);
    return response.data;
};


export const fetchCommonScans = async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/common-scans`);
    return response.data;
};


export const fetchCreditUsage = async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/credit-usage`);
    return response.data;
};

export const fetchPendingRequests = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/credits/pending`);
        console.log("Pending Requests API Response:", res.data);
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Error fetching pending requests:", error.response?.data || error.message);
        return [];
    }
};

export const approveCreditRequest = async ({ userId, amount }) => {
    try {
        console.log(userId,amount)
        const response = await axios.post(`${API_BASE_URL}/credits/approve`, { userId, amount });
        return response.data; 
    } catch (error) {
        console.error("Error approving credit request:", error.response?.data || error.message);
        throw new Error("Failed to approve credit request"); 
    }
};

export const rejectCreditRequest = async ({ userId}) => {
    try {
       
        const response = await axios.post(`${API_BASE_URL}/credits/reject`, { userId});
        return response.data; 
    } catch (error) {
        console.error("Error rejecting credit request:", error.response?.data || error.message);
        throw new Error("Failed to reject credit request"); 
    }
};


export const deleteUser = async () => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/auth/delete`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};