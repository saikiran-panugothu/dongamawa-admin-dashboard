import { toast } from "react-toastify";
import customizationService from "../services/CustomizationService";

class CustomizationController {
    async createProduct(data: FormData) {
        try {
            const result = await customizationService.createCustomizationProduct(data);
            return result;
        } catch (err) {
            toast.error("Something went wrong")
            console.error("Error creating customization product:", err);
            throw err;
        }
    }

    async updateProduct(data: FormData, id: number) {
        try {
            const result = await customizationService.updateCustomizationProduct(data, id);
            return result;
        } catch (err) {
            toast.error("Something went wrong")
            console.error("Error creating customization product:", err);
            throw err;
        }
    }

    async getProducts() {
        try {
            const result = await customizationService.getCustomizationProducts();
            return result;
        } catch (err) {
            toast.error("Something went wrong")
            console.error("Error creating customization product:", err);
            throw err;
        }
    }
}

export default new CustomizationController()