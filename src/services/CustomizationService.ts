import { BASE_API_URL } from "../config/dev.config";
import { API_ENDPOINTS } from "../utils/ApiEndPoints";
import ApiService from "./ApiService";

const customizationService = {
    createCustomizationProduct: async (data: any) => {
        const URL = BASE_API_URL + API_ENDPOINTS.CREATE_CUSTOMIZATION_PRODUCT;
        return await ApiService.post(URL, data, true);
    },

    updateCustomizationProduct: async (data: any, id: number) => {
        const URL = `${BASE_API_URL}${API_ENDPOINTS.CREATE_CUSTOMIZATION_PRODUCT}/${id}`;
        return await ApiService.put(URL, data, true);
    },

    getCustomizationProducts: async () => {
        const URL = BASE_API_URL + API_ENDPOINTS.CREATE_CUSTOMIZATION_PRODUCT;
        return await ApiService.get(URL)
    }
};

export default customizationService;
