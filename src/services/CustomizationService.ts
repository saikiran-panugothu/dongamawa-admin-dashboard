import { BASE_API_URL } from "../config/dev.config";
import { API_ENDPOINTS } from "../utils/ApiEndPoints";
import ApiService from "./ApiService";

const customizationService = {
    createCustomizationProduct: async (data: any) => {
        const URL = BASE_API_URL+API_ENDPOINTS.CREATE_CUSTOMIZATION_PRODUCT;
        console.log(URL,'baseurl',data);
        
        return await ApiService.post(URL, data);
    },
};

export default customizationService;
