import axios from "axios";
import { BASE_API_URL } from "../config/dev.config";

const apiClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const ApiService = {
    post: async (url: string, data: any) => {
        try {
            const response = await apiClient.post(url, data);
            return response.data;
        } catch (error) {
            console.error("API call error:", error);
            throw error; // Rethrow the error for handling in the component
        }
    },
    // You can add more HTTP methods (GET, PUT, DELETE) here as needed
};

export default ApiService;
