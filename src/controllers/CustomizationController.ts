import customizationService from "../services/CustomizationService";

class CustomizationController {
    async createProduct(data: FormData) {
        try {
            const result = await customizationService.createCustomizationProduct(data);
            return result;
        } catch (err) {
            console.error("Error creating customization product:", err);
            throw err;
        }
    }
}

export default new CustomizationController()