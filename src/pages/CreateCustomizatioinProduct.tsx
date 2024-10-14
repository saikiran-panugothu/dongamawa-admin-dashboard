import React, { useState } from "react";
import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import SimpleInput from "../components/SimpleInput";
import SelectInput from "../components/SelectInput";
import { customizationCategories, fabricType } from "../utils/data";
import CustomizationController from "../controllers/CustomizationController";
import { toast } from "react-toastify";

const CreateCustomizationProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fabricType: "",
    color: "",
    price: "",
    extraImgPrice: "",
    discountAmount: "",
    imgFront: null as File | null,
    imgBack: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (file: File | null, name: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === null || formData[key] === "") {
        console.error(`Validation Error: ${key} cannot be null or empty`);
        toast.error("All fields are required");
        return; // Exit the function if validation fails
      }
    }

    // Prepare form data for submission
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSubmit.append(key, formData[key]);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {
      const response = await CustomizationController.createProduct(
        formDataToSubmit
      );
      toast.success("Product created successfully")
      console.log("Product created successfully:", response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="hover:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
              Add Product
            </h2>

            <button
              onClick={handleSubmit}
              className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-black duration-200 flex items-center justify-center gap-x-2"
            >
              <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
                Save Product
              </span>
            </button>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10"
          >
            {/* Left Section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product Details
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Title">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product title..."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Category">
                  <SelectInput
                    selectList={customizationCategories}
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Fabric Type">
                  <SelectInput
                    selectList={fabricType}
                    name="fabricType"
                    value={formData.fabricType}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Color">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product color..."
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </InputWithLabel>
              </div>

              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                Pricing
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Base Pricing">
                  <SimpleInput
                    type="number"
                    placeholder="Enter base price..."
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Back Image Price">
                  <SimpleInput
                    type="number"
                    placeholder="Enter back image price..."
                    name="extraImgPrice"
                    value={formData.extraImgPrice}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Discount Amount">
                  <SimpleInput
                    type="number"
                    placeholder="Enter discount amount..."
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleChange}
                  />
                </InputWithLabel>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product Images
              </h3>

              <div className="flex flex-col gap-5 mt-4">
                <ImageUpload
                  label="Front Image"
                  name="imgFront"
                  onChange={(file) => handleFileChange(file, "imgFront")}
                />
                <ImageUpload
                  label="Back Image"
                  name="imgBack"
                  onChange={(file) => handleFileChange(file, "imgBack")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomizationProduct;
