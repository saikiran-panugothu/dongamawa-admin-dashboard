import axios from "axios";
import { BASE_API_URL } from "../config/dev.config";

const apiClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json", // Default Content-Type
    },
});

const ApiService = {
    post: async (url: string, data: any, isMultipart: boolean = false) => {
        try {
            const headers = isMultipart
                ? { "Content-Type": "multipart/form-data" }
                : { "Content-Type": "application/json" };

            const response = await apiClient.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error("API call error:", error);
            throw error; // Rethrow the error for handling in the component
        }
    },
    get: async (url: string) => {
        try {
            const response = await apiClient.get(url);
            return response.data;
        } catch (error) {
            console.error("API call error:", error);
            throw error; // Rethrow the error for handling in the component
        }
    },
    put: async (url: string, data: any, isMultipart: boolean = false) => {
        try {
            const headers = isMultipart
                ? { "Content-Type": "multipart/form-data" }
                : { "Content-Type": "application/json" };

            const response = await apiClient.put(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error("API call error:", error);
            throw error; // Rethrow the error for handling in the component
        }
    },
};

export default ApiService;
